"use client"
import IcoEmail from "@/assets/ico-email"
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
    router.push('/reset-password')
  }

  const onError: SubmitErrorHandler<loginOTPType> = async (error) => {
    console.log(error)
  }

  return (
    <Card className="border-chart bg-gradient-primary rounded-xl border-2 p-0.5! py-0.5!">
      {/* <CardContent className="rounded-xl bg-background px-21.5 py-27.5"> */}
      <CardContent className="rounded-xl bg-secondary p-10 md:p-21.5">
        <div className="flex flex-col items-center justify-center">
          <Typography variant="Bold_H2">OTP Verification</Typography>
          <Typography
            variant="SemiBold_H6"
            className="mt-4.5 mb-9 text-muted-foreground"
          >
            Enter 6 digits code that received on your email
          </Typography>
        </div>

        <div className="rounded-xl bg-background p-5">
          <form onSubmit={form.handleSubmit(onSubmit, onError)}>
            <div className="flex flex-col gap-3">
              <Controller
                name="otp"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <InputOTP maxLength={6} {...field} className="">
                      <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
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
                  Resend OTP :{" "}
                  <Typography
                    variant="Regular_H5"
                    as="span"
                    className="text-muted-foreground"
                  >
                    02.00s
                  </Typography>
                </Typography>
              </div>
              <Button
                variant={"default"}
                color="primary"
                className="mt-5 w-full cursor-pointer bg-primary py-3 capitalize"
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
