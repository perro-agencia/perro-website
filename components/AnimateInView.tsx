"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  className?: string
  as?: "section" | "div"
  delay?: number
}

export function AnimateInView({ children, className, as = "div", delay = 0 }: Props) {
  const Component = as === "section" ? motion.section : motion.div

  return (
    <Component
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </Component>
  )
}
