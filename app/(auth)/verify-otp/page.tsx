import React from "react"
import { OTPForm } from "./_components/otp-form"

const LoginOtpPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="px-10">
        <OTPForm />
      </div>
    </div>
  )
}

export default LoginOtpPage
