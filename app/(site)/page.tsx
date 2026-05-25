import { HeroSection } from "@/components/sections/HeroSection"
import { ClientsSection } from "@/components/sections/ClientsSection"
import { ServicesSection } from "@/components/sections/ServicesSection"
import { StrategySection } from "@/components/sections/StrategySection"
import { ContactSection } from "@/components/sections/ContactSection"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ClientsSection />
      <ServicesSection />
      <StrategySection />
      <ContactSection />
    </>
  )
}
