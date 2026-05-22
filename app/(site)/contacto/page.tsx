import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contacto",
  description: "Trabajemos juntos. Contanos sobre tu proyecto.",
}

export default function ContactoPage() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-display-lg mb-8">Contacto</h1>
        <p className="text-lg text-brand-white/70 mb-12">
          Tienes un proyecto en mente? Contanos.
        </p>
      </div>
    </section>
  )
}
