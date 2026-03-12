"use client"

import { format } from "date-fns"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/column-header"
import { Checkbox } from "@/components/ui/checkbox"
import { RoleChips } from "@/components/badges/status-switcher"
import { Typography } from "@/components/typography"

import { DataTableRowActions } from "./row-actions"
import { User } from "@/types/user"
import Image from "next/image"
import { UserStatusChips } from "@/components/badges/user-status-badge"

export const getColumns = (
  handleRowDeselection: ((rowId: string) => void) | null | undefined
): ColumnDef<User>[] => {
  const baseColumns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-start gap-5 font-medium">
          <Image
            src={row.original.image}
            width={40}
            height={40}
            alt={row.original.name}
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="flex flex-col gap-2">
            <Typography variant="Medium_H6">{row.getValue("name")}</Typography>
            <Typography variant="Medium_H6" className="text-muted-foreground">
              {row.original.email}
            </Typography>
          </div>
        </div>
      ),
      size: 200,
    },

    {
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      cell: ({ row }) => {
        const role = row.getValue("role") as string
        return <RoleChips role={role} />
      },
      size: 100,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return <UserStatusChips status={status} />
      },
      size: 100,
    },
    {
      accessorKey: "lastLogin",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Login" />
      ),
      cell: ({ row }) => {
        const lastLogin = row.getValue("lastLogin") as boolean
        return <Typography variant="Regular_H6">2h Ago</Typography>
      },
      size: 100,
    },

    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"))
        return (
          <div>
            <Typography variant="Regular_H7">
              {format(date, "MMM d, yyyy")}
            </Typography>
          </div>
        )
      },
      size: 120,
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
      size: 100,
    },
  ]

  // Only include selection column if row selection is enabled
  if (handleRowDeselection !== null) {
    return [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="translate-y-0.5 cursor-pointer"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value)
              if (!value && handleRowDeselection) {
                handleRowDeselection(row.id)
              }
            }}
            aria-label="Select row"
            className="translate-y-0.5 cursor-pointer"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 50,
      },
      ...baseColumns,
    ]
  }

  return baseColumns
}
