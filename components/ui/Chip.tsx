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
          "border-white text-brand-white hover:text-brand-accent-02 hover:border-brand-accent-02 py-3 px-8 border-2",
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
  return (
    <motion.span
      className={cn(chipVariants({ variant }), className)}
      whileHover={variant === "outline" ? { boxShadow: "0 0 24px -4px #c4f875" } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  )
}
