"use client";

import { Card } from "@/components/ui/card";
import { Typography } from "@/components/typography";
import { cn } from "@/lib/utils";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  chartData: { value: number }[];
  chartColor: string;
  icon: React.ReactNode;
}

export function StatCard({
  title,
  value,
  change,
  changeType,
  chartData,
  chartColor,
  icon,
}: StatCardProps) {
  const isPositive = changeType === "positive";

  return (
    <Card className="bg-card border-border p-4 flex flex-col gap-2 relative overflow-hidden">
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
          <Typography variant="SemiBold_H2" className="text-foreground leading-none">
            {value}
          </Typography>
          {/* Change badge */}
          <div
            className={cn(
              "flex items-center gap-1 px-3 py-1 rounded-xl w-fit",
              isPositive ? "bg-[#ccffe1]" : "bg-[#f3d5d5]"
            )}
          >
            {isPositive ? (
              <TrendingUp
                size={14}
                className="text-[#48bb78] shrink-0"
              />
            ) : (
              <TrendingDown
                size={14}
                className="text-[#f56565] shrink-0"
              />
            )}
            <Typography
              variant="SemiBold_H6"
              className={cn(
                isPositive ? "text-[#48bb78]" : "text-[#f56565]"
              )}
              as="span"
            >
              {change}
            </Typography>
          </div>
        </div>

        {/* Mini Sparkline */}
        <div className="w-[180px] h-[100px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
              <defs>
                <linearGradient id={`gradient-${chartColor.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0.05} />
                </linearGradient>
              </defs>
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
  );
}
