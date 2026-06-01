import { sanityFetch } from "@/sanity/lib/fetch"
import { projectsQuery } from "@/sanity/lib/queries"
import { ProjectCard } from "@/components/portfolio/ProjectCard"
import type { Project } from "@/types/sanity"

export async function PortfolioGrid() {
  const projects = await sanityFetch<Project[]>({
    query: projectsQuery,
    tags: ["project"],
  })

  if (projects.length === 0) return null

  const getGridClasses = (index: number) => {
    // Mobile: 1 columna
    const mobileClasses = "w-full flex-none"

    // Tablet (md): 2 columnas, alterna entre grande (~54% con flex-grow) y chica (~38% con flex-grow)
    const isBigTablet = index % 4 === 0 || index % 4 === 3
    const tabletClasses = isBigTablet
      ? "md:w-[calc(54%-1rem)] md:grow-[1.4] md:hover:grow-[3]"
      : "md:w-[calc(38%-1rem)] md:grow-[0.8] md:hover:grow-[2.0]"

    // Desktop (lg): 3 columnas, alterna entre 1 grande (~46% con flex-grow) y 2 chicas (~21% con flex-grow)
    const rowIndex = Math.floor(index / 3)
    const posInRow = index % 3
    const isBigDesktop = posInRow === rowIndex % 3
    const desktopClasses = isBigDesktop
      ? "lg:w-[calc(46%-1.5rem)] lg:grow-[1.5] lg:hover:grow-[4]"
      : "lg:w-[calc(21%-1.5rem)] lg:grow-[0.7] lg:hover:grow-[2.5]"

    return `${mobileClasses} ${tabletClasses} ${desktopClasses}`
  }

  return (
    <div className="flex flex-wrap gap-6 md:gap-8 justify-center">
      {projects.map((project, index) => (
        <ProjectCard
          key={project._id}
          project={project}
          className={getGridClasses(index)}
          index={index}
        />
      ))}
    </div>
  )
}
