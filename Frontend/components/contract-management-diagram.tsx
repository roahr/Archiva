"use client"

import { useEffect, useRef } from "react"

export function ContractManagementDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 500
    canvas.height = 400

    // Colors
    const colors = {
      primary: "#91E4F2",
      secondary: "#1186B1",
      accent: "#D55455",
      background: "#2B2B2B",
      text: "#A09F9F"
    }

    // Animation state
    let frame = 0
    const totalFrames = 120

    // Draw function
    function draw() {
      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw central contract icon
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = 60

      // Draw contract circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fillStyle = colors.secondary
      ctx.fill()
      ctx.strokeStyle = colors.primary
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw contract lines
      const lineCount = 5
      const lineSpacing = 20
      const startY = centerY - (lineCount * lineSpacing) / 2

      for (let i = 0; i < lineCount; i++) {
        const y = startY + i * lineSpacing
        const progress = (frame + i * 10) % totalFrames / totalFrames
        const width = 40 + Math.sin(progress * Math.PI) * 20

        ctx.fillStyle = colors.primary
        ctx.fillRect(centerX - width/2, y - 2, width, 4)
      }

      // Draw connecting nodes
      const nodes = [
        { x: 100, y: 100, text: "Analytics" },
        { x: canvas.width - 100, y: 100, text: "Storage" },
        { x: 100, y: canvas.height - 100, text: "Security" },
        { x: canvas.width - 100, y: canvas.height - 100, text: "Web3" }
      ]

      nodes.forEach((node, index) => {
        // Draw node
        ctx.fillStyle = colors.secondary
        ctx.beginPath()
        ctx.arc(node.x, node.y, 30, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = colors.primary
        ctx.stroke()

        // Draw connecting line with animation
        const progress = (frame + index * 30) % totalFrames / totalFrames
        const startX = node.x
        const startY = node.y
        const endX = centerX
        const endY = centerY

        // Draw static line
        ctx.strokeStyle = colors.primary + "40"
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.stroke()

        // Draw animated line
        const animatedX = startX + (endX - startX) * progress
        const animatedY = startY + (endY - startY) * progress

        ctx.strokeStyle = colors.primary
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(animatedX, animatedY)
        ctx.stroke()

        // Draw moving dot
        ctx.fillStyle = colors.accent
        ctx.beginPath()
        ctx.arc(animatedX, animatedY, 4, 0, Math.PI * 2)
        ctx.fill()

        // Draw text
        ctx.fillStyle = colors.text
        ctx.font = "14px monospace"
        ctx.textAlign = "center"
        ctx.fillText(node.text, node.x, node.y + 50)
      })

      // Draw status text
      const statusText = frame % totalFrames < totalFrames/2 ? "Managing..." : "Active"
      ctx.fillStyle = colors.accent
      ctx.font = "16px monospace"
      ctx.textAlign = "center"
      ctx.fillText(statusText, canvas.width/2, canvas.height - 20)

      // Continue animation
      frame++
      requestAnimationFrame(draw)
    }

    // Start animation
    draw()

    // Cleanup
    return () => {
      // Animation will stop when component unmounts
    }
  }, [])

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full h-auto rounded-lg shadow-2xl border border-[#91E4F2]/10"
      />
      {/* Decorative elements */}
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#91E4F2]/20 rounded-full blur-xl" />
      <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-[#D55455]/20 rounded-full blur-xl" />
    </div>
  )
} 