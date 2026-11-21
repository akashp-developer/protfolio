import "server-only";

export function contactConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO;
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!apiKey || !from || !to || !redisUrl || !redisToken) return null;
  return { apiKey, from, to, redisUrl, redisToken };
}
