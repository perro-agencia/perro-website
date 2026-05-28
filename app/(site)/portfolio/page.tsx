import { Nav } from "@/components/layout/Nav"
import { buildMetadata } from "@/lib/metadata"
import { PortfolioHeader } from "@/components/sections/PortfolioHeader"
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
      <PortfolioHeader />
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <PortfolioGrid />
        </div>
      </section>
    </>
  )
}
