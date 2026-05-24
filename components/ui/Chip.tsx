import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const chipVariants = cva(
  "inline-block text-[13px] md:text-md uppercase rounded-full border font-light",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-primary-main text-black border-brand-primary-main py-1 px-8 md:py-3 md:px-24",
        outline:
          "border-brand-white text-brand-white py-3 px-8",
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
    <span className={cn(chipVariants({ variant }), className)}>
      {children}
    </span>
  )
}
