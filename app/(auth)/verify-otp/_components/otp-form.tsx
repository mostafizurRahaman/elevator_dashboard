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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  loginOtpSchema,
  loginOTPType,
  loginPayloadType,
  loginSchema,
} from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form"

export const OTPForm = () => {
  const form = useForm<loginOTPType>({
    resolver: zodResolver(loginOtpSchema),
    defaultValues: {
      otp: "",
    },
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<loginOTPType> = async (data) => {
    console.log(data)
    router.push("/reset-password")
  }

  const onError: SubmitErrorHandler<loginOTPType> = async (error) => {
    console.log(error)
  }

  return (
    <Card className="border-chart bg-gradient-primary rounded-xl border-2 p-0.5! py-0.5!">
      {/* <CardContent className="rounded-xl bg-background px-21.5 py-27.5"> */}
      <CardContent className="rounded-xl bg-secondary p-10 md:p-21.5">
        <div className="max-w-111.25 rounded-xl bg-background p-5">
          <div className="flex flex-col items-center justify-center">
            <Typography variant="Bold_H2">OTP Verification</Typography>
            <Typography
              variant="Medium_H4"
              className="mt-4.5 mb-9 text-center text-[#A0AEC0]"
            >
              Enter 6 digits code that received on your email
            </Typography>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit, onError)}>
            <div className="flex flex-col items-center! justify-center! gap-3">
              <Controller
                name="otp"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      className=""
                      containerClassName="gap-3 flex items-center justify-center w-full"
                    >
                      <InputOTPGroup className="gap-3 *:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                        <InputOTPSlot index={0} className="rounded-md border" />
                        <InputOTPSlot index={1} className="rounded-md border" />
                        <InputOTPSlot index={2} className="rounded-md border" />
                        <InputOTPSlot index={3} className="rounded-md border" />
                        <InputOTPSlot index={4} className="rounded-md border" />
                        <InputOTPSlot index={5} className="rounded-md border" />
                      </InputOTPGroup>
                    </InputOTP>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <div className="mt-32 flex items-center justify-center">
                <Typography
                  variant="Regular_H5"
                  className="flex items-center justify-center gap-3 text-center"
                >
                  Resend code :{" "}
                  <Typography
                    variant="Regular_H5"
                    as="span"
                    className="text-muted-foreground"
                  >
                    00.54
                  </Typography>
                </Typography>
              </div>
              <Button
                variant={"default"}
                color="primary"
                className="mt-5 h-auto w-full cursor-pointer rounded-full bg-primary py-3 text-[18px] font-bold capitalize"
                size="lg"
              >
                Continue
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
