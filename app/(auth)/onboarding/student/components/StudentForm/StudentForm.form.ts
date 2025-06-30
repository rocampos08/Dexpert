import { z } from "zod";

export const studentFormSchema = z.object({
  fullName: z.string().min(1, "El nombre completo es obligatorio"),
  email: z.string().email("Correo electrónico inválido"),
  education: z.string().optional(),
  skills: z.string().min(1, "Las habilidades son obligatorias"), // Añadido min length, asumiendo que las habilidades no son opcionales
  language: z.string().min(1, "El idioma es obligatorio"), // Añadido min length, asumiendo que el idioma no es opcional
  linkedIn: z
    .string()
    .trim() // Elimina espacios en blanco al principio/final
    .min(1, "La URL de LinkedIn es obligatoria") // Lo hacemos obligatorio, según el caso de uso común para LinkedIn. Ajusta si es realmente opcional.
    .transform((val) => {
      // Anteponer 'https://' si aún no comienza con http:// o https://
      if (!/^https?:\/\//i.test(val) && val.length > 0) {
        return `https://${val}`;
      }
      return val;
    })
    .pipe(z.string().url("URL de LinkedIn inválida. Por favor, ingresa una URL válida, por ejemplo, linkedin.com/in/tuperfil"))
    .optional(), // Mantener como opcional si realmente puede estar vacío
});

export type StudentFormValues = z.infer<typeof studentFormSchema>;