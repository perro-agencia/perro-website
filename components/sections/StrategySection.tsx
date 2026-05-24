"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Chip } from "@/components/ui/Chip"

const chips = [
  { label: "Estrategia", z: "z-10", pos: "left-[5%] bottom-[50%] md:bottom-[15%]" },
  { label: "crecimiento", z: "z-30", pos: "right-[18%] bottom-[25%]" },
  { label: "resultados", z: "z-10", pos: "left-[10%] bottom-[35%]" },
  { label: "innovación", z: "z-30", pos: "right-[5%] bottom-[40%]" },
]

export function StrategySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [offsets, setOffsets] = useState<number[]>(chips.map(() => 0))

  useEffect(() => {
    let rafId: number
    const update = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const viewportH = window.innerHeight
      const sectionVisible = rect.bottom - rect.top
      const scrollable = sectionVisible + viewportH
      const progress = Math.max(0, Math.min(1, (viewportH - rect.top) / scrollable))

      setOffsets(chips.map((_, i) => {
        const from = 400 - i * 80
        const to = -300 + i * 50
        return from + (to - from) * progress
      }))

      rafId = requestAnimationFrame(update)
    }
    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:pb-48 overflow-hidden max-w-[1500px] mx-auto"
    >
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="grid gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <Image
              src="/miscelaneous/perro-team.png"
              alt="Equipo PERRO Agency"
              width={1134}
              height={800}
              className="w-full h-auto object-cover rounded-3xl"
              priority
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="relative z-20 text-center font-display font-light leading-[0.95] -tracking-[0.03em] text-[clamp(2.5rem,8vw,8rem)] mt-[-200px] md:mt-[-400px] max-w-[1400px] mx-auto"
          >
            Ideas jóvenes, visión digital & una estrategia que impulsa tu negocio.
          </motion.h2>
        </div>
      </div>

      {chips.map((chip, i) => (
        <div
          key={chip.label}
          className={`absolute block ${chip.z} ${chip.pos}`}
          style={{ transform: `translateY(${offsets[i]}px)` }}
        >
          <Chip variant="primary">{chip.label}</Chip>
        </div>
      ))}
    </section>
  )
}
