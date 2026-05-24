"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function FooterLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="hidden md:block"
    >
      <Image
        src="/miscelaneous/perro-logo-cut-white.svg"
        alt="PERRO Agency logo"
        width={268}
        height={352}
        className="w-full h-auto"
      />
    </motion.div>
  )
}
