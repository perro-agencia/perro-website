"use client"

import { useEffect, useRef } from "react"

type AmbientBlobProps = {
  color?: string
  size?: number
  blur?: number
  speed?: number
  className?: string
}

export function AmbientBlob({
  color = "bg-white/10",
  size = 500,
  blur = 120,
  speed = 1,
  className,
}: AmbientBlobProps) {
  const blobRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const blob = blobRef.current
    if (!blob) return

    const parent = blob.parentElement
    if (!parent) return

    const maxX = parent.clientWidth - size
    const maxY = parent.clientHeight - size

    let x = Math.random() * Math.max(maxX, 0)
    let y = Math.random() * Math.max(maxY, 0)
    let vx = (Math.random() - 0.5) * 2 * speed
    let vy = (Math.random() - 0.5) * 2 * speed

    let rafId: number

    function animate() {
      x += vx
      y += vy

      if (x <= 0 || x >= maxX) {
        vx = -vx
        x = Math.max(0, Math.min(x, maxX))
      }
      if (y <= 0 || y >= maxY) {
        vy = -vy
        y = Math.max(0, Math.min(y, maxY))
      }

      blob!.style.transform = `translate(${x}px, ${y}px)`
      rafId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(rafId)
  }, [size, speed])

  return (
    <div
      ref={blobRef}
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        willChange: "transform",
      }}
    >
      <div
        className={`w-full h-full ${color} rounded-full animate-morph`}
        style={{ filter: `blur(${blur}px)` }}
      />
    </div>
  )
}
