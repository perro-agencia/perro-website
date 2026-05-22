import type { Metadata } from "next"
import { TeamSection } from "@/components/sections/TeamSection"

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conocé el equipo detrás de PERRO.",
}

export default function NosotrosPage() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-display-lg mb-8">Nosotros</h1>
        <p className="text-lg text-brand-white/70 max-w-2xl mb-16">
          Somos un equipo multidisciplinario apasionado por crear experiencias digitales que dejan huella.
        </p>
        <TeamSection />
      </div>
    </section>
  )
}
