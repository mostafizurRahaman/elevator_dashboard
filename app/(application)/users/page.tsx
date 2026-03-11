import { Metadata } from "next"
import { Suspense } from "react"
import UsersTable from "."
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Plus, SlidersHorizontal, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ContentLayout } from "@/components/navigation/content-layout"

export const metadata: Metadata = {
  title: "User Management",
  description: "Manage users, roles status and access",
}

export default function UsersPage() {
  const filters = ["All", "Active", "Deleted", "Pending", "Support"]

  return (
    <ContentLayout>
      <div className="container mx-auto space-y-8 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="Bold_H2" className="text-white">
              User Management
            </Typography>
            <Typography variant="Regular_H6" className="text-muted-foreground">
              Manage users, roles status and access
            </Typography>
          </div>
        </div>

        {/* Tabs & Reset */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={filter === "All" ? "default" : "ghost"}
                className={`rounded-xl px-6 ${
                  filter === "All"
                    ? "border border-gray-600 bg-gray-800 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        <Suspense fallback={<div className="text-white">Loading users...</div>}>
          <UsersTable />
        </Suspense>
      </div>
    </ContentLayout>
  )
}
