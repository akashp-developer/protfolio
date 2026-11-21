import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import { contactConfig } from "@/lib/contact-config";
import { contactSchema } from "@/lib/contact-schema";
import { siteOrigin } from "@/lib/site";

export const runtime = "nodejs";

const maxBytes = 24_000;
const retryMessage = "Email is temporarily unavailable. Please try again later.";

function respond(message: string, status: number, headers?: HeadersInit) {
  return NextResponse.json({ message }, { status, headers });
}

async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return undefined;
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let size = 0;
  let text = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel();
      return undefined;
    }
    text += decoder.decode(value, { stream: true });
  }

  return JSON.parse(text + decoder.decode()) as unknown;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowed = [new URL(request.url).origin, siteOrigin?.origin];
  if (origin && !allowed.includes(origin)) return respond("Invalid origin.", 403);
  const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") return respond("Expected a JSON message.", 415);

  let payload: unknown;
  try {
    payload = await readBody(request);
  } catch {
    return respond("Invalid message.", 400);
  }

  const result = contactSchema.safeParse(payload);
  if (!result.success) return respond("Check the form fields and try again.", 400);
  const { name, email, subject, message, website } = result.data;
  if (website) return respond("Message received.", 200);

  const config = contactConfig();
  if (!config) return respond(retryMessage, 503);

  const address =
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const key = createHash("sha256").update(address).digest("hex");

  try {
    const redis = new Redis({ url: config.redisUrl, token: config.redisToken });
    const perIp = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(4, "15 m"),
      prefix: "portfolio:contact:ip",
      timeout: 0,
    });
    const aggregate = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(50, "1 h"),
      prefix: "portfolio:contact:all",
      timeout: 0,
    });
    const ipLimit = await perIp.limit(key);
    const limit = ipLimit.success ? await aggregate.limit(config.to) : ipLimit;
    if (!limit.success) {
      const seconds = Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000));
      return respond("Too many messages. Please try again later.", 429, {
        "Retry-After": String(seconds),
      });
    }

    const resend = new Resend(config.apiKey);
    const { error } = await resend.emails.send({
      from: config.from,
      to: config.to,
      replyTo: email,
      subject: `Portfolio inquiry: ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    if (error) return respond(retryMessage, 502);
  } catch {
    return respond(retryMessage, 503);
  }

  return respond("Thanks. Your message was sent.", 200);
}
