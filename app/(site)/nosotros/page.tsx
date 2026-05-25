import { buildMetadata } from "@/lib/metadata"
import { NosotrosContent } from "@/components/sections/NosotrosContent"
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
    <div className="bg-brand-white min-h-screen">
      <NosotrosContent />
      <section className="py-32 px-6">
        <Banner
          title="Unite a la manada"
          buttonText="Contacto"
          buttonHref="/contacto"
        />
      </section>
    </div>
    </>
  )
}
