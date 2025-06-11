import { z } from "zod"

export const formSchema = z.object({
  prompt: z.string().optional(), 
  projectName: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
  skills: z.string().optional(),
})
