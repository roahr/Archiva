"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { LoadingScreen } from "@/components/loading-screen"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-blue-950 via-black to-black relative">
      
      {/* Animated Background Glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

      {/* Sidebar with Smooth Transition */}
      <Sidebar open={sidebarOpen} onToggle={toggleSidebar} />
      
      {/* Main Content Area */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        
        {/* Header with Glassmorphism */}
        <Header onToggleSidebar={toggleSidebar} />

        {/* Content Wrapper with Glass Effect */}
        <main className="flex-1 overflow-y-auto p-6 m-4 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  )
}
