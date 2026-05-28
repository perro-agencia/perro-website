import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/fetch"
import { projectBySlugQuery } from "@/sanity/lib/queries"
import { Nav } from "@/components/layout/Nav"
import { siteConfig } from "@/lib/site"
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
    tags: ["project"],
  })

  if (!project) return {}

  const fullTitle = `${project.title} | ${siteConfig.name}`

  return {
    title: fullTitle,
    openGraph: {
      title: fullTitle,
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await sanityFetch<Project | null>({
    query: projectBySlugQuery,
    params: { slug },
    tags: ["project"],
  })

  if (!project) notFound()

  return (
    <>
      <Nav />
      <article className="py-24">
        <div className="container mx-auto px-6">
          <header className="mb-16">
            <h1 className="text-display-xl mb-4">{project.title}</h1>
            {project.client && <p className="text-xl text-brand-white/50">{project.client}</p>}
          </header>
        </div>
      </article>
    </>
  )
}
