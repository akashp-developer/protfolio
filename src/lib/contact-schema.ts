import { z } from "zod";

export const contactSchema = z
  .object({
    name: z.string().trim().min(2, "Enter at least two characters.").max(100),
    email: z.email("Enter a valid email address.").max(254),
    phone: z
      .string()
      .trim()
      .max(40)
      .regex(/^[+()0-9 .-]*$/, "Enter a valid phone number.")
      .optional(),
    subject: z
      .string()
      .trim()
      .min(3, "Enter a subject.")
      .max(120)
      .regex(/^[^\r\n]+$/, "Use a single-line subject."),
    message: z.string().trim().min(20, "Enter at least twenty characters.").max(4000),
    website: z.string().max(200).optional(),
  })
  .strict();

export type ContactFields = z.infer<typeof contactSchema>;
