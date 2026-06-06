import { Nav } from "@/components/layout/Nav"
import { HeroSection } from "@/components/sections/HeroSection"
import { ClientsSection } from "@/components/sections/ClientsSection"
import { ServicesSectionV2 } from "@/components/sections/ServicesSectionV2"
import { StrategySection } from "@/components/sections/StrategySection"
import { ContactSection } from "@/components/sections/ContactSection"
import { FooterLogo } from "@/components/layout/FooterLogo"
import { buildMetadata } from "@/lib/metadata"

export const metadata = buildMetadata({
  title: "Inicio",
  description:
    "Soluciones que potencian el crecimiento de tu negocio. Diseño, Producto, Social Content, Paid Media & SEO.",
})

export default function HomePage() {
  return (
    <>
      <Nav
        logoSrc="/brand/isologotipo-white.svg"
        logoHoverSrc="/brand/isologotipo-color.svg" />
      <HeroSection />
      <ServicesSectionV2 />
      <ClientsSection />
      <StrategySection />
      <ContactSection />
      <div className="bg-black w-full max-w-[1500px] mx-auto">
        <FooterLogo logoSrc="/miscelaneous/perro-logo-cut-white.svg" />
      </div>
    </>
  )
}
