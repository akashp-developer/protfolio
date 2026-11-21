"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "motion/react";
import { contactSchema, type ContactFields } from "@/lib/contact-schema";

type Feedback = { kind: "success" | "error"; message: string };
const labels = { name: "Name", email: "Email address", subject: "Subject" } as const;
const limits = { name: 100, email: 254, subject: 120 };

export function ContactForm({ enabled }: { enabled: boolean }) {
  const formId = useId();
  const [feedback, setFeedback] = useState<Feedback>();
  const reduce = useReducedMotion();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFields>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", website: "" },
  });

  async function submit(data: ContactFields) {
    setFeedback(undefined);
    if (!enabled) {
      setFeedback({
        kind: "error",
        message: "The form is unavailable. Please use the email link.",
      });
      return;
    }
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result: { message?: string } = await response.json();
      setFeedback({
        kind: response.ok ? "success" : "error",
        message: result.message ?? "Something went wrong. Please try again.",
      });
      if (response.ok) reset();
    } catch {
      setFeedback({
        kind: "error",
        message: "The message could not be sent. Please try again.",
      });
    }
  }

  return (
    <form
      className="contact-form"
      method="post"
      action="/api/contact"
      noValidate
      onSubmit={handleSubmit(submit, () => setFeedback(undefined))}
    >
      {!enabled && (
        <p className="form-notice">
          The contact form is currently unavailable. You can still send an email directly.
        </p>
      )}
      <div className="form-grid">
        {(Object.keys(labels) as (keyof typeof labels)[]).map((name) => (
          <div className={`field field-${name}`} key={name}>
            <label htmlFor={`${formId}-${name}`}>{labels[name]}</label>
            <input
              {...register(name)}
              id={`${formId}-${name}`}
              required
              type={name === "email" ? "email" : "text"}
              maxLength={limits[name]}
              autoComplete={name === "subject" ? "off" : name}
              aria-invalid={Boolean(errors[name])}
              aria-describedby={errors[name] ? `${formId}-${name}-error` : undefined}
            />
            {errors[name] && (
              <span id={`${formId}-${name}-error`} className="field-error">
                {errors[name].message}
              </span>
            )}
          </div>
        ))}
        <div className="field field-message">
          <label htmlFor={`${formId}-message`}>Message</label>
          <textarea
            {...register("message")}
            id={`${formId}-message`}
            required
            maxLength={4000}
            rows={6}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          />
          {errors.message && (
            <span id={`${formId}-message-error`} className="field-error">
              {errors.message.message}
            </span>
          )}
        </div>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input {...register("website")} tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button
        type="submit"
        className="button button-primary"
        disabled={!enabled || isSubmitting}
      >
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
      {feedback && (
        <motion.p
          role={feedback.kind === "error" ? "alert" : "status"}
          className={`feedback feedback-${feedback.kind}`}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {feedback.message}
        </motion.p>
      )}
    </form>
  );
}
