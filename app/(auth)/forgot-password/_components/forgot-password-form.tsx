"use client"
import IcoEmail from "@/assets/icons/ico-email"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { forgotPasswordPayloadType, forgotPasswordSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form"

export const ForgotPasswordForm = () => {
  const form = useForm<forgotPasswordPayloadType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<forgotPasswordPayloadType> = async (data) => {
    console.log(data)
    router.push("/verify-otp")
  }

  const onError: SubmitErrorHandler<forgotPasswordPayloadType> = async (
    error
  ) => {
    console.log(error)
  }

  return (
    <Card className="border-chart bg-gradient-primary rounded-xl border-2 p-0.5! py-0.5!">
      <CardContent className="rounded-xl bg-secondary p-10 md:p-24">
        <div className="flex flex-col items-center justify-center text-center">
          <Typography
            variant="Bold_H2"
            className="text-3xl font-semibold tracking-tight"
          >
            Forgot password
          </Typography>
          <Typography
            variant="Regular_H6"
            className="mt-4.5 mb-9 font-normal text-muted-foreground"
          >
            No worries, we’ll help you reset it.
          </Typography>
        </div>

        <div className="rounded-xl bg-background p-5 pt-8">
          <form onSubmit={form.handleSubmit(onSubmit, onError)}>
            <div className="flex flex-col gap-6">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email" className="mb-2.5">
                      <Typography
                        variant="Regular_H6"
                        className="text-[#A0AEC0]"
                      >
                        Email / Phone Number
                      </Typography>
                    </FieldLabel>

                    <InputGroup className="rounded-md border-0 bg-secondary p-1.5">
                      <InputGroupInput
                        {...field}
                        id="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your email"
                        autoComplete="off"
                        className="border-0 bg-transparent px-4 py-1.5 text-base! placeholder:text-muted-foreground"
                      />
                      <InputGroupAddon align="inline-start" className="pl-3">
                        <IcoEmail className="size-6 text-muted-foreground" />
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
                className="mt-2 w-full cursor-pointer rounded-full bg-primary font-bold text-primary-foreground capitalize hover:bg-primary/90"
                size="lg"
              >
                Send code
              </Button>

              <div className="mt-2 flex flex-col gap-4">
                <div className="flex items-center justify-center gap-[17.5px]">
                  <div className="h-px w-[123px] bg-muted-foreground/30"></div>
                  <Typography
                    variant="Regular_H6"
                    className="text-center text-muted-foreground"
                  >
                    Back to{" "}
                    <Typography
                      variant="Regular_P"
                      as="span"
                      className="inline! text-primary transition-colors hover:text-primary/80"
                      link="/"
                    >
                      Login
                    </Typography>
                  </Typography>
                  <div className="h-px w-[123px] bg-muted-foreground/30"></div>
                </div>

                <div className="mt-2 text-center">
                  <Typography
                    variant="Regular_H6"
                    className="text-muted-foreground"
                  >
                    Didn’t receive it?{" "}
                    <span className="cursor-pointer text-primary transition-colors hover:text-primary/80">
                      Resend
                    </span>{" "}
                    in 30 sec
                  </Typography>
                </div>
              </div>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
