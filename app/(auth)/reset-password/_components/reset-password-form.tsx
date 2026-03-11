"use client"
import IcoEye from "@/assets/ico-eye"
import IcoLock from "@/assets/ico-lock"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { resetPasswordPayloadType, resetPasswordSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form"

export const ResetPasswordForm = () => {
  const form = useForm<resetPasswordPayloadType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const onSubmit: SubmitHandler<resetPasswordPayloadType> = async (data) => {
    console.log(data)
    router.push('/login')
  }

  const onError: SubmitErrorHandler<resetPasswordPayloadType> = async (error) => {
    console.log(error)
  }

  return (
    <Card className="border-chart bg-gradient-primary rounded-xl border-2 p-0.5! py-0.5!">
      <CardContent className="rounded-xl bg-secondary p-10 md:p-14">
        <div className="flex flex-col items-center justify-center text-center">
          <Typography variant="Bold_H2" className="text-3xl font-semibold tracking-tight ">
            Create new password
          </Typography>
          <Typography
            variant="Regular_H6"
            className="mt-4.5 mb-9 text-muted-foreground font-normal"
          >
            Your new password must be unique from those previously used.
          </Typography>
        </div>

        <div className="rounded-xl bg-background p-5 pt-8">
          <form onSubmit={form.handleSubmit(onSubmit, onError)}>
            <div className="flex flex-col gap-6">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password" className="mb-2.5">
                      <Typography variant="Regular_H7" className="text-muted-foreground">
                        New Password
                      </Typography>
                    </FieldLabel>

                    <InputGroup className="bg-secondary p-1.5 rounded-md border-0">
                      <InputGroupInput
                        {...field}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your new password"
                        autoComplete="off"
                        className="px-4 py-1.5 text-base! placeholder:text-muted-foreground bg-transparent border-0"
                      />
                      <InputGroupAddon align="inline-start" className="pl-3">
                        <IcoLock className="size-6 text-muted-foreground" />
                      </InputGroupAddon>
                      <InputGroupAddon align="inline-end" className="pr-3">
                        <IcoEye
                          className="size-6 cursor-pointer text-muted-foreground hover:text-primary-foreground transition-colors"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      </InputGroupAddon>
                    </InputGroup>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirmPassword" className="mb-2.5">
                      <Typography variant="Regular_H7" className="text-muted-foreground">
                        Confirm Password
                      </Typography>
                    </FieldLabel>

                    <InputGroup className="bg-secondary p-1.5 rounded-md border-0">
                      <InputGroupInput
                        {...field}
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        aria-invalid={fieldState.invalid}
                        placeholder="Confirm your new password"
                        autoComplete="off"
                        className="px-4 py-1.5 text-base! placeholder:text-muted-foreground bg-transparent border-0"
                      />
                      <InputGroupAddon align="inline-start" className="pl-3">
                        <IcoLock className="size-6 text-muted-foreground" />
                      </InputGroupAddon>
                      <InputGroupAddon align="inline-end" className="pr-3">
                        <IcoEye
                          className="size-6 cursor-pointer text-muted-foreground hover:text-primary-foreground transition-colors"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                      </InputGroupAddon>
                    </InputGroup>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                variant={"default"}
                color="primary"
                className="mt-6 w-full cursor-pointer bg-primary font-bold capitalize text-primary-foreground hover:bg-primary/90 rounded-full"
                size="lg"
              >
                Reset Password
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
