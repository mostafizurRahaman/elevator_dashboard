// ** import assets :
import { IcoLogo } from "@/assets"

// ** import components **
import { Typography } from "./typography"

// ** import utils **
import { cn } from "@/lib/utils"

export const AuthHeader = () => {
  return (
    <div className="flex w-full items-center justify-between bg-background">
      <div className="mx-auto flex w-full items-center justify-between px-8 py-3">
        <Typography
          variant="Regular_P"
          link="/"
          className="flex flex-row items-center gap-6"
        >
          <IcoLogo className="size-16 md:size-auto" />
          <Typography variant="SemiBold_H2" className="hidden md:block">
            Rithos Admin / User
          </Typography>
        </Typography>
        {/* <div>
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute top-1/2 left-3 size-5 -translate-y-1/2 font-bold" />
            <Input
              type="text"
              placeholder="Search"
              className="py-2 pr-3 pl-10! placeholder:font-semibold"
            />
          </div>
        </div> */}
        <Typography
          variant="Regular_H3"
          link="/help"
          className={cn("hover:text-primary")}
        >
          Need help?
        </Typography>
      </div>
    </div>
  )
}
