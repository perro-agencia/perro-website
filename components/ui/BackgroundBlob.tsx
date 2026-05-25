"use client"

import { AmbientBlob } from "./AmbientBlob"

export function BackgroundBlob() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      <AmbientBlob
        color="bg-white/10"
        size={500}
        blur={120}
        speed={0.8}
      />
    </div>
  )
}
