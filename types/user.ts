export interface User {
  // Index signature to satisfy ExportableData constraint
  [key: string]: string | number | boolean | null | undefined
  id: number
  image: string
  name: string
  email: string
  role: "Premium" | "Free" | "Admin" | "Manager" | "User"
  status: "Active" | "Pending" | "Deleted" | "Support"
  lastLogin: string
  createdAt: string
}
