import { z } from "zod"

export const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  level: z.string().min(1),
  skills: z.string().min(1),
  startDate: z.string(), 
  endDate: z.string(),
})
