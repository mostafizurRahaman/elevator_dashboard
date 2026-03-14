"use client"
import IcoEmail from "@/assets/icons/ico-email"
import IcoEye from "@/assets/icons/ico-eye"
import IcoLock from "@/assets/icons/ico-lock"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { loginPayloadType, loginSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form"

export const AdminLoginForm = () => {
  const form = useForm<loginPayloadType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<loginPayloadType> = async (data) => {
    console.log(data)
    router.push("/dashboard")
  }

  const onError: SubmitErrorHandler<loginPayloadType> = async (error) => {
    console.log(error)
  }

  return (
    <Card className="border-chart bg-gradient-primary rounded-xl border-2 p-0.5! py-0.5!">
      {/* <CardContent className="rounded-xl bg-background px-21.5 py-27.5"> */}
      <CardContent className="rounded-xl bg-secondary p-10 md:p-21.5">
        <div className="flex flex-col items-center justify-center">
          <Typography variant="Bold_H2">Admin Login</Typography>
          <Typography
            variant="SemiBold_H6"
            className="mt-4.5 mb-9 text-muted-foreground"
          >
            Sign in to manage the platform
          </Typography>
        </div>

        <div className="rounded-xl bg-background p-5">
          <form onSubmit={form.handleSubmit(onSubmit, onError)}>
            <div className="flex flex-col gap-3">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">
                      <Typography
                        variant="Regular_H6"
                        className="text-[#A0AEC0]"
                      >
                        Email / Phone Number
                      </Typography>
                    </FieldLabel>

                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        id="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your email"
                        autoComplete="off"
                        className="px-4 py-1.5 text-base!"
                      />
                      <InputGroupAddon align="inline-start">
                        <IcoEmail className="size-6" />
                      </InputGroupAddon>
                    </InputGroup>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">
                      <Typography
                        variant="Regular_H6"
                        className="text-[#A0AEC0]"
                      >
                        Password
                      </Typography>
                    </FieldLabel>

                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        id="password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your password"
                        autoComplete="off"
                        className="px-4 py-1.5 text-base!"
                      />
                      <InputGroupAddon align="inline-start">
                        <IcoLock className="size-6" />
                      </InputGroupAddon>
                      <InputGroupAddon align="inline-end">
                        <IcoEye className="size-6 cursor-pointer" />
                      </InputGroupAddon>
                    </InputGroup>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="flex items-center justify-end">
                <Typography
                  variant="Regular_H6"
                  className="ml-auto block! text-destructive hover:text-destructive/80"
                  link="/forgot-password"
                >
                  Forgot password?
                </Typography>
              </div>
              <Button
                variant={"default"}
                color="primary"
                className="mt-5 h-auto w-full cursor-pointer rounded-full bg-primary py-3 text-[18px] font-bold capitalize"
                size="lg"
              >
                Log in
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
