"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, translateY: 100 },
  visible: {
    opacity: 1,
    translateY: 0,
    transition: { duration: 1, ease: "easeOut" as const },
  },
}

const logos = [
  { src: "/devtools/logo-nextjs.svg", alt: "Next.js" },
  { src: "/devtools/logo-figma.svg", alt: "Figma" },
  { src: "/devtools/logo-vercel.svg", alt: "Vercel" },
  { src: "/devtools/logo-supabase.svg", alt: "Supabase" },
  { src: "/devtools/logo-github.svg", alt: "GitHub" },
  { src: "/devtools/logo-cloudflare.svg", alt: "Cloudflare" },
  { src: "/devtools/logo-linear.svg", alt: "Linear" },
  { src: "/devtools/logo-warp.svg", alt: "Warp" },
  { src: "/devtools/logo-resend.svg", alt: "Resend" },
  { src: "/devtools/logo-webflow.svg", alt: "Webflow" },
  { src: "/devtools/logo-mixpanel.svg", alt: "Mixpanel" },
  { src: "/devtools/logo-antigravity.svg", alt: "Antigravity" },
  { src: "/devtools/logo-sanity.svg", alt: "SanityCms" },
  { src: "/devtools/logo-v0.svg", alt: "V0" },
  { src: "/devtools/logo-claudecode.svg", alt: "ClaudeCode" },
]

const logoPositions: {
  top: string
  left?: string
  right?: string
  depth: "front" | "back"
  yRange: [number, number]
}[] = [
    { top: "5%", left: "5%", depth: "back", yRange: [-80, 80] },
    { top: "2%", left: "40%", depth: "front", yRange: [-60, 110] },
    { top: "20%", right: "20%", depth: "front", yRange: [-100, 30] },
    { top: "30%", left: "10%", depth: "front", yRange: [-40, 90] },
    { top: "35%", right: "3%", depth: "back", yRange: [60, -80] },
    { top: "50%", left: "20%", depth: "back", yRange: [-60, 130] },
    { top: "70%", right: "5%", depth: "front", yRange: [30, -100] },
    { top: "68%", left: "4%", depth: "front", yRange: [80, -60] },
    { top: "68%", right: "20%", depth: "back", yRange: [-30, 70] },
    { top: "85%", left: "30%", depth: "front", yRange: [100, -80] },
    { top: "10%", left: "60%", depth: "back", yRange: [-90, 120] },
    { top: "45%", left: "50%", depth: "back", yRange: [40, -130] },
    { top: "15%", right: "10%", depth: "front", yRange: [40, -130] },
    { top: "25%", left: "70%", depth: "back", yRange: [40, -130] },
    { top: "65%", right: "30%", depth: "front", yRange: [40, -130] },
  ]

export function FloatingLogos() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const yOffsets = logoPositions.map((pos) =>
    useTransform(scrollYProgress, [0, 1], pos.yRange)
  )

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
    >
      {logos.map((logo, i) => {
        const pos = logoPositions[i]
        const isFront = pos.depth === "front"

        return (
          <motion.div
            key={logo.src}
            variants={itemVariants}
            style={{
              y: yOffsets[i],
              top: pos.top,
              left: pos.left,
              right: pos.right,
              zIndex: isFront ? 15 : 0,
            }}
            className="absolute"
          >
            <div
              className={`
                flex items-center justify-center
                w-[40px] h-[40px] md:w-[70px] md:h-[70px]
                rounded-xl md:rounded-2xl
                border border-brand-white/15
                backdrop-blur-xl
                bg-white/5
                ${isFront ? "shadow-[0_0_20px_-8px_rgba(255,255,255,0.15)]" : "opacity-50 scale-[0.65]"}
              `}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={30}
                height={30}
                className="object-contain max-w-[15px] max-h-[15px] md:max-w-[40px] md:max-h-[40px]"
              />
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
