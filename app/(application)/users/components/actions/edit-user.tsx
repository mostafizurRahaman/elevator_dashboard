"use client"

import { useEffect, useState } from "react"
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  ChevronDown,
  ShieldCheck,
  Activity,
  UserIcon,
  Loader2,
} from "lucide-react"
import { toast } from "sonner"

import IcoEmail from "@/assets/icons/ico-email"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { User } from "@/types/user"

// Schema
const editUserSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["Premium", "Free", "Admin", "Manager", "User"]),
  status: z.enum(["Active", "Pending", "Deleted", "Support"]),
})

type EditUserPayloadType = z.infer<typeof editUserSchema>

interface EditUserModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | null
  onSuccess?: () => void
}

export const EditUserModal = ({
  open,
  onOpenChange,
  user,
  onSuccess,
}: EditUserModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<EditUserPayloadType>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "User",
      status: "Active",
    },
  })

  // Pre-populate form when user data is provided
  useEffect(() => {
    if (user && open) {
      form.reset({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      })
    }
  }, [user, open, form])

  const onSubmit: SubmitHandler<EditUserPayloadType> = async (data) => {
    setIsSubmitting(true)
    try {
      // Simulate API Logic
      console.log("Updating User ID:", user?.id, "with data:", data)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("User updated successfully")
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      toast.error("Failed to update user")
    } finally {
      setIsSubmitting(false)
    }
  }

  const onError: SubmitErrorHandler<EditUserPayloadType> = (error) => {
    console.log("Form Errors:", error)
  }

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="border-chart bg-gradient-primary rounded-xl border-2 p-0.5!"
        showCloseButton={false}
      >
        <CardContent className="rounded-xl bg-secondary p-5 md:p-5">
          <DialogHeader className="mb-8 flex flex-col items-center justify-center">
            <DialogTitle>
              <Typography variant="Bold_H2" className="text-white">
                Edit User Details
              </Typography>
            </DialogTitle>
            <Typography
              variant="SemiBold_H6"
              className="mt-2 text-center text-muted-foreground"
            >
              Update information for{" "}
              <span className="text-white">{user.name}</span>
            </Typography>
          </DialogHeader>

          <div className="rounded-xl bg-background p-6 shadow-inner">
            <form onSubmit={form.handleSubmit(onSubmit, onError)}>
              <div className="flex flex-col gap-5">
                {/* Full Name Field */}
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="edit-name">
                        <Typography variant="Regular_H7">Full Name</Typography>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id="edit-name"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter full name"
                          autoComplete="off"
                          className="px-4 py-1.5 text-base!"
                        />
                        <InputGroupAddon align="inline-start">
                          <UserIcon className="size-6 text-muted-foreground" />
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Email Field */}
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="edit-email">
                        <Typography variant="Regular_H7">
                          Email Address
                        </Typography>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id="edit-email"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter email address"
                          autoComplete="off"
                          className="px-4 py-1.5 text-base!"
                        />
                        <InputGroupAddon align="inline-start">
                          <IcoEmail className="size-6 text-muted-foreground" />
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Role Selection */}
                <Controller
                  name="role"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        <Typography variant="Regular_H7">
                          Assign Role
                        </Typography>
                      </FieldLabel>
                      <InputGroup>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="h-full w-full border-none bg-transparent px-10 py-1.5 text-base! shadow-none focus:ring-0">
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Premium">Premium</SelectItem>
                            <SelectItem value="Free">Free</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Manager">Manager</SelectItem>
                            <SelectItem value="User">User</SelectItem>
                          </SelectContent>
                        </Select>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Status Selection */}
                <Controller
                  name="status"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        <Typography variant="Regular_H7">
                          Account Status
                        </Typography>
                      </FieldLabel>
                      <InputGroup>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="h-full w-full border-none bg-transparent px-10 py-1.5 text-base! shadow-none focus:ring-0">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Support">Support</SelectItem>
                            <SelectItem value="Deleted">Deleted</SelectItem>
                          </SelectContent>
                        </Select>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-gray-700 bg-transparent py-6 text-gray-300 hover:bg-gray-800 hover:text-white"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] cursor-pointer bg-primary py-6 text-lg capitalize"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Update Account"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </CardContent>
      </DialogContent>
    </Dialog>
  )
}
