"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function HeroBackdrop() {
  return (
    <div className="absolute inset-0">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/miscelaneous/atar-animation.gif"
          alt=""
          width={694}
          height={1000}
          className="absolute right-[-200px] md:right-0 -top-60 h-[1300px] w-auto object-contain -rotate-[-15deg]"
          priority
        />
      </motion.div>
    </div>
  )
}