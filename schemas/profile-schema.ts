import z from "zod"

// ─── Edit Profile Schema ──────────────────────────────────────────────────────

export const editProfileSchema = z.object({
  userName: z
    .string({ error: "User name is required!" })
    .min(1, "User name is required!")
    .max(80, "User name must be less than 80 characters"),
})

export type EditProfilePayloadType = z.infer<typeof editProfileSchema>

// ─── Change Password Schema ───────────────────────────────────────────────────

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({ error: "Current password is required!" })
      .min(1, "Current password is required!"),
    newPassword: z
      .string({ error: "New password is required!" })
      .min(8, "New password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmNewPassword: z
      .string({ error: "Please confirm your new password!" })
      .min(1, "Please confirm your new password!"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  })

export type ChangePasswordPayloadType = z.infer<typeof changePasswordSchema>
