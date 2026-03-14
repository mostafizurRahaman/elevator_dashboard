"use client"

import * as React from "react"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row, Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Typography } from "@/components/typography"
import { User } from "@/types/user"
import { DeleteUserPopup } from "./actions/delete-user"
import { EditUserModal } from "./actions/edit-user"
import { ViewUserModal } from "./actions/view-user"
import IcoProfile from "@/assets/icons/ico-profile"
import IcoUserEdit from "@/assets/icons/ico-user-edit"
import IcoDelete from "@/assets/icons/ico-delete"
import IcoResetPassword from "@/assets/icons/ico-reset-password"

// import { DeleteCategoryPopup } from "./actions/delete-category-popup";
// import { EditCategoryModal } from "./actions/edit-category-popup";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  table: Table<TData>
}

export function DataTableRowActions<TData>({
  row,
  table,
}: DataTableRowActionsProps<TData>) {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [editDialogOpen, setEditDialogOpen] = React.useState(false)
  const [viewDialogOpen, setViewDialogOpen] = React.useState(false)
  const user = row.original as User

  // Function to reset all selections
  const resetSelection = () => {
    table.resetRowSelection()
  }

  // Handle edit function
  const handleEdit = () => {
    setEditDialogOpen(true)
  }

  // // Handle view details function
  const handleViewDetails = () => {
    console.log("View category details:", user)
    // Implement view details logic or navigation
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => setViewDialogOpen(true)}>
            <div className="flex items-center justify-center gap-2">
              <IcoProfile />
              <Typography variant="Regular_H7">View profile</Typography>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleEdit}>
            <div className="flex items-center justify-center gap-2">
              <IcoUserEdit />
              <Typography variant="Regular_H7">User edit</Typography>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className="flex items-center justify-center gap-2">
              <IcoResetPassword />
              <Typography variant="Regular_H7" className="">
                Reset password
              </Typography>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
            <div className="flex items-center justify-center gap-2">
              <IcoDelete />
              <Typography variant="Regular_H7" className="text-destructive">
                Delete
              </Typography>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditUserModal
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        user={user}
        onSuccess={resetSelection}
      />
      <ViewUserModal
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        user={user}
      />

      <DeleteUserPopup
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        user={user}
        onSuccess={resetSelection}
      />
    </>
  )
}
