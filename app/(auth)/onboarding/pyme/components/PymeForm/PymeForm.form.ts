import { z } from 'zod'

export const pymeFormSchema = z.object({
  name: z.string().min(1),
  contact: z.string().min(1),
  description: z.string().min(1),
  website: z.string().optional(),
  location: z.string().optional(),
  logoUrl: z.string().optional(),
})