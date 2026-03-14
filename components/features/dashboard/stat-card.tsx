"use client"

import { Card } from "@/components/ui/card"
import { Typography } from "@/components/typography"
import { cn } from "@/lib/utils"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative"
  chartData: { value: number }[]
  chartColor: string
  labelName: string
  icon: React.ReactNode
}

export function StatCard({
  title,
  value,
  change,
  changeType,
  chartData,
  labelName,
  chartColor,
  icon,
}: StatCardProps) {
  const isPositive = changeType === "positive"

  return (
    <Card className="relative flex flex-col gap-2 overflow-hidden border-border bg-card p-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{icon}</span>
        <Typography variant="Regular_H5" className="text-foreground">
          {title}
        </Typography>
      </div>

      {/* Value + Sparkline */}
      <div className="flex items-end justify-between gap-2">
        <div className="flex flex-col gap-2">
          <Typography
            variant="SemiBold_H2"
            className="leading-none text-foreground"
          >
            {value}
          </Typography>
          {/* Change badge */}
          <div
            className={cn(
              "flex w-fit items-center gap-1 rounded-xl px-3 py-1",
              isPositive ? "bg-[#ccffe1]" : "bg-[#f3d5d5]"
            )}
          >
            {isPositive ? (
              <TrendingUp size={14} className="shrink-0 text-[#48bb78]" />
            ) : (
              <TrendingDown size={14} className="shrink-0 text-[#f56565]" />
            )}
            <Typography
              variant="SemiBold_H6"
              className={cn(isPositive ? "text-[#48bb78]" : "text-[#f56565]")}
              as="span"
            >
              {change}
            </Typography>
          </div>
        </div>

        {/* Mini Sparkline */}
        <div className="h-[100px] w-[180px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id={`gradient-${chartColor.replace("#", "")}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.4} />
                  <stop
                    offset="95%"
                    stopColor={chartColor}
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                strokeOpacity={0.25}
                spacing={20}
              />
              <Legend
                verticalAlign="bottom"
                height={20}
                content={() => (
                  <div className="flex items-center justify-center gap-[6px] text-[11px] text-muted-foreground pb-1 pt-1">
                    <div className="flex items-center">
                      <div className="h-[2px] w-2" style={{ backgroundColor: chartColor }} />
                      <div className="h-[7px] w-[7px] rounded-full border-[1.5px] bg-card" style={{ borderColor: chartColor }} />
                      <div className="h-[2px] w-2" style={{ backgroundColor: chartColor }} />
                    </div>
                    <span>{labelName}</span>
                  </div>
                )}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                strokeWidth={1.5}
                fill={`url(#gradient-${chartColor.replace("#", "")})`}
                dot={false}
                animationDuration={800}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}
