"use client"

import { Card } from "@/components/ui/card"
import { Typography } from "@/components/typography"
import { cn } from "@/lib/utils"
import {
  UserPlus,
  Crown,
  MessageSquareWarning,
  UserMinus,
  FileText,
  Users,
} from "lucide-react"
import IcoUser from "@/assets/icons/ico-user"
import IcoDiamond from "@/assets/icons/ico-diamond"
import IcoMessage from "@/assets/icons/ico-message"
import IcoDeleteUser from "@/assets/icons/ico-deleteuser"
import IcoSegment from "@/assets/icons/ico-segment"
import IcoExoprt from "@/assets/icons/ico-export"

const actions = [
  {
    id: "create-user",
    label: "Create User",
    icon: <IcoUser />,
    onClick: () => {},
  },
  {
    id: "review-premium",
    label: "Review Premium",
    icon: <IcoDiamond />,
    onClick: () => {},
  },
  {
    id: "review-ai-flags",
    label: "Review AI Flags",
    icon: <IcoMessage />,
    onClick: () => {},
  },
  {
    id: "delete-user",
    label: "Delete User",
    icon: <IcoDeleteUser />,
    onClick: () => {},
  },
  {
    id: "manage-segments",
    label: "Manage Segments",
    icon: <IcoSegment />,
    onClick: () => {},
  },
  {
    id: "export-report",
    label: "Export Report",
    icon: <IcoExoprt />,
    onClick: () => {},
  },
]

export function QuickActions() {
  return (
    <Card className="flex flex-col gap-4 border-border bg-card p-4">
      <Typography variant="Medium_H4" className="text-foreground">
        Quick Actions
      </Typography>
      <div className="flex flex-wrap gap-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.id}
              id={`quick-action-${action.id}`}
              onClick={action.onClick}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2.5",
                "border border-border bg-secondary",
                "text-foreground transition-all duration-200",
                "hover:border-primary hover:bg-primary hover:text-primary-foreground",
                "cursor-pointer hover:shadow-md group"
              )}
            >
              <div className="text-primary group-hover:text-background">{action.icon}</div>
              <Typography
                variant="Regular_H5"
                as="span"
                className="whitespace-nowrap"
              >
                {action.label}
              </Typography>
            </button>
          )
        })}
      </div>
    </Card>
  )
}
