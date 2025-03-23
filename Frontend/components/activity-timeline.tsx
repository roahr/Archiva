"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Clock, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ActivityTimelineProps {
  loading: boolean
}

export function ActivityTimeline({ loading }: ActivityTimelineProps) {
  const [activities, setActivities] = useState<any[]>([])

  useEffect(() => {
    if (!loading) {
      // Simulate data loading
      const timer = setTimeout(() => {
        setActivities([
          {
            id: 1,
            action: "Contract deployed",
            contract: "TokenSwap.sol",
            time: "10 minutes ago",
            status: "success",
          },
          {
            id: 2,
            action: "Contract archived",
            contract: "LiquidityPool.sol",
            time: "1 hour ago",
            status: "neutral",
          },
          {
            id: 3,
            action: "Verification failed",
            contract: "NFTMarketplace.sol",
            time: "3 hours ago",
            status: "error",
          },
          {
            id: 4,
            action: "Contract deployed",
            contract: "StakingRewards.sol",
            time: "5 hours ago",
            status: "success",
          },
          {
            id: 5,
            action: "Contract archived",
            contract: "VotingSystem.sol",
            time: "Yesterday",
            status: "neutral",
          },
        ])
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [loading])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-slate-400" />
    }
  }

  return (
    <Card className="border border-border/50 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="h-5 w-5 rounded-full loading-skeleton" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-3/4 loading-skeleton rounded" />
                  <div className="h-3 w-1/2 loading-skeleton rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="mt-0.5">{getStatusIcon(activity.status)}</div>
                <div>
                  <p className="font-medium">
                    {activity.action}: <span className="text-primary">{activity.contract}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

