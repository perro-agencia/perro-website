import { HeroSection } from "@/components/sections/HeroSection"
import { ServicesSection } from "@/components/sections/ServicesSection"
import { PortfolioGrid } from "@/components/sections/PortfolioGrid"
import { TeamSection } from "@/components/sections/TeamSection"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PortfolioGrid />
      <TeamSection />
    </>
  )
}
