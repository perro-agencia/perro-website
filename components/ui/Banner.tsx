import type { Route } from "next"
import { Button } from "@/components/ui/Button"
import { AnimateInView } from "@/components/AnimateInView"

type BannerProps = {
  title: string
  buttonText: string
  buttonHref: Route
}

export function Banner({ title, buttonText, buttonHref }: BannerProps) {
  return (
    <AnimateInView as="section" className="max-w-[1200px] mx-auto rounded-[32px] bg-brand-primary-main py-16 md:py-14 px-8 md:px-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-1 text-left">
        <h2 className="font-display font-light text-6xl text-brand-white">
          {title}
        </h2>
        <Button href={buttonHref} variant="cta">
          {buttonText}
        </Button>
      </div>
    </AnimateInView>
  )
}
