"use client"

import { useState } from "react"
import { Bell, Menu, Settings, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ConnectWalletButton } from "@/components/connect-wallet-button"
import { useRouter } from "next/navigation"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  type: "info" | "warning" | "success"
}

export function Header({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Contract Deployed",
      message: "CourseRegistration contract has been successfully deployed to the network.",
      time: "5 minutes ago",
      type: "success"
    },
    {
      id: "2",
      title: "Storage Alert",
      message: "IPFS storage usage is approaching 80% capacity.",
      time: "1 hour ago",
      type: "warning"
    },
    {
      id: "3",
      title: "System Update",
      message: "New version of the platform is available. Please update to the latest version.",
      time: "2 hours ago",
      type: "info"
    }
  ])

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "text-emerald-500"
      case "warning":
        return "text-amber-500"
      case "info":
        return "text-blue-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <header className="h-16 border-b border-blue-500/20 flex items-center justify-between px-6 bg-gradient-to-r from-blue-50/5 to-white/10 backdrop-blur-md z-10 shadow-sm">
      <div className="flex items-center space-x-3">
        {/* Sidebar Toggle Button */}
        <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>

        {/* Connect Wallet Button (Moved from Right to Left) */}
        <ConnectWalletButton />
      </div>

      <div className="flex items-center space-x-3">
        {/* Notifications Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-primary text-primary-foreground text-xs">
                  {notifications.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-4">
                <div className="flex items-center justify-between w-full">
                  <span className={`font-medium ${getNotificationColor(notification.type)}`}>
                    {notification.title}
                  </span>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="w-full text-center">
              View All Notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/")}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
