import type { Route } from "next"
import { Button } from "@/components/ui/Button"
import { AnimateInView } from "@/components/AnimateInView"

type BannerVariant = "dark" | "white"

type BannerProps = {
  title: string
  buttonText: string
  buttonHref: Route
  variant?: BannerVariant
}

const variantStyles: Record<BannerVariant, { bg: string; text: string; buttonScheme: "default" | "dark" }> = {
  dark: { bg: "bg-brand-black", text: "text-brand-white", buttonScheme: "default" },
  white: { bg: "bg-brand-white", text: "text-brand-black", buttonScheme: "dark" },
}

export function Banner({ title, buttonText, buttonHref, variant = "dark" }: BannerProps) {
  const styles = variantStyles[variant]

  return (
    <AnimateInView as="section" className={`max-w-[1200px] mx-auto rounded-[32px] ${styles.bg} py-16 md:py-14 px-8 md:px-16`}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-1 text-left">
        <h2 className={`font-display font-light text-6xl ${styles.text}`}>
          {title}
        </h2>
        <Button href={buttonHref} variant="cta" colorScheme={styles.buttonScheme}>
          {buttonText}
        </Button>
      </div>
    </AnimateInView>
  )
}
