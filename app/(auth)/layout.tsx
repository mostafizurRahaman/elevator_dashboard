import { AuthHeader } from "@/components/auth-header"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="">
      <AuthHeader />
      {children}
    </div>
  )
}
