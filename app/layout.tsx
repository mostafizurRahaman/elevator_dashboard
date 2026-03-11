import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { inter } from "@/fonts"
import { cn } from "@/lib/utils"
import { TanstackQueryProvider } from "@/components/TanstackQueryProvider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", inter.className)}
    >
      <body>
        <ThemeProvider>
          <TanstackQueryProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </TanstackQueryProvider>
          <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
