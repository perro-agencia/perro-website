import { cn } from "@/lib/utils"

type ChipVariant = "primary" | "outline"

type ChipProps = {
  children: React.ReactNode
  variant?: ChipVariant
  className?: string
}

const variants: Record<ChipVariant, string> = {
  primary:
    "bg-brand-primary-main text-black border-brand-primary-main py-1 px-8 md:py-3 md:px-24",
  outline:
    "border-brand-white text-brand-white py-3 px-8",
}

export function Chip({ children, variant = "primary", className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-block px-4 py-1.5 text-[13px] md:text-md uppercase rounded-full border font-light",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
