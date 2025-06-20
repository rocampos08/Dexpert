import { z } from "zod";

/**
 * Zod schema — trims every field and converts empty strings to null
 */
export const pymeFormSchema = z.object({
  name: z.string().trim().min(1),
  contact: z.string().trim().min(1),
  description: z.string().trim().min(1),
  website: z
    .string()
    .trim()
    .transform((val) => (val === "" ? null : val))
    .nullable()
    .optional(),
  location: z
    .string()
    .trim()
    .transform((val) => (val === "" ? null : val))
    .nullable()
    .optional(),
  logoUrl: z
    .string()
    .trim()
    .transform((val) => (val === "" ? null : val))
    .nullable()
    .optional(),
});
