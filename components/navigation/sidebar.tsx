"use client"
import { Menu } from "@/components/navigation/menu"
import { SidebarToggle } from "@/components/navigation/sidebar-toggle"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/hooks/use-sidebar"
import { useStore } from "@/hooks/use-store"
import { cn } from "@/lib/utils"
import { PanelsTopLeft } from "lucide-react"
import Link from "next/link"
import { Typography } from "@/components/typography"
import { IcoLogo } from "@/assets"

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x)
  if (!sidebar) return null
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full border-r border-sidebar-border bg-sidebar transition-[width] duration-300 ease-in-out lg:translate-x-0",
        !getOpenState() ? "w-[90px]" : "w-[214px]",
        settings.disabled && "hidden"
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative flex h-full flex-col overflow-y-auto px-3 py-4"
      >
        <Button
          className={cn(
            "mb-4 transition-transform duration-300 ease-in-out",
            !getOpenState() ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2 px-1">
            <IcoLogo className="size-12" />
            <Typography
              variant="SemiBold_H4"
              className={cn(
                "whitespace-nowrap text-foreground transition-[transform,opacity,display] duration-300 ease-in-out",
                !getOpenState()
                  ? "hidden -translate-x-96 opacity-0"
                  : "translate-x-0 opacity-100"
              )}
            >
              Rithos
            </Typography>
          </Link>
        </Button>
        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
  )
}
