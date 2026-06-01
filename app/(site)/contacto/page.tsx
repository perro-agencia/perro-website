import { Nav } from "@/components/layout/Nav"
import { ContactForm } from "@/components/forms/ContactForm"
import { buildMetadata } from "@/lib/metadata"
import { ContactSection } from "@/components/sections/ContactSection"
import { FooterLogo } from "@/components/layout/FooterLogo"

export const metadata = buildMetadata({
  title: "Contacto",
  description: "Trabajemos juntos. Contanos sobre tu proyecto.",
  path: "/contacto",
})

export default function ContactoPage() {
  return (
    <>
      <Nav
        logoSrc="/brand/isologotipo-white.svg"
        logoHoverSrc="/brand/isologotipo-color.svg" />
      <section className="py-24 pt-40">
        <ContactSection />
      </section>
      <div className="bg-black w-full max-w-[1500px] mx-auto">
        <FooterLogo logoSrc="/miscelaneous/perro-logo-cut-white.svg" />
      </div>
    </>
  )
}
