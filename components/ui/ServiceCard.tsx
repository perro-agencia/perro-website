"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

export type Service = {
  title: string
  image: string
  description: string
  bg: string
  textColor: string
  shadowColor: string
  floatingIcons?: string[]
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export function ServiceCard({ service }: { service: Service }) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // 4 distinct counter-directional y offsets for parallax
  const yOffsets = [
    useTransform(scrollYProgress, [0, 1], [-40, 40]),
    useTransform(scrollYProgress, [0, 1], [-30, 30]),
    useTransform(scrollYProgress, [0, 1], [-60, 60]),
    useTransform(scrollYProgress, [0, 1], [50, -80]),
  ]

  const positionClasses = [
    "absolute left-[5%] top-[15%] w-[100px] h-[100px]",
    "absolute right-[8%] top-[25%] w-[100px] h-[100px]",
    "absolute left-[15%] bottom-[20%] w-[100px] h-[100px]",
    "absolute right-[20%] bottom-[15%] w-[100px] h-[100px]",
  ]

  return (
    <motion.div
      ref={containerRef}
      variants={cardVariants}
      className={`group text-left flex flex-col rounded-3xl max-w-[500px] w-full overflow-hidden ${service.bg}`}
    >
      <div className="p-8 pb-0">
        <h3 className={`text-3xl font-medium font-display mb-2 ${service.textColor}`}>
          {service.title}
        </h3>
        <p className={`text-lg font-light ${service.textColor}`}>
          {service.description}
        </p>
      </div>

      {service.floatingIcons && service.floatingIcons.length > 0 ? (
        <div
          className="relative w-full max-w-[500px] aspect-[4/3] mx-auto mt-auto flex items-end justify-center select-none overflow-visible"
        >
          <Image
            src={service.image}
            alt={service.title}
            width={260}
            height={350}
            className="object-contain w-[60%] sm:w-[55%] pointer-events-none select-none transition-transform duration-700 ease-out group-hover:scale-[1.2]"
          />
          {service.floatingIcons.map((icon, index) => {
            const yVal = yOffsets[index % yOffsets.length]
            const posClass = positionClasses[index % positionClasses.length]
            return (
              <motion.div
                key={icon}
                style={{ y: yVal }}
                className={posClass}
              >
                <Image src={icon} alt="" fill className="object-contain pointer-events-none select-none" />
              </motion.div>
            )
          })}
        </div>
      ) : (
        <Image
          src={service.image}
          alt={service.title}
          width={600}
          height={400}
          className="w-full max-w-[450px] self-center mt-auto pointer-events-none select-none transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}
    </motion.div>
  )
}
