import type { Metadata } from "next"
import { PortfolioGrid } from "@/components/sections/PortfolioGrid"

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Casos de estudio de proyectos con clientes reales.",
}

export default function PortfolioPage() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-display-lg mb-8">Portfolio</h1>
        <p className="text-lg text-brand-white/70 max-w-2xl mb-16">
          Proyectos que nos enorgullecen.
        </p>
        <PortfolioGrid />
      </div>
    </section>
  )
}
