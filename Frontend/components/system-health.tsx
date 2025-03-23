"use client"

import { useState, useEffect } from "react"
import { RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SystemHealthProps {
  loading: boolean
}

export function SystemHealth({ loading }: SystemHealthProps) {
  const [services, setServices] = useState<any[]>([])
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (!loading) {
      // Simulate data loading
      const timer = setTimeout(() => {
        setServices([
          { name: "EDU Chain", status: "active", uptime: "99.9%" },
          { name: "IPFS", status: "active", uptime: "99.7%" },
          { name: "Arweave", status: "warning", uptime: "97.2%" },
          { name: "Archiva API", status: "active", uptime: "99.8%" },
        ])
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [loading])

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "status-active"
      case "warning":
        return "status-warning"
      case "error":
        return "status-error"
      default:
        return "status-inactive"
    }
  }

  return (
    <Card className="border border-border/50 shadow-md">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle>System Health</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          disabled={loading || refreshing}
          className="h-8 w-8 p-0"
        >
          <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
          <span className="sr-only">Refresh</span>
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="h-4 w-24 loading-skeleton rounded" />
                <div className="h-4 w-16 loading-skeleton rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className={cn("status-indicator mr-2", getStatusClass(service.status))} />
                  <span className="font-medium">{service.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">Uptime: {service.uptime}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-secondary">
                    {service.status === "active"
                      ? "Operational"
                      : service.status === "warning"
                        ? "Degraded"
                        : "Offline"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

