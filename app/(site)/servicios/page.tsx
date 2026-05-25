import { Nav } from "@/components/layout/Nav"
import { buildMetadata } from "@/lib/metadata"
import { ServicesFullScreen } from "@/components/sections/ServicesFullScreen"
import { Banner } from "@/components/ui/Banner"
import { FooterLogo } from "@/components/layout/FooterLogo"

export const metadata = buildMetadata({
  title: "Servicios",
  description:
    "Soluciones que potencian el crecimiento de tu negocio. Diseño, Producto, Social Content, Paid Media & SEO.",
  path: "/servicios",
})

export default function ServiciosPage() {
  return (
    <>
      <Nav 
        logoSrc="/brand/isologotipo-black.svg"
        logoHoverSrc="/brand/isologotipo-color.svg"
        linkColor="text-brand-black"
        linkHoverColor="#885de3"
        buttonColorScheme="accent"
      />
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
