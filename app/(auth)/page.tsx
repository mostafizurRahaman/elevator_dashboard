import React from "react"
import { AdminLoginForm } from "./_login/_components/login-form"

const LoginPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="px-10">
        <AdminLoginForm />
      </div>
    </div>
  )
}

export default LoginPage
