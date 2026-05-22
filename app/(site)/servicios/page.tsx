import { buildMetadata } from "@/lib/metadata"
import { ServicesSection } from "@/components/sections/ServicesSection"

export const metadata = buildMetadata({
  title: "Servicios",
  description:
    "Branding, diseño UX/UI, desarrollo web, SEM & SEO, y más. Soluciones que potencian el crecimiento de tu negocio.",
  path: "/servicios",
})

export default function ServiciosPage() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-display-lg mb-8">Servicios</h1>
        <p className="text-lg text-brand-white/70 max-w-2xl mb-16">
          Todo lo que necesitás para llevar tu marca al próximo nivel.
        </p>
        <ServicesSection />
      </div>
    </section>
  )
}
