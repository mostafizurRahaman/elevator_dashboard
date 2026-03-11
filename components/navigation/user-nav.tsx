"use client";

import Link from "next/link";
import { LayoutGrid, LogOut, User } from "lucide-react";
import { Typography } from "@/components/typography";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function UserNav() {
  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                className="relative "
                size={"lg"}
              >
                <Typography variant="Bold_H6" className="text-primary focus:border-none hover:outline-none focus:outline-none">Hello, Arif</Typography>
                <Avatar className="h-6 w-6 ring-2 ring-primary/30">
                  <AvatarImage src="#" alt="Avatar" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">AR</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56 bg-card border-border" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1 py-1">
            <Typography variant="Medium_H5" className="leading-none">John Doe</Typography>
            <Typography variant="Regular_H7" className="leading-none text-muted-foreground">
              johndoe@example.com
            </Typography>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/dashboard" className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-muted-foreground" />
              <Typography variant="Medium_P">Dashboard</Typography>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/account" className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <Typography variant="Medium_P">Account</Typography>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer text-destructive focus:text-destructive" onClick={() => { }}>
          <LogOut className="w-4 h-4 mr-2" />
          <Typography variant="Medium_P">Sign out</Typography>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
