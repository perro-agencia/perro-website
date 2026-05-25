import { PortableText } from "@portabletext/react"
import { urlFor } from "@/sanity/lib/image"
import type { Project } from "@/types/sanity"
import Image from "next/image"

interface Props {
  project: Project
}

export function CaseStudyBody({ project }: Props) {
  return (
    <div className="prose prose-invert max-w-none">
      {project.summary && <p className="text-lg text-brand-white/70 mb-8">{project.summary}</p>}
      {project.body && <PortableText value={project.body} />}
      {project.images && project.images.length > 0 && (
        <div className="grid gap-4 mt-8">
          {project.images.map((image, i) => (
            <Image
              key={i}
              src={urlFor(image).width(1200).url()}
              alt={`${project.title} - Image ${i + 1}`}
              width={1200}
              height={800}
              className="rounded-lg"
            />
          ))}
        </div>
      )}
    </div>
  )
}
