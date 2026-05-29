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
  gradientFrom: string
  gradientTo: string
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

export function ServiceCard({ service, className, index }: { service: Service; className?: string; index?: number }) {
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
    "absolute left-[15%] top-[15%] w-[75px] h-[75px]",
    "absolute right-[18%] top-[25%] w-[75px] h-[75px]",
    "absolute left-[25%] bottom-[20%] w-[75px] h-[75px]",
    "absolute right-[30%] bottom-[15%] w-[75px] h-[75px]",
  ]

  return (
    <motion.div
      ref={containerRef}
      variants={cardVariants}
      className={`group text-left flex flex-col justify-between rounded-3xl w-full overflow-hidden relative ${service.bg} ${className || ""}`}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out rounded-3xl"
        style={{ background: `linear-gradient(135deg, ${service.gradientFrom}, ${service.gradientTo})` }}
      />
      <div className="p-8 pb-0 relative z-10">
        <h3 className={`text-3xl font-medium font-display mb-2 ${service.textColor}`}>
          {service.title}
        </h3>
        <p className={`text-lg font-light ${service.textColor}`}>
          {service.description}
        </p>
      </div>

      {service.floatingIcons && service.floatingIcons.length > 0 ? (
        <div
          className="relative w-full mt-10 mx-auto mt-auto flex items-end justify-center select-none overflow-visible z-10"
        >
          <Image
            src={service.image}
            alt={service.title}
            width={260}
            height={350}
            className="object-contain w-[40%] sm:w-[50%] max-w-[250px] pointer-events-none select-none transition-transform duration-700 ease-out group-hover:scale-[1.10]"
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
                <Image src={icon} alt="" fill className="object-contain pointer-events-none select-none max-w-[90px]" />
              </motion.div>
            )
          })}
        </div>
      ) : (
        <div className="w-full mx-auto mt-auto flex items-center justify-center overflow-hidden relative z-10">
          <Image
            src={service.image}
            alt={service.title}
            width={600}
            height={400}
            className="w-full max-w-[450px] h-full object-contain pointer-events-none select-none transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      )}
    </motion.div>
  )
}
