import { z } from "zod";

export const bookingFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[^<>{}]*$/, "Name contains invalid characters"),
  phone: z
    .string()
    .trim()
    .min(6, "Phone must be at least 6 characters")
    .max(20, "Phone must be less than 20 characters")
    .regex(/^[+\d\s()-]+$/, "Invalid phone format"),
  course: z.string().min(1).max(100),
  message: z
    .string()
    .max(1000, "Message must be less than 1000 characters")
    .regex(/^[^<>]*$/, "Message contains invalid characters")
    .optional()
    .default(""),
  // Honeypot field — must be empty
  website: z.string().max(0, "Bot detected").optional().default(""),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

export const getFieldError = (
  errors: z.ZodError | null,
  field: string
): string | undefined => {
  if (!errors) return undefined;
  const issue = errors.issues.find((i) => i.path[0] === field);
  return issue?.message;
};
