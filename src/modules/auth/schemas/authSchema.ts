import { z } from "zod"

export const loginSchema = z.object({
  email: z.email("Correo electrónico inválido"),
  password: z.string().min(1, "Contraseña requerida"),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = loginSchema.extend({
  name: z.string().min(1, "Nombre requerido"),
})

export type RegisterSchema = z.infer<typeof registerSchema>