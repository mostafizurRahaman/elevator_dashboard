"use client";

import { Card } from "@/components/ui/card";
import { Typography } from "@/components/typography";
import {
  Area,
  AreaChart,
  XAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const checkInData = [
  { day: "Day 1", value: 10 },
  { day: "Day 2", value: 30 },
  { day: "Day 4", value: 45 },
  { day: "Day 6", value: 50 },
  { day: "Day 8", value: 55 },
  { day: "Day 10", value: 60 },
  { day: "Day 12", value: 70 },
];

const topTriggersData = [
  { day: "Day 1", value: 30 },
  { day: "Day 2", value: 40 },
  { day: "Day 4", value: 50 },
  { day: "Day 6", value: 50 },
  { day: "Day 8", value: 55 },
  { day: "Day 10", value: 60 },
  { day: "Day 12", value: 70 },
];

function MiniLineChart({
  data,
  color,
}: {
  data: { day: string; value: number }[];
  color: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
        <defs>
          <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.5} />
            <stop offset="95%" stopColor={color} stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="day"
          tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          interval={0}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            color: "var(--foreground)",
            fontSize: 12,
          }}
          itemStyle={{ color: color }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill={`url(#grad-${color.replace("#", "")})`}
          dot={{ r: 3, fill: color, strokeWidth: 0 }}
          activeDot={{ r: 5, fill: color }}
          animationDuration={900}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function RecentActivity() {
  return (
    <div className="flex gap-4">
      {/* Check-in Trend */}
      <div className="flex-1 flex flex-col gap-0 rounded-xl overflow-hidden border border-border bg-card">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <Typography variant="Medium_H6" className="text-foreground" as="span">
            Check-in Trend{" "}
            <span className="text-muted-foreground font-normal">(12 Days)</span>
          </Typography>
          <Typography variant="Regular_H7" className="text-muted-foreground">
            5m ago
          </Typography>
        </div>
        <div className="p-2">
          <MiniLineChart data={checkInData} color="#4ecdc4" />
        </div>
      </div>

      {/* Top Triggers */}
      <div className="flex-1 flex flex-col gap-0 rounded-xl overflow-hidden border border-border bg-card">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <Typography variant="Medium_H6" className="text-foreground" as="span">
            Top Triggers{" "}
            <span className="text-muted-foreground font-normal">(admin access)</span>
          </Typography>
          <Typography variant="Regular_H7" className="text-muted-foreground">
            5m ago
          </Typography>
        </div>
        <div className="p-2">
          <MiniLineChart data={topTriggersData} color="#4ecdc4" />
        </div>
      </div>
    </div>
  );
}
