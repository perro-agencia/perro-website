import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import type { Project } from "@/types/sanity"

interface Props {
  project: Project
}

export function ProjectCard({ project }: Props) {
  return (
    <Link href={`/portfolio/${project.slug.current}`} className="group block">
      {project.coverImage && (
        <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
          <Image
            src={urlFor(project.coverImage).width(600).height(400).url()}
            alt={project.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <h3 className="text-xl font-display mb-1">{project.title}</h3>
      {project.client && <p className="text-sm text-brand-white/50">{project.client}</p>}
    </Link>
  )
}
