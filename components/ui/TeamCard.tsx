"use client"

import { motion } from "framer-motion"
import Image from "next/image"

type BgClass = "bg-brand-primary-main" | "bg-brand-accent-01" | "bg-brand-accent-02" | "bg-brand-white"
type TextColorClass = "text-brand-white" | "text-brand-black"

type TeamCardProps = {
  name: string
  role: string
  image: string
  bg: BgClass
  textColor: TextColorClass
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export function TeamCard({ name, role, image, bg, textColor }: TeamCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className={`md:py-4 flex flex-col items-center justify-start text-center rounded-3xl overflow-hidden lg:min-h-[350px] ${bg}`}
    >
      <div className="relative w-[70%] aspect-[4/5]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className={`text-3xl font-display font-medium ${textColor}`}>
          {name}
        </h3>
        <p className={`text-xl font-display font-light mt-1 ${textColor}`}>
          {role}
        </p>
      </div>
    </motion.div>
  )
}
