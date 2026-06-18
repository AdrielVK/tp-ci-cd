import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "El nombre es requerido"),
    email: z.string().min(1, "El email es requerido").email("El email no es válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(1, "La confirmación de la contraseña es requerida"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
