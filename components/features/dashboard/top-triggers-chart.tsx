"use client"

import { Card } from "@/components/ui/card"
import { Typography } from "@/components/typography"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
  CartesianGrid,
} from "recharts"

const triggerData = [
  { category: "Stress", value: 80 },
  { category: "Anxiety", value: 70 },
  { category: "Work", value: 60 },
  { category: "Sleep", value: 40 },
]

const GRADIENT_ID = "topTriggersGradient"

interface CustomBarProps {
  x?: number
  y?: number
  width?: number
  height?: number
}

function CustomBar(props: CustomBarProps) {
  const { x = 0, y = 0, width = 0, height = 0 } = props
  return (
    <g>
      <defs>
        <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#29b4aa" />
          <stop offset="100%" stopColor="#203453" />
        </linearGradient>
      </defs>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={`url(#${GRADIENT_ID})`}
        rx={2}
        opacity={0.85}
      />
    </g>
  )
}

export function TopTriggersChart() {
  return (
    <Card className="flex flex-col gap-4 border-border bg-card p-4">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          layout="vertical"
          data={triggerData}
          margin={{ top: 0, right: 32, left: 0, bottom: 0 }}
          barCategoryGap="30%"
        >
          <XAxis
            type="number"
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
            tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="category"
            tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={55}
          />
          {/* <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--foreground)",
              fontSize: 12,
            }}
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
          /> */}
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--foreground)",
              fontSize: 12,
            }}
            labelStyle={{
              color: "var(--muted-foreground)", // label color
              fontSize: 12,
            }}
            itemStyle={{
              color: "#29B4AA", // value / sub text color
              fontSize: 12,
            }}
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
          />
          <CartesianGrid
            strokeDasharray="3 3"
            strokeOpacity={0.25}
            spacing={20}
          />
          <Bar
            dataKey="value"
            shape={<CustomBar />}
            label={{
              position: "insideRight",
              fill: "rgba(255,255,255,0.7)",
              fontSize: 11,
            }}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center justify-center gap-2">
        <div
          className="h-3 w-4 rounded-sm"
          style={{
            background: "linear-gradient(to right, #29b4aa, #203453)",
          }}
        />
        <Typography variant="Regular_H7" className="text-muted-foreground">
          user
        </Typography>
      </div>
    </Card>
  )
}
