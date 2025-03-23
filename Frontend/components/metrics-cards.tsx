"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight, FileCheck, FuelIcon as GasPump, Package, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricsCardsProps {
  loading: boolean
}

export function MetricsCards({ loading }: MetricsCardsProps) {
  const [metrics, setMetrics] = useState({
    activeContracts: 0,
    archivedContracts: 0,
    gasUsage: 0,
    verificationRate: 0,
  })

  useEffect(() => {
    if (!loading) {
      // Simulate data loading
      const timer = setTimeout(() => {
        setMetrics({
          activeContracts: 42,
          archivedContracts: 18,
          gasUsage: 0.0023,
          verificationRate: 98.5,
        })
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [loading])

  const cards = [
    {
      title: "Active Contracts",
      value: metrics.activeContracts,
      icon: Package,
      color: "bg-emerald-500/10 text-emerald-500",
      trend: "+12% from last month",
    },
    {
      title: "Archived Contracts",
      value: metrics.archivedContracts,
      icon: FileCheck,
      color: "bg-slate-500/10 text-slate-400",
      trend: "+3 this week",
    },
    {
      title: "Avg. Gas Usage",
      value: metrics.gasUsage,
      unit: "ETH",
      icon: GasPump,
      color: "bg-blue-500/10 text-blue-500",
      trend: "-5% from last month",
    },
    {
      title: "Verification Rate",
      value: metrics.verificationRate,
      unit: "%",
      icon: ShieldCheck,
      color: "bg-amber-500/10 text-amber-500",
      trend: "Stable",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card
          key={index}
          className={cn("card-glow overflow-hidden border border-border/50 shadow-md", loading ? "animate-pulse" : "")}
        >
          <CardContent className="p-6">
            {loading ? (
              <div className="space-y-3">
                <div className="h-6 w-24 loading-skeleton rounded" />
                <div className="h-8 w-16 loading-skeleton rounded" />
                <div className="h-4 w-20 loading-skeleton rounded" />
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">{card.title}</h3>
                  <div className={cn("p-2 rounded-full", card.color)}>
                    <card.icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{card.value.toLocaleString()}</span>
                  {card.unit && <span className="ml-1 text-muted-foreground">{card.unit}</span>}
                </div>
                <div className="flex items-center mt-2 text-xs text-muted-foreground">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>{card.trend}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

