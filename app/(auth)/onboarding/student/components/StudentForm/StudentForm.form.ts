

import { z } from "zod";

export const studentFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email"),
  education: z.string().optional(),
  experience: z.string().optional(),
});

export type StudentFormValues = z.infer<typeof studentFormSchema>;