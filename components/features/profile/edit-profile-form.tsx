"use client"

import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import { editProfileSchema, type EditProfilePayloadType } from "@/schemas"

interface EditProfileFormProps {
  defaultUserName?: string
  onSave?: (data: EditProfilePayloadType) => Promise<void>
}

export function EditProfileForm({
  defaultUserName = "",
  onSave,
}: EditProfileFormProps) {
  const form = useForm<EditProfilePayloadType>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      userName: defaultUserName,
    },
  })

  const { formState: { isSubmitting } } = form

  const onSubmit: SubmitHandler<EditProfilePayloadType> = async (data) => {
    try {
      if (onSave) {
        await onSave(data)
      } else {
        // TODO: replace with real API call
        // await fetch("/api/profile", { method: "PATCH", body: JSON.stringify(data), ... })
        await new Promise((r) => setTimeout(r, 800))
        console.log("[API] PATCH /api/profile", data)
      }
      toast.success("Profile updated successfully")
    } catch {
      toast.error("Failed to update profile. Please try again.")
    }
  }

  const onError: SubmitErrorHandler<EditProfilePayloadType> = (errors) => {
    console.error("[EditProfileForm] Validation errors:", errors)
  }

  return (
    <div className="flex flex-col gap-6">
      <Typography variant="SemiBold_H4" className="text-foreground text-center">
        Edit Your Profile
      </Typography>

      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-5"
        noValidate
      >
        {/* User Name */}
        <Controller
          name="userName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="profile-username">
                <Typography variant="Regular_H6" className="text-foreground">
                  User Name
                </Typography>
              </FieldLabel>

              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="profile-username"
                  aria-invalid={fieldState.invalid}
                  placeholder="Maria"
                  autoComplete="username"
                  className="px-4 py-1.5 text-base!"
                />
              </InputGroup>

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* Submit */}
        <Button
          id="btn-save-profile"
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base mt-1"
        >
          {isSubmitting && <Loader2 size={16} className="mr-2 animate-spin" />}
          {isSubmitting ? "Saving…" : "Save & Change"}
        </Button>
      </form>
    </div>
  )
}
