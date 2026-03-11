import { User } from "@/types/user"
import { useMemo } from "react"

export function useExportConfig() {
  const columnMapping = useMemo(
    () => ({
      name: "User Name",
      email: "Email",
      role: "Plan Role",
      status: "Status",
      lastLogin: "Last Login",
      createdAt: "Created Date",
    }),
    []
  )

  const headers = useMemo(
    () => ["name", "email", "role", "status", "lastLogin", "createdAt"],
    []
  )

  const transformFunction = (data: User) => ({
    name: data.name,
    email: data.email,
    role: data.role,
    status: data.status,
    lastLogin: data.lastLogin,
    createdAt: data.createdAt,
  })

  return {
    columnMapping,
    headers,
    entityName: "users",
    transformFunction,
    columnWidths: [
      { wch: 20 },
      { wch: 25 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
    ],
  }
}
