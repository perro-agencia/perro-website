import { buildMetadata } from "@/lib/metadata"
import { ServicesFullScreen } from "@/components/sections/ServicesFullScreen"
import { Banner } from "@/components/ui/Banner"
import { FooterLogo } from "@/components/layout/FooterLogo"

export const metadata = buildMetadata({
  title: "Servicios",
  description:
    "Branding, diseño UX/UI, desarrollo web, SEM & SEO, y más. Soluciones que potencian el crecimiento de tu negocio.",
  path: "/servicios",
})

export default function ServiciosPage() {
  return (
    <>
    <div className="bg-brand-white min-h-screen">
      <ServicesFullScreen />
      <section className="py-32 px-6">
        <Banner
          title="¿Queres resultados?"
          buttonText="Contactanos"
          buttonHref="/contacto"
        />
      </section>
      <div className="w-full max-w-[1500px] mx-auto">
        <FooterLogo logoSrc="/miscelaneous/perro-logo-cut-black.svg"/>
      </div>
    </div>
    </>
  )
}
