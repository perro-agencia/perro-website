import Link from "next/link"
import type { Route } from "next"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva("inline-flex items-center gap-2 transition-all duration-200", {
  variants: {
    variant: {
      cta: cn(
        "group py-2.5 pl-6 pr-4",
        "border-2 border-brand-white bg-brand-white rounded-full",
        "text-md font-display uppercase tracking-wide leading-none text-brand-black",
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

export function Button({ href, children, variant, className, showIcon = true }: ButtonProps) {
  return (
    <Link href={href} className={cn(buttonVariants({ variant }), className)}>
      <span>{children}</span>
      {showIcon && (
        <span aria-hidden="true" className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-black group-hover:bg-brand-white transition-colors mb-[2px]">
          <ArrowRight className="w-4 h-4 text-brand-white group-hover:text-brand-black transition-colors" />
        </span>
      )}
    </Link>
  )
}
