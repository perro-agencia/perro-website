import { ContactForm } from "@/components/forms/ContactForm"
import { buildMetadata } from "@/lib/metadata"
import { ContactSection } from "@/components/sections/ContactSection"

export const metadata = buildMetadata({
  title: "Contacto",
  description: "Trabajemos juntos. Contanos sobre tu proyecto.",
  path: "/contacto",
})

export default function ContactoPage() {
  return (
    <section className="py-24 pt-40">
      <ContactSection />
    </section>
  )
}
