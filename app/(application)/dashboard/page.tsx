import React from "react"
import { ContentLayout } from "@/components/navigation/content-layout"
import { StatCard } from "@/components/features/dashboard/stat-card"
import { QuickActions } from "@/components/features/dashboard/quick-actions"
import { SystemAlerts } from "@/components/features/dashboard/system-alerts"
import { RecentActivity } from "@/components/features/dashboard/recent-activity"
import { TopTriggersChart } from "@/components/features/dashboard/top-triggers-chart"
import { Users, HeadphonesIcon } from "lucide-react"
import { CheckSquare } from "lucide-react"

// Chart data for stat cards
const activeUsersData = [
  { value: 40 },
  { value: 60 },
  { value: 55 },
  { value: 70 },
  { value: 65 },
  { value: 80 },
  { value: 100 },
]

const dailyCheckInsData = [
  { value: 50 },
  { value: 65 },
  { value: 60 },
  { value: 75 },
  { value: 70 },
  { value: 85 },
  { value: 100 },
]

const supportData = [
  { value: 100 },
  { value: 85 },
  { value: 90 },
  { value: 75 },
  { value: 55 },
  { value: 60 },
  { value: 45 },
]

const Page = () => {
  return (
    <ContentLayout title="Dashboard">
      <div className="flex flex-col gap-6 w-full">
        {/* Stat Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Total Active Users"
            value="12,480"
            change="+12.5%"
            changeType="positive"
            chartData={activeUsersData}
            chartColor="#48bb78"
            labelName="User"
            icon={<Users size={22} />}
          />
          <StatCard
            title="Daily Check-ins Today"
            value="3,210"
            change="+1.5%"
            changeType="positive"
            chartData={dailyCheckInsData}
            chartColor="#48bb78"
             labelName="User"
            icon={<CheckSquare size={22} />}
          />
          <StatCard
            title="Support"
            value="4.5%"
            change="-3.5%"
            changeType="negative"
             labelName="1"
            chartData={supportData}
            chartColor="#f56565"
            icon={<HeadphonesIcon size={22} />}
          />
        </div>

        {/* Quick Actions + System Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          <QuickActions />


          <SystemAlerts />

        </div>

        {/* Recent Activity section title row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-start">
          {/* Left: Recent Activity (two charts) */}
          <div className="flex flex-col gap-3">
            <h2 className="text-foreground font-medium text-xl leading-tight">Recent Activity</h2>
            <RecentActivity />
          </div>

          {/* Right: Top Triggers Bar Chart */}
          <div className="lg:w-[500px] flex flex-col gap-3">
            <h2 className="text-foreground font-medium text-xl leading-tight opacity-0 select-none">
              &nbsp;
            </h2>
            <TopTriggersChart />
          </div>
        </div>
      </div>
    </ContentLayout>
  )
}

export default Page
