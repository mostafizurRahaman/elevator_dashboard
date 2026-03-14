"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Typography } from "@/components/typography"
import { cn } from "@/lib/utils"
import { Bug, AlertTriangle, Info } from "lucide-react"
import { ReactNode } from "react"
import IcoWarning from "@/assets/icons/ico-warning"
import IcoInfo from "@/assets/icons/ico-info"
import IcoCritical from "@/assets/icons/ico-critical"

type AlertSeverity = "critical" | "warning" | "info"

interface SystemAlert {
  id: string
  severity: AlertSeverity
  message: string
  highlight?: string
  timestamp: string
}

const alerts: SystemAlert[] = [
  {
    id: "alert-1",
    severity: "critical",
    message: "Spike in support ",
    highlight: "in last 1 hour",
    timestamp: "5m Ago",
  },
  {
    id: "alert-2",
    severity: "warning",
    message: "Check-in service latency increased",
    timestamp: "",
  },
  {
    id: "alert-3",
    severity: "info",
    message: "Export report to csv complete",
    timestamp: "",
  },
]

const severityConfig: Record<
  AlertSeverity,
  {
    label: string
    icon: ReactNode
    badgeBg: string
    textColor: string
  }
> = {
  critical: {
    label: "Critical",
    icon: <IcoCritical />,
    badgeBg: "bg-[#fddede]",
    textColor: "text-destructive",
  },
  warning: {
    label: "Warning",
    icon: <IcoWarning />,
    badgeBg: "bg-[#f0dbca]",
    textColor: "text-[#ed8936]",
  },
  info: {
    label: "Info",
    icon: <IcoInfo />,
    badgeBg: "bg-[#c2efec]",
    textColor: "text-primary",
  },
}

function AlertBadge({ severity }: { severity: AlertSeverity }) {
  const config = severityConfig[severity]
  const Icon = config.icon
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-2 rounded-xl px-3 py-1",
        config.badgeBg
      )}
    >
      {/* <Icon size={16} className={cn("shrink-0", config.textColor)} /> */}
      {Icon}
      <Typography variant="SemiBold_H6" className={config.textColor} as="span">
        {config.label}
      </Typography>
    </div>
  )
}

interface SystemAlertsProps {
  className?: string
}

export function SystemAlerts({ className }: SystemAlertsProps) {
  const [critical, ...rest] = alerts

  return (
    <Card
      className={cn("flex flex-col gap-4 border-border bg-card p-4", className)}
    >
      <Typography variant="Medium_H3" className="text-foreground">
        System Alerts
      </Typography>

      <div className="flex flex-col gap-4">
        {/* Critical Alert */}
        <div className="flex flex-col gap-2 border-b border-border pb-4">
          <div className="flex items-center justify-between gap-2">
            <AlertBadge severity={critical.severity} />
            <div className="shrink-0 rounded-lg bg-secondary px-3 py-1">
              <Typography
                variant="Medium_H7"
                className="text-muted-foreground"
                as="span"
              >
                {critical.timestamp}
              </Typography>
            </div>
          </div>
          <div>
            <Typography
              variant="Medium_H5"
              as="span"
              className="text-foreground"
            >
              {critical.message}
            </Typography>
            {critical.highlight && (
              <Typography
                variant="Medium_H5"
                as="span"
                className="text-muted-foreground"
              >
                {critical.highlight}
              </Typography>
            )}
          </div>
        </div>

        {/* Warning + Info Alerts */}
        <div className="flex flex-col gap-3">
          {rest.map((alert) => (
            <div key={alert.id} className="flex items-center gap-3">
              <AlertBadge severity={alert.severity} />
              <Typography variant="Medium_H5" className="text-foreground">
                {alert.message}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
