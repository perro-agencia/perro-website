import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/fetch"
import { projectBySlugQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { CaseStudyBody } from "@/components/portfolio/CaseStudyBody"
import type { Project } from "@/types/sanity"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await sanityFetch<Project | null>({
    query: projectBySlugQuery,
    params: { slug },
  })

  if (!project) return {}

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      images: project.coverImage ? [{ url: urlFor(project.coverImage).url() }] : undefined,
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await sanityFetch<Project | null>({
    query: projectBySlugQuery,
    params: { slug },
  })

  if (!project) notFound()

  return (
    <article className="py-24">
      <div className="container mx-auto px-4">
        <header className="mb-16">
          <h1 className="text-display-xl mb-4">{project.title}</h1>
          {project.client && <p className="text-xl text-brand-white/50">{project.client}</p>}
          {project.year && <p className="text-sm text-brand-white/30 mt-2">{project.year}</p>}
        </header>
        <CaseStudyBody project={project} />
      </div>
    </article>
  )
}
