// components/PymeForm/PymeForm.types.ts
import { z } from "zod"
import { studentFormSchema } from "./StudentForm.form"
export type studentFormSchema = z.infer<typeof studentFormSchema>
