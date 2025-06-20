// components/PymeForm/PymeForm.types.ts
import { z } from "zod"
import { pymeFormSchema } from "./PymeForm.form"

export type PymeFormValues = z.infer<typeof pymeFormSchema>
