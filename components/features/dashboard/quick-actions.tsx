"use client";

import { Card } from "@/components/ui/card";
import { Typography } from "@/components/typography";
import { cn } from "@/lib/utils";
import {
  UserPlus,
  Crown,
  MessageSquareWarning,
  UserMinus,
  FileText,
  Users,
} from "lucide-react";

const actions = [
  {
    id: "create-user",
    label: "Create User",
    icon: UserPlus,
    onClick: () => {},
  },
  {
    id: "review-premium",
    label: "Review Premium",
    icon: Crown,
    onClick: () => {},
  },
  {
    id: "review-ai-flags",
    label: "Review AI Flags",
    icon: MessageSquareWarning,
    onClick: () => {},
  },
  {
    id: "delete-user",
    label: "Delete User",
    icon: UserMinus,
    onClick: () => {},
  },
  {
    id: "manage-segments",
    label: "Manage Segments",
    icon: FileText,
    onClick: () => {},
  },
  {
    id: "export-report",
    label: "Export Report",
    icon: Users,
    onClick: () => {},
  },
];

export function QuickActions() {
  return (
    <Card className="bg-card border-border p-4 flex flex-col gap-4">
      <Typography variant="Medium_H4" className="text-foreground">
        Quick Actions
      </Typography>
      <div className="flex flex-wrap gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              id={`quick-action-${action.id}`}
              onClick={action.onClick}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-lg",
                "bg-secondary border border-border",
                "text-foreground transition-all duration-200",
                "hover:bg-primary hover:text-primary-foreground hover:border-primary",
                "hover:shadow-md cursor-pointer"
              )}
            >
              <Icon size={18} className="shrink-0" />
              <Typography variant="Regular_H5" as="span" className="whitespace-nowrap">
                {action.label}
              </Typography>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
