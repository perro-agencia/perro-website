"use client"

import { motion } from "framer-motion"

interface Props {
  text: string
  className?: string
}

export function AnimatedText({ text, className }: Props) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {text}
    </motion.span>
  )
}
