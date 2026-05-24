"use client"

import { useState } from "react"
import Link from "next/link"
import type { Route } from "next"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

const buttonVariants = cva("inline-flex items-center gap-2 transition-all duration-200", {
  variants: {
    variant: {
      cta: cn(
        "group py-2 pl-6 pr-3",
        "border-2 border-brand-white bg-brand-white rounded-full",
        "text-md font-display uppercase tracking-wide leading-none text-brand-black font-medium",
        "hover:bg-brand-black hover:text-brand-white",
        "ease-brand-bounce"
      ),
      primary: cn(
        "px-6 py-3",
        "bg-brand-primary-main text-brand-white rounded-lg font-medium",
        "hover:opacity-90 transition-opacity"
      ),
      outline: cn(
        "px-6 py-3",
        "border border-brand-white/20 text-brand-white rounded-lg font-medium",
        "hover:bg-brand-white/10 transition-colors"
      ),
    },
  },
  defaultVariants: {
    variant: "cta",
  },
})

type ButtonProps = VariantProps<typeof buttonVariants> & {
  href: Route
  children: React.ReactNode
  className?: string
  showIcon?: boolean
}

const containerVariants = {
  initial: { x: 0 },
  hover: {
    x: 2,
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
}

const arrowVariants = {
  initial: { x: 0, y: 0 },
  hover: {
    x: [0, 16, -16, 0],
    y: [0, -16, 16, 0],
    transition: { duration: 0.5, ease: "easeInOut" as const },
  },
}

export function Button({ href, children, variant, className, showIcon = true }: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant }), className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>{children}</span>
      {showIcon && (
        <motion.span
          aria-hidden="true"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-brand-black group-hover:bg-brand-white transition-colors mb-[2px] overflow-hidden"
          animate={isHovered ? "hover" : "initial"}
          variants={containerVariants}
        >
          <motion.svg
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-current text-white group-hover:text-brand-black transition-colors"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            animate={isHovered ? "hover" : "initial"}
            variants={arrowVariants}
          >
            <path d="M9 5V7H15.59L4 18.59L5.41 20L17 8.41V15H19V5H9Z" />
          </motion.svg>
        </motion.span>
      )}
    </Link>
  )
}
