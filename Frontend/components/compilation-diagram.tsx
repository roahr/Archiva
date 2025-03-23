"use client"

import { useEffect, useRef } from "react"

export function CompilationDiagram() {
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

      // Draw code blocks
      const blocks = [
        { x: 50, y: 50, width: 200, height: 100, text: "Solidity Code" },
        { x: 250, y: 50, width: 200, height: 100, text: "Compilation" },
        { x: 150, y: 200, width: 200, height: 100, text: "Bytecode" }
      ]

      blocks.forEach((block, index) => {
        // Draw block
        ctx.fillStyle = colors.secondary
        ctx.fillRect(block.x, block.y, block.width, block.height)
        
        // Draw border
        ctx.strokeStyle = colors.primary
        ctx.lineWidth = 2
        ctx.strokeRect(block.x, block.y, block.width, block.height)

        // Draw text
        ctx.fillStyle = colors.text
        ctx.font = "14px monospace"
        ctx.textAlign = "center"
        ctx.fillText(block.text, block.x + block.width/2, block.y + block.height/2 + 5)

        // Draw connecting lines with animation
        if (index < blocks.length - 1) {
          const progress = (frame % totalFrames) / totalFrames
          const startX = blocks[index].x + blocks[index].width
          const startY = blocks[index].y + blocks[index].height/2
          const endX = blocks[index + 1].x
          const endY = blocks[index + 1].y + blocks[index + 1].height/2

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
        }
      })

      // Draw compilation status
      const statusText = frame % totalFrames < totalFrames/2 ? "Compiling..." : "Success!"
      ctx.fillStyle = colors.accent
      ctx.font = "16px monospace"
      ctx.textAlign = "center"
      ctx.fillText(statusText, canvas.width/2, 350)

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