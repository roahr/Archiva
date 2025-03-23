"use client"
import { useState, useEffect } from "react"
import { MetricsCards } from "@/components/metrics-cards"
import { ActivityTimeline } from "@/components/activity-timeline"
import { SystemHealth } from "@/components/system-health"
import { RecentContracts } from "@/components/recent-contracts"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

export function DashboardContent() {
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadData = () => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleRefresh = () => {
    setRefreshing(true)
    loadData()
    const timer = setTimeout(() => {
      setRefreshing(false)
    }, 1000)
    return () => clearTimeout(timer)
  }

  return (
    <div className="relative min-h-screen p-8 bg-gradient-to-br from-blue-950 to-black">
      {/* Soft Glow Background */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>

      {/* Dashboard Container */}
      <div className="relative max-w-6xl mx-auto p-6 space-y-8 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-lg">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>

          <div className="flex items-center gap-4">
            {/* Status Indicator */}
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/80 text-sm">
              System Status: <span className="text-green-400 font-medium">Operational</span>
            </div>

            {/* Refresh Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={loading || refreshing}
              className="h-8 w-8"
            >
              <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
            </Button>
          </div>
        </div>

        {/* Metrics Cards Section */}
        <div className="rounded-xl p-5 bg-white/5 border border-white/10 shadow-md">
          <MetricsCards loading={loading} />
        </div>

        {/* Two-column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl p-5 bg-white/5 border border-white/10 shadow-md">
            <ActivityTimeline loading={loading} />
          </div>
          <div className="rounded-xl p-5 bg-white/5 border border-white/10 shadow-md">
            <SystemHealth loading={loading} />
          </div>
        </div>

        {/* Recent Contracts Section */}
        <div className="rounded-xl p-5 border border-blue-500/30 bg-white/5 shadow-md">
          <RecentContracts loading={loading} />
        </div>
      </div>
    </div>
  )
}
