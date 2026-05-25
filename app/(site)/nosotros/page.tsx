import { buildMetadata } from "@/lib/metadata"
import { NosotrosContent } from "@/components/NosotrosContent"
import { Banner } from "@/components/ui/Banner"

export const metadata = buildMetadata({
  title: "Nosotros",
  description:
    "Conocé el equipo detrás de PERRO. Somos un equipo multidisciplinario apasionado por crear experiencias digitales que dejan huella.",
  path: "/nosotros",
})

export default function NosotrosPage() {
  return (
    <>
      <NosotrosContent />
      <section className="py-32 px-6">
        <Banner
          title="¿Empezamos con tu proyecto?"
          buttonText="Contacto"
          buttonHref="/contacto"
        />
      </section>
    </>
  )
}
