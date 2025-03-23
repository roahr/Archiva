"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Calendar, Clock, Download, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Monitor your contract performance and storage metrics</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 Days
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="border border-border/50 animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-4 w-24 loading-skeleton rounded" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 w-16 loading-skeleton rounded" />
                  <div className="h-4 w-20 loading-skeleton rounded mt-2" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <>
            <Card className="border border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <span className="text-emerald-500 mr-1">↑ 12%</span> vs last month
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Storage Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2 GB</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <span className="text-emerald-500 mr-1">↑ 8%</span> vs last month
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245 ms</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <span className="text-emerald-500 mr-1">↓ 18%</span> vs last month
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <span className="text-emerald-500 mr-1">↑ 24%</span> vs last month
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid grid-cols-3 md:w-auto w-full">
          <TabsTrigger value="performance">
            <Clock className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="storage">
            <Database className="h-4 w-4 mr-2" />
            Storage
          </TabsTrigger>
          <TabsTrigger value="transactions">
            <Activity className="h-4 w-4 mr-2" />
            Transactions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="mt-4">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-64 w-full loading-skeleton rounded" />
              ) : (
                <div className="h-64 flex items-center justify-center">
                  <p className="text-muted-foreground">Performance chart will be displayed here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="mt-4">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle>Storage Usage</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-64 w-full loading-skeleton rounded" />
              ) : (
                <div className="h-64 flex items-center justify-center">
                  <p className="text-muted-foreground">Storage usage chart will be displayed here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="mt-4">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle>Transaction Volume</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-64 w-full loading-skeleton rounded" />
              ) : (
                <div className="h-64 flex items-center justify-center">
                  <p className="text-muted-foreground">Transaction volume chart will be displayed here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Database(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  )
}

function Activity(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}

