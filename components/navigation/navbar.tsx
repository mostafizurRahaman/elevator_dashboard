"use client"

// import { ModeToggle } from "@/components/navigation/mode-toggle"
import { UserNav } from "@/components/navigation/user-nav"
import { SheetMenu } from "@/components/navigation/sheet-menu"
import { Typography } from "@/components/typography"
// import { SearchIcon } from "lucide-react"
// import { Input } from "../ui/input"
import { useState } from "react"

interface NavbarProps {
  title: string
}

export function Navbar({ title }: NavbarProps) {
  const [search, setSearch] = useState("")
  return (
    <header className="sticky top-0 z-10 w-full border-b border-border bg-card shadow-sm">
      <div className="mx-4 flex h-14 items-center sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <Typography variant="SemiBold_H4" className="text-[#A0AEC0]">
            {" "}
            Admin / {title}
          </Typography>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          {/* <div className="relative mr-3 max-w-xs md:max-w-sm">
            <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search"
              className="border-border bg-secondary py-2 pr-3 pl-10! text-foreground placeholder:text-muted-foreground"
              onChange={(e) => {
                setSearch(e.target.value)
              }}
            />
          </div> */}
          {/* <ModeToggle /> */}
          <UserNav />
        </div>
      </div>
    </header>
  )
}
