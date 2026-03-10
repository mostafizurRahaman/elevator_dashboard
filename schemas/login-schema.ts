import z from "zod"

export const loginSchema = z.object({
  email: z
    .string({
      error: "Email is required!",
    })
    .min(1, "Email is required!") // ensure not empty
    .email("Please enter a valid email"), // proper email format

  password: z
    .string({
      error: "Password is required!",
    })
    .min(1, "Password is required!"),
})

export type loginPayloadType = z.infer<typeof loginSchema>
