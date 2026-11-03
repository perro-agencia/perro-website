import { Nav } from "@/components/layout/Nav"
import { HeroBackdrop } from "@/components/sections/HeroBackdrop"
import { HeroSection } from "@/components/sections/HeroSection"
import { ClientsSection } from "@/components/sections/ClientsSection"
import { ServicesSectionV2 } from "@/components/sections/ServicesSectionV2"
import { StrategySection } from "@/components/sections/StrategySection"
import { ContactSection } from "@/components/sections/ContactSection"
import { FooterLogo } from "@/components/layout/FooterLogo"
import { buildMetadata } from "@/lib/metadata"

export const metadata = buildMetadata({
  title: "Agencia de marketing digital y diseño",
  description:
    "Agencia de marketing digital y diseño en Buenos Aires. Branding, sitios web, producto, social content, paid media y SEO para hacer crecer tu negocio.",
})

export default function HomePage() {
  return (
    <>
      <div className="overflow-x-hidden relative">
        <Nav
          logoSrc="/brand/isologotipo-white.svg"
          logoHoverSrc="/brand/isologotipo-color.svg" />

        <HeroBackdrop />
        <HeroSection />
        <ServicesSectionV2 />
        <ClientsSection />
        <StrategySection />
        <ContactSection />
        <div className="bg-black w-full max-w-[1500px] mx-auto">
          <FooterLogo logoSrc="/miscelaneous/perro-logo-cut-white.svg" />
        </div>
      </div>
    </>
  )
}
