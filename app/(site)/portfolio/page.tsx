import { Nav } from "@/components/layout/Nav"
import { buildMetadata } from "@/lib/metadata"
import { PortfolioGrid } from "@/components/sections/PortfolioGrid"

export const metadata = buildMetadata({
  title: "Portfolio",
  description:
    "Casos de estudio de proyectos con clientes reales. Proyectos que nos enorgullecen.",
  path: "/portfolio",
})

export default function PortfolioPage() {
  return (
    <>
      <Nav />
      <section className="py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-display-lg mb-8">Portfolio</h1>
        <p className="text-lg text-brand-white/70 max-w-2xl mb-16">
          Proyectos que nos enorgullecen.
        </p>
        <PortfolioGrid />
      </div>
    </section>
    </>
  )
}
