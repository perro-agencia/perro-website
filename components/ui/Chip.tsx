"use client"

import { motion } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const chipVariants = cva(
  "inline-block text-[13px] md:text-base uppercase rounded-full border font-light transition-colors duration-300",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-primary-main text-black border-brand-primary-main py-1 px-8 md:py-3 md:px-24",
        outline:
          "border-white text-brand-white hover:text-brand-accent-02 hover:border-brand-accent-02 py-3 px-8 border-[1px]",
        "outline-dark":
          "border-brand-black text-brand-black hover:text-brand-primary-main hover:border-brand-primary-main py-3 px-8 border-[1px]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

type ChipProps = VariantProps<typeof chipVariants> & {
  children: React.ReactNode
  className?: string
}

export function Chip({ children, variant, className }: ChipProps) {
  const glowColor = variant === "outline-dark" ? "#885de3" : "#c4f875"

  return (
    <motion.span
      className={cn(chipVariants({ variant }), className)}
      whileHover={{ boxShadow: `0 0 24px -4px ${glowColor}` }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  )
}
