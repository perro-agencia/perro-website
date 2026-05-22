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

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  )
}
