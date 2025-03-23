"use client"

import { useState, useEffect } from "react"
import { AlertCircle, Database, HardDrive, RefreshCw, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function ArchivalManagement() {
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Archival Management</h2>
          <p className="text-muted-foreground">Configure and manage your contract storage solutions</p>
        </div>

        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading || refreshing}>
          <RefreshCw className={cn("h-4 w-4 mr-2", refreshing && "animate-spin")} />
          Refresh Status
        </Button>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Storage Configuration</AlertTitle>
        <AlertDescription>
          Your archival settings determine how and where your smart contracts are stored for long-term preservation.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-3 md:w-auto w-full">
          <TabsTrigger value="overview">
            <HardDrive className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="ipfs">
            <Database className="h-4 w-4 mr-2" />
            IPFS Config
          </TabsTrigger>
          <TabsTrigger value="arweave">
            <Settings className="h-4 w-4 mr-2" />
            Arweave Config
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle>Storage Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    <div className="h-4 w-full loading-skeleton rounded" />
                    <div className="h-4 w-3/4 loading-skeleton rounded" />
                    <div className="h-4 w-1/2 loading-skeleton rounded" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total Contracts</span>
                      <span className="font-medium">42</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">On-Chain Storage</span>
                      <span className="font-medium">18 contracts (42.8%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">IPFS Storage</span>
                      <span className="font-medium">15 contracts (35.7%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Arweave Storage</span>
                      <span className="font-medium">9 contracts (21.5%)</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle>Storage Health</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    <div className="h-4 w-full loading-skeleton rounded" />
                    <div className="h-4 w-3/4 loading-skeleton rounded" />
                    <div className="h-4 w-1/2 loading-skeleton rounded" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className="status-indicator status-active mr-2" />
                      <span className="text-muted-foreground">On-Chain Storage:</span>
                      <span className="ml-auto font-medium">Operational</span>
                    </div>
                    <div className="flex items-center">
                      <span className="status-indicator status-active mr-2" />
                      <span className="text-muted-foreground">IPFS Gateway:</span>
                      <span className="ml-auto font-medium">Operational</span>
                    </div>
                    <div className="flex items-center">
                      <span className="status-indicator status-warning mr-2" />
                      <span className="text-muted-foreground">Arweave Gateway:</span>
                      <span className="ml-auto font-medium">Degraded Performance</span>
                    </div>
                    <div className="flex items-center">
                      <span className="status-indicator status-active mr-2" />
                      <span className="text-muted-foreground">Verification Service:</span>
                      <span className="ml-auto font-medium">Operational</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="border border-border/50 mt-6">
            <CardHeader>
              <CardTitle>Default Storage Settings</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  <div className="h-4 w-full loading-skeleton rounded" />
                  <div className="h-4 w-3/4 loading-skeleton rounded" />
                  <div className="h-4 w-1/2 loading-skeleton rounded" />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="default-storage">Default Storage Type</Label>
                    <select
                      id="default-storage"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="on-chain">On-Chain</option>
                      <option value="ipfs">IPFS</option>
                      <option value="arweave">Arweave</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-archive">Auto-Archive Contracts</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically archive inactive contracts after 30 days
                      </p>
                    </div>
                    <Switch id="auto-archive" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="redundant-storage">Redundant Storage</Label>
                      <p className="text-sm text-muted-foreground">
                        Store contracts on multiple storage solutions for redundancy
                      </p>
                    </div>
                    <Switch id="redundant-storage" checked />
                  </div>

                  <Button>Save Settings</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ipfs" className="mt-4">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle>IPFS Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  <div className="h-4 w-full loading-skeleton rounded" />
                  <div className="h-4 w-3/4 loading-skeleton rounded" />
                  <div className="h-4 w-1/2 loading-skeleton rounded" />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="ipfs-gateway">IPFS Gateway URL</Label>
                    <Input id="ipfs-gateway" defaultValue="https://ipfs.archiva.io/ipfs/" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ipfs-api">IPFS API Endpoint</Label>
                    <Input id="ipfs-api" defaultValue="https://api.ipfs.archiva.io" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ipfs-pin">Pin Service</Label>
                    <select
                      id="ipfs-pin"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="pinata">Pinata</option>
                      <option value="infura">Infura</option>
                      <option value="web3storage">Web3.Storage</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="ipfs-multipin">Multi-Pin</Label>
                      <p className="text-sm text-muted-foreground">Pin content to multiple IPFS nodes for redundancy</p>
                    </div>
                    <Switch id="ipfs-multipin" checked />
                  </div>

                  <Button>Save IPFS Settings</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="arweave" className="mt-4">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle>Arweave Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  <div className="h-4 w-full loading-skeleton rounded" />
                  <div className="h-4 w-3/4 loading-skeleton rounded" />
                  <div className="h-4 w-1/2 loading-skeleton rounded" />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="arweave-gateway">Arweave Gateway URL</Label>
                    <Input id="arweave-gateway" defaultValue="https://arweave.net/" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="arweave-wallet">Wallet Configuration</Label>
                    <div className="flex gap-2">
                      <Input id="arweave-wallet" type="password" value="••••••••••••••••••••••••••••••" readOnly />
                      <Button variant="outline">Update</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your Arweave wallet is securely stored and used for transaction fees
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="arweave-bundler">Bundling Service</Label>
                    <select
                      id="arweave-bundler"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="none">None (Direct Upload)</option>
                      <option value="bundlr">Bundlr Network</option>
                      <option value="custom">Custom Bundler</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="arweave-auto-fund">Auto-Fund</Label>
                      <p className="text-sm text-muted-foreground">Automatically fund wallet when balance is low</p>
                    </div>
                    <Switch id="arweave-auto-fund" />
                  </div>

                  <Button>Save Arweave Settings</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

