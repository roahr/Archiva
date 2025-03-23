"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Box,
  ChevronLeft,
  ChevronRight,
  Database,
  LayoutDashboard,
  Package,
  Settings,
  Upload,
  Activity,
  Shield,
  User
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  open: boolean
  onToggle: () => void
}

export function Sidebar({ open, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Contracts", href: "/contracts", icon: Package },
    { name: "Deploy", href: "/deploy", icon: Upload },
    { name: "Contract Hub", href: "/hub", icon: Box },
    { name: "Playground", href: "/playground", icon: Activity },
    { name: "Archival", href: "/archival", icon: Database },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col glassmorphism transition-all duration-300 ease-in-out bg-black",
        open ? "w-64" : "w-20",
      )}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(30,30,30,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(30,30,30,0.1)_1px,transparent_1px)] pointer-events-none"
        style={{ backgroundSize: "40px 40px" }}
      ></div>
      
      {/* Simple hex pattern - minimal representation of blockchain */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 0l15 10.25L45 0 60 15l-10.25 15L60 45 45 60 30 49.75 15 60 0 45l10.25-15L0 15 15 0z' fill='%23FFFFFF' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
      ></div>

      {/* Sidebar Header with Logo & Toggle Button */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-border/30 relative z-10">
        <div className="flex items-center gap-2">
          {/* Logo Image */}
          <img src="/logo.svg" alt="Archiva Logo" className="h-5 w-5" />
          
          {/* Archiva Text (Only visible when sidebar is open) */}
          {open && (
            <span className="font-semibold text-lg bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Archiva
            </span>
          )}
        </div>
        
        {/* Toggle Button */}
        <button onClick={onToggle} className="p-1 rounded-md hover:bg-secondary/50 transition-colors">
          {open ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto relative z-10">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-md transition-all duration-200 group",
                isActive
                  ? "bg-primary/20 text-primary"
                  : "text-foreground/70 hover:bg-secondary/50 hover:text-foreground",
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-all",
                  isActive ? "text-primary" : "text-foreground/70 group-hover:text-foreground",
                )}
              />
              {open && (
                <span className={cn("ml-3 transition-all duration-200", isActive ? "font-medium" : "")}>
                  {item.name}
                </span>
              )}
              {!open && isActive && <div className="absolute left-0 w-1 h-5 bg-primary rounded-r-full" />}
            </Link>
          )
        })}
      </nav>

      {/* User Info Section */}
      <div className="p-4 border-t border-border/30 relative z-10">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <User className="h-4 w-4 text-blue-400" />
          </div>
          {open && (
            <div className="ml-3">
              <p className="text-sm font-medium">Demo User</p>
              <p className="text-xs text-muted-foreground">demo@archiva.io</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
