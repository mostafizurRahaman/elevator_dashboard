import z from "zod"

export const resetPasswordSchema = z
  .object({
    password: z
      .string({
        error: "Password is required!",
      })
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string({
        error: "Confirm password is required!",
      })
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export type resetPasswordPayloadType = z.infer<typeof resetPasswordSchema>
