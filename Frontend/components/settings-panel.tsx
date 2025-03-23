"use client"

import { useState, useEffect } from "react"
import { Bell, Moon, Shield, Sun, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function SettingsPanel() {
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
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-4 md:w-auto w-full">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Sun className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your account information and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="h-4 w-24 loading-skeleton rounded" />
                    <div className="h-10 w-full loading-skeleton rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 loading-skeleton rounded" />
                    <div className="h-10 w-full loading-skeleton rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 loading-skeleton rounded" />
                    <div className="h-10 w-full loading-skeleton rounded" />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Display Name</Label>
                    <Input id="name" defaultValue="Demo User" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="demo@archiva.io" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" defaultValue="Archiva Inc." />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us about yourself"
                      defaultValue="Smart contract developer and blockchain enthusiast."
                    />
                  </div>

                  <Button>Save Profile</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-4">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="h-4 w-24 loading-skeleton rounded" />
                    <div className="h-10 w-full loading-skeleton rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 loading-skeleton rounded" />
                    <div className="h-10 w-full loading-skeleton rounded" />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="theme">Theme</Label>
                      <p className="text-sm text-muted-foreground">Choose between light and dark mode</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4" />
                      <Switch id="theme" checked />
                      <Moon className="h-4 w-4" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="accent-color">Accent Color</Label>
                    <div className="grid grid-cols-5 gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-500 cursor-pointer ring-2 ring-offset-2 ring-offset-background ring-primary" />
                      <div className="h-8 w-8 rounded-full bg-purple-500 cursor-pointer" />
                      <div className="h-8 w-8 rounded-full bg-green-500 cursor-pointer" />
                      <div className="h-8 w-8 rounded-full bg-amber-500 cursor-pointer" />
                      <div className="h-8 w-8 rounded-full bg-red-500 cursor-pointer" />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="animations">Animations</Label>
                      <p className="text-sm text-muted-foreground">Enable or disable UI animations</p>
                    </div>
                    <Switch id="animations" checked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="compact-view">Compact View</Label>
                      <p className="text-sm text-muted-foreground">Use a more compact UI layout</p>
                    </div>
                    <Switch id="compact-view" />
                  </div>

                  <Button>Save Appearance</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="h-4 w-24 loading-skeleton rounded" />
                    <div className="h-10 w-full loading-skeleton rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 loading-skeleton rounded" />
                    <div className="h-10 w-full loading-skeleton rounded" />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch id="email-notifications" checked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="browser-notifications">Browser Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                    </div>
                    <Switch id="browser-notifications" checked />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Notification Types</h3>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="contract-deployments" className="flex items-center">
                        Contract Deployments
                      </Label>
                      <Switch id="contract-deployments" checked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="contract-interactions" className="flex items-center">
                        Contract Interactions
                      </Label>
                      <Switch id="contract-interactions" checked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="storage-alerts" className="flex items-center">
                        Storage Alerts
                      </Label>
                      <Switch id="storage-alerts" checked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="system-updates" className="flex items-center">
                        System Updates
                      </Label>
                      <Switch id="system-updates" />
                    </div>
                  </div>

                  <Button>Save Notification Settings</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <Card className="border border-border/50">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and authentication options</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="h-4 w-24 loading-skeleton rounded" />
                    <div className="h-10 w-full loading-skeleton rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 loading-skeleton rounded" />
                    <div className="h-10 w-full loading-skeleton rounded" />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>

                  <Button>Update Password</Button>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch id="two-factor" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="wallet-auth">Wallet Authentication</Label>
                      <p className="text-sm text-muted-foreground">Use your Web3 wallet for authentication</p>
                    </div>
                    <Switch id="wallet-auth" checked />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

