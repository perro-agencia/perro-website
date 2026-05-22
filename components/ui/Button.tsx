import Link from "next/link"
import type { Route } from "next"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type ButtonVariant = "cta" | "primary" | "outline"

type ButtonProps = {
  href: Route
  children: React.ReactNode
  variant?: ButtonVariant
  className?: string
  showIcon?: boolean
}

const variants: Record<ButtonVariant, string> = {
  cta: cn(
    "group inline-flex items-center gap-2 py-[6px] pl-3 pr-[6px]",
    "border-2 border-brand-white bg-brand-white rounded-full",
    "text-sm font-display uppercase tracking-wide leading-none text-[#111]",
    "hover:bg-[#111] hover:text-brand-white",
    "transition-all duration-200 ease-[cubic-bezier(.977,.953,.187,1.011)]"
  ),
  primary: cn(
    "inline-flex items-center gap-2 px-6 py-3",
    "bg-brand-primary-main text-brand-white rounded-lg font-medium",
    "hover:opacity-90 transition-opacity"
  ),
  outline: cn(
    "inline-flex items-center gap-2 px-6 py-3",
    "border border-brand-white/20 text-brand-white rounded-lg font-medium",
    "hover:bg-brand-white/10 transition-colors"
  ),
}

export function Button({ href, children, variant = "cta", className, showIcon = true }: ButtonProps) {
  return (
    <Link href={href} className={cn(variants[variant], className)}>
      <span>{children}</span>
      {showIcon && (
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#111] group-hover:bg-brand-white transition-colors">
          <ArrowRight className="w-4 h-4 text-brand-white group-hover:text-[#111] transition-colors" />
        </span>
      )}
    </Link>
  )
}
