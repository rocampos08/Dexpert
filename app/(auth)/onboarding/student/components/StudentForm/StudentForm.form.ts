


import { z } from "zod";

export const studentFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email"),
  education: z.string().optional(),
  skills: z.string(),
  language : z.string(),
  linkedIn: z.string().url("Invalid LinkedIn URL").optional(),
});

export type StudentFormValues = z.infer<typeof studentFormSchema>;