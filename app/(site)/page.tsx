import { Nav } from "@/components/layout/Nav"
import { HeroSection } from "@/components/sections/HeroSection"
import { ClientsSection } from "@/components/sections/ClientsSection"
import { ServicesSection } from "@/components/sections/ServicesSection"
import { StrategySection } from "@/components/sections/StrategySection"
import { ContactSection } from "@/components/sections/ContactSection"
import { FooterLogo } from "@/components/layout/FooterLogo"

export default function HomePage() {
  return (
    <>
      <Nav />
      <HeroSection />
      <ClientsSection />
      <ServicesSection />
      <StrategySection />
      <ContactSection />
      <div className="bg-black w-full max-w-[1500px] mx-auto">
        <FooterLogo logoSrc="/miscelaneous/perro-logo-cut-white.svg"/>
      </div>
    </>
  )
}
