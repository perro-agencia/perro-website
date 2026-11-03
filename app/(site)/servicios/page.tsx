import { Nav } from "@/components/layout/Nav"
import { JsonLd } from "@/components/JsonLd"
import { buildMetadata } from "@/lib/metadata"
import { ServicesFullScreen } from "@/components/sections/ServicesFullScreen"
import { Banner } from "@/components/ui/Banner"
import { FooterLogo } from "@/components/layout/FooterLogo"

export const metadata = buildMetadata({
  title: "Servicios de marketing, diseño y desarrollo",
  description:
    "Paid media, diseño, social content, SEO y desarrollo de producto: conocé cómo ayudamos a las marcas a crecer con estrategia y resultados medibles.",
  path: "/servicios",
})

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: ["Paid Media", "Diseño", "Social Content", "SEO IA", "Producto"],
  provider: {
    "@type": "Organization",
    name: "PERRO Agency",
    url: "https://www.perroagency.com/",
  },
  areaServed: "AR",
  url: "https://www.perroagency.com/servicios",
}

export default function ServiciosPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <Nav
        logoSrc="/brand/isologotipo-black.svg"
        logoHoverSrc="/brand/isologotipo-white.svg"
        linkColor="text-brand-black"
        linkHoverColor="#c4f875"
        buttonColorScheme="default"
      />
      <div className="bg-brand-white min-h-screen">
        <h1 className="sr-only">Soluciones que hacen crecer tu negocio</h1>
        <ServicesFullScreen />
        <section className="py-32 px-6">
          <Banner
            title="¿Querés resultados?"
            buttonText="Contactanos"
            buttonHref="/contacto"
          />
        </section>
        <div className="w-full max-w-[1500px] mx-auto">
          <FooterLogo logoSrc="/miscelaneous/perro-logo-cut-black.svg" />
        </div>
      </div>
    </>
  )
}
