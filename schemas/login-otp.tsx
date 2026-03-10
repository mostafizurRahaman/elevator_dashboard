import z from "zod"

export const loginOtpSchema = z.object({
  otp: z
    .string({
      error: "Email is required!",
    })
    .min(6, "OTP should be 6 digit!"),
})

export type loginOTPType = z.infer<typeof loginOtpSchema>
