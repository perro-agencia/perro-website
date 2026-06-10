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

  const getColSpan = (span: number = 1) => {
    if (span === 3) return "md:col-span-3"
    if (span === 2) return "md:col-span-2"
    return "md:col-span-1"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {projects.map((project, index) => (
        <div key={project._id} className={getColSpan(project.span)}>
          <ProjectCard project={project} index={index} />
        </div>
      ))}
    </div>
  )
}
