import { PortableText } from "@portabletext/react"
import { AnimateInView } from "@/components/AnimateInView"
import { GalleryGrid } from "@/components/portfolio/GalleryGrid"
import type { ContentSection } from "@/types/sanity"

interface Props {
  sections: ContentSection[]
  projectTitle: string
}

export function ProjectContentSections({ sections, projectTitle }: Props) {
  return (
    <>
      {sections.map((section, i) => (
        <div key={i} className="space-y-12 mb-20">
          {section.heading && (
            <AnimateInView delay={0.15 + i * 0.1}>
              <h2 className="text-display-lg">{section.heading}</h2>
            </AnimateInView>
          )}

          {section.text && (
            <AnimateInView delay={0.25 + i * 0.1}>
              <div className="prose prose-invert prose-lg max-w-none text-brand-white/80">
                <PortableText value={section.text} />
              </div>
            </AnimateInView>
          )}

          {section.gallery && section.gallery.length > 0 && (
            <AnimateInView delay={0.35 + i * 0.1}>
              <GalleryGrid images={section.gallery} projectTitle={projectTitle} />
            </AnimateInView>
          )}
        </div>
      ))}
    </>
  )
}
