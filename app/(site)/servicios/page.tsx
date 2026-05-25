import { buildMetadata } from "@/lib/metadata"
import { ServicesFullScreen } from "@/components/sections/ServicesFullScreen"

export const metadata = buildMetadata({
  title: "Servicios",
  description:
    "Branding, diseño UX/UI, desarrollo web, SEM & SEO, y más. Soluciones que potencian el crecimiento de tu negocio.",
  path: "/servicios",
})

export default function ServiciosPage() {
  return <ServicesFullScreen />
}
