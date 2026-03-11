import z from "zod"

export const forgotPasswordSchema = z.object({
  email: z
    .string({
      error: "Email is required!",
    })
    .min(1, "Email is required!") // ensure not empty
    .email("Please enter a valid email"), // proper email format
})

export type forgotPasswordPayloadType = z.infer<typeof forgotPasswordSchema>
