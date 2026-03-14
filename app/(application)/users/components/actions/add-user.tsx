"use client"

import { useState } from "react"
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
  Plus,
} from "lucide-react"

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
  DialogTrigger,
} from "@/components/ui/dialog"

// Schema
const addUserSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["Premium", "Free", "Admin", "Manager", "User"]),
  status: z.enum(["Active", "Pending", "Deleted", "Support"]),
})

type AddUserPayloadType = z.infer<typeof addUserSchema>

export const AddUserModal = () => {
  const [open, setOpen] = useState(false)

  const form = useForm<AddUserPayloadType>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "User",
      status: "Active",
    },
  })

  const onSubmit: SubmitHandler<AddUserPayloadType> = async (data) => {
    console.log("Form Data:", data)
    // Add your API logic here
    setOpen(false)
    form.reset()
  }

  const onError: SubmitErrorHandler<AddUserPayloadType> = (error) => {
    console.log("Form Errors:", error)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl bg-[#4FD1C5] px-6 font-bold text-gray-900 hover:bg-[#3dbbb0]">
          <Plus className="mr-2 h-5 w-5" />
          Add user
        </Button>
      </DialogTrigger>

      <DialogContent
        className="border-chart bg-gradient-primary rounded-xl border-2 p-0.5!"
        showCloseButton={false}
      >
        <CardContent className="rounded-xl bg-secondary p-5">
          <DialogHeader className="mb-8 flex flex-col items-center justify-center">
            <DialogTitle>
              <Typography variant="Bold_H2" className="text-white">
                Create New User
              </Typography>
            </DialogTitle>
            <Typography
              variant="SemiBold_H6"
              className="mt-2 text-center text-muted-foreground"
            >
              Enter details to add a new member to the platform
            </Typography>
          </DialogHeader>

          <div className="rounded-xl bg-background p-6">
            <form onSubmit={form.handleSubmit(onSubmit, onError)}>
              <div className="flex flex-col gap-5">
                {/* Full Name Field */}
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="name">
                        <Typography variant="Regular_H7">Full Name</Typography>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id="name"
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
                      <FieldLabel htmlFor="email">
                        <Typography variant="Regular_H7">
                          Email Address
                        </Typography>
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id="email"
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
                          defaultValue={field.value}
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
                          defaultValue={field.value}
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

                <Button
                  variant="default"
                  type="submit"
                  className="mt-5 w-full cursor-pointer bg-primary py-6 text-lg capitalize"
                  size="lg"
                >
                  Create User Account
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </DialogContent>
    </Dialog>
  )
}
