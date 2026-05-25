"use client"

import { useState } from "react"
import Link from "next/link"
import type { Route } from "next"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

const buttonVariants = cva("inline-flex items-center justify-between gap-3 transition-all duration-200", {
  variants: {
    variant: {
      cta: cn(
        "group py-1 pl-4 pr-1",
        "border-2 rounded-full",
        "text-base font-display uppercase tracking-wide leading-none font-medium",
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

type CtaColorScheme = {
  containerBg: string
  containerBorder: string
  text: string
  arrowBg: string
  arrowText: string
  hoverContainerBg: string
  hoverContainerBorder: string
  hoverText: string
  hoverArrowBg: string
  hoverArrowText: string
}

const ctaColorSchemes: Record<string, CtaColorScheme> = {
  default: {
    containerBg: "#ffffff",
    containerBorder: "#ffffff",
    text: "#000000",
    arrowBg: "#000000",
    arrowText: "#ffffff",
    hoverContainerBg: "rgb(0, 0, 0, 0.2)",
    hoverContainerBorder: "#ffffff",
    hoverText: "#ffffff",
    hoverArrowBg: "#ffffff",
    hoverArrowText: "#000000",
  },
  primary: {
    containerBg: "#885de3",
    containerBorder: "#885de3",
    text: "#ffffff",
    arrowBg: "#ffffff",
    arrowText: "#885de3",
    hoverContainerBg: "rgb(107, 63, 201, 0.01)",
    hoverContainerBorder: "#6b3fc9",
    hoverText: "#885de3",
    hoverArrowBg: "#885de3",
    hoverArrowText: "#ffffff",
  },
  accent: {
    containerBg: "#000000",
    containerBorder: "#000000",
    text: "#c4f875",
    arrowBg: "#c4f875",
    arrowText: "#000000",
    hoverContainerBg: "rgb(168, 224, 90, 0.01",
    hoverContainerBorder: "#000000",
    hoverText: "#0a0a0a",
    hoverArrowBg: "#0a0a0a",
    hoverArrowText: "#c4f875",
  },
  dark: {
    containerBg: "#0a0a0a",
    containerBorder: "#0a0a0a",
    text: "#ffffff",
    arrowBg: "#ffffff",
    arrowText: "#0a0a0a",
    hoverContainerBg: "#1a1a1a",
    hoverContainerBorder: "#1a1a1a",
    hoverText: "#ffffff",
    hoverArrowBg: "#ffffff",
    hoverArrowText: "#1a1a1a",
  },
}

type ButtonProps = VariantProps<typeof buttonVariants> & {
  href: Route
  children: React.ReactNode
  className?: string
  showIcon?: boolean
  colorScheme?: keyof typeof ctaColorSchemes
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

export function Button({ href, children, variant, className, showIcon = true, colorScheme: scheme }: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const colors = ctaColorSchemes[scheme ?? "default"] ?? ctaColorSchemes.default

  const colorStyles = {
    "--btn-bg": colors.containerBg,
    "--btn-border": colors.containerBorder,
    "--btn-text": colors.text,
    "--btn-arrow-bg": colors.arrowBg,
    "--btn-arrow-text": colors.arrowText,
    "--btn-hover-bg": colors.hoverContainerBg,
    "--btn-hover-border": colors.hoverContainerBorder,
    "--btn-hover-text": colors.hoverText,
    "--btn-hover-arrow-bg": colors.hoverArrowBg,
    "--btn-hover-arrow-text": colors.hoverArrowText,
  } as React.CSSProperties

  const isCta = variant === "cta" || variant === undefined

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant }),
        isCta && "bg-[var(--btn-bg)] border-[var(--btn-border)] text-[var(--btn-text)] hover:bg-[var(--btn-hover-bg)] hover:border-[var(--btn-hover-border)] hover:text-[var(--btn-hover-text)]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={isCta ? colorStyles : undefined}
    >
      <span
        style={isCta ? {
          color: isHovered ? "var(--btn-hover-text)" : "var(--btn-text)",
          transition: "color 0.2s",
        } : undefined}
      >
        {children}
      </span>
      {showIcon && (
        <motion.span
          aria-hidden="true"
          className={`flex items-center justify-center w-9 h-9 rounded-full mb-[2px] overflow-hidden transition-all duration-200 ${isCta ? "bg-[var(--btn-arrow-bg)] group-hover:bg-[var(--btn-hover-arrow-bg)]" : "bg-brand-black group-hover:bg-brand-white"}`}
          animate={isHovered ? "hover" : "initial"}
          variants={containerVariants}
          style={isCta ? {
            color: isHovered ? colors.hoverArrowText : colors.arrowText,
            transition: "color 0.2s",
          } : undefined}
        >
          <motion.svg
            viewBox="0 0 24 24"
            className={`w-5 h-5 fill-current transition-colors duration-200 ${isCta ? "text-inherit" : "text-brand-white group-hover:text-brand-black"}`}
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
