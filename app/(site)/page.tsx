import { HeroSection } from "@/components/sections/HeroSection"
import { ClientsSection } from "@/components/sections/ClientsSection"
import { ServicesSection } from "@/components/sections/ServicesSection"
import { PortfolioGrid } from "@/components/sections/PortfolioGrid"
import { TeamSection } from "@/components/sections/TeamSection"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ClientsSection />
      <ServicesSection />
      <PortfolioGrid />
      <TeamSection />
    </>
  )
}
