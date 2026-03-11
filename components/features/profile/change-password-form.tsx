"use client"

import { useState } from "react"
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { changePasswordSchema, type ChangePasswordPayloadType } from "@/schemas"

interface PasswordFieldProps {
  id: string
  label: string
  placeholder: string
  field: React.InputHTMLAttributes<HTMLInputElement> & { name: string }
  isInvalid: boolean
  error: { message?: string } | undefined
}

function PasswordField({ id, label, placeholder, field, isInvalid, error }: PasswordFieldProps) {
  const [show, setShow] = useState(false)

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={id}>
        <Typography variant="Regular_H6" className="text-foreground">
          {label}
        </Typography>
      </FieldLabel>

      <InputGroup>
        <InputGroupInput
          {...(field as React.ComponentProps<"input">)}
          id={id}
          type={show ? "text" : "password"}
          aria-invalid={isInvalid}
          placeholder={placeholder}
          autoComplete={id === "current-password" ? "current-password" : "new-password"}
          className="px-4 py-1.5 text-base!"
        />
        <InputGroupAddon
          align="inline-end"
          className="cursor-pointer"
          onClick={() => setShow((s) => !s)}
        >
          {show
            ? <EyeOff size={20} className="text-muted-foreground hover:text-foreground transition-colors" />
            : <Eye size={20} className="text-muted-foreground hover:text-foreground transition-colors" />
          }
        </InputGroupAddon>
      </InputGroup>

      {isInvalid && <FieldError errors={[error]} />}
    </Field>
  )
}

interface ChangePasswordFormProps {
  onSave?: (data: ChangePasswordPayloadType) => Promise<void>
}

export function ChangePasswordForm({ onSave }: ChangePasswordFormProps) {
  const form = useForm<ChangePasswordPayloadType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  })

  const { formState: { isSubmitting } } = form

  const onSubmit: SubmitHandler<ChangePasswordPayloadType> = async (data) => {
    try {
      if (onSave) {
        await onSave(data)
      } else {
        // TODO: replace with real API call
        // await fetch("/api/profile/change-password", { method: "POST", body: JSON.stringify(data), ... })
        await new Promise((r) => setTimeout(r, 800))
        console.log("[API] POST /api/profile/change-password", {
          currentPassword: "***",
          newPassword: "***",
        })
      }
      toast.success("Password changed successfully")
      form.reset()
    } catch {
      toast.error("Failed to change password. Please try again.")
    }
  }

  const onError: SubmitErrorHandler<ChangePasswordPayloadType> = (errors) => {
    console.error("[ChangePasswordForm] Validation errors:", errors)
  }

  return (
    <div className="flex flex-col gap-6">
      <Typography variant="SemiBold_H4" className="text-foreground text-center">
        Change Password
      </Typography>

      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-4"
        noValidate
      >
        {/* Current Password */}
        <Controller
          name="currentPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <PasswordField
              id="current-password"
              label="Current Password"
              placeholder="••••••••••"
              field={field as PasswordFieldProps["field"]}
              isInvalid={fieldState.invalid}
              error={fieldState.error}
            />
          )}
        />

        {/* New Password */}
        <Controller
          name="newPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <PasswordField
              id="new-password"
              label="New Password"
              placeholder="••••••••••"
              field={field as PasswordFieldProps["field"]}
              isInvalid={fieldState.invalid}
              error={fieldState.error}
            />
          )}
        />

        {/* Confirm New Password */}
        <Controller
          name="confirmNewPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <PasswordField
              id="confirm-new-password"
              label="Confirm New Password"
              placeholder="••••••••••"
              field={field as PasswordFieldProps["field"]}
              isInvalid={fieldState.invalid}
              error={fieldState.error}
            />
          )}
        />

        {/* Submit */}
        <Button
          id="btn-save-password"
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base mt-2"
        >
          {isSubmitting && <Loader2 size={16} className="mr-2 animate-spin" />}
          {isSubmitting ? "Saving…" : "Save & Change"}
        </Button>
      </form>
    </div>
  )
}
