"use client"

import { motion } from "framer-motion"
// import Image from "next/image"

export function HeroBackdrop() {
  return (
    <div className="absolute inset-0">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        {/* <Image
          src="/miscelaneous/atar-animation.gif"
          alt=""
          width={694}
          height={1000}
          className="absolute right-[-200px] md:right-0 -top-60 h-[1300px] w-auto object-contain -rotate-[-15deg]"
          priority
        /> */}
        <video
          src="/miscelaneous/star-animation-2.1.mp4"
          width={2160}
          height={3840}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute w-auto object-contain h-[1400px] -top-80 right-[-200px] md:right-[-50px] 2xl:right-[100px] 2xl:h-[1500px] min-[2100px]:right-[400px] min-[2100px]:h-[1800px]"
        />
      </motion.div>
    </div>
  )
}