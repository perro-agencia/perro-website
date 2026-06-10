import type { Metadata } from "next"
import Image from "next/image"
import { PortableText } from "@portabletext/react"
import { sanityFetch } from "@/sanity/lib/fetch"
import { projectBySlugQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { Nav } from "@/components/layout/Nav"
import { AnimateInView } from "@/components/AnimateInView"
import { Banner } from "@/components/ui/Banner"
import { GalleryGrid } from "@/components/portfolio/GalleryGrid"
import { ProjectContentSections } from "@/components/portfolio/ProjectContentSections"
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

  const img1 = project.headerImage1 ? urlFor(project.headerImage1).width(900).height(700).url() : null
  const img2 = project.headerImage2 ? urlFor(project.headerImage2).width(600).height(330).url() : null
  const img3 = project.headerImage3 ? urlFor(project.headerImage3).width(600).height(330).url() : null

  const metadata = [
    { label: "Year", value: project.year },
    { label: "Country", value: project.country },
    { label: "Industry", value: project.industry },
    { label: "Service", value: project.service },
  ].filter((m) => m.value)

  return (
    <>
      <Nav />
      <article>
        <div className="container mx-auto px-6 pt-32 pb-24">
          {img1 && (
            <AnimateInView delay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-20">
                <div className="md:col-span-2 md:row-span-2 relative aspect-[4/3] md:aspect-auto md:min-h-[700px] rounded-2xl overflow-hidden bg-brand-white/5">
                  <Image
                    src={img1}
                    alt={`${project.title} main image`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                </div>
                {img2 && (
                  <div className="relative aspect-[16/9] md:aspect-auto md:min-h-[330px] rounded-2xl overflow-hidden bg-brand-white/5">
                    <Image
                      src={img2}
                      alt={`${project.title} image 2`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                {img3 && (
                  <div className="relative aspect-[16/9] md:aspect-auto md:min-h-[330px] rounded-2xl overflow-hidden bg-brand-white/5">
                    <Image
                      src={img3}
                      alt={`${project.title} image 3`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
              </div>
            </AnimateInView>
          )}

          <AnimateInView>
            <header className="mb-12">
              <h1 className="text-display-xl mb-4">{project.title}</h1>
            </header>
          </AnimateInView>

          <AnimateInView delay={0.3}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 mb-20">
              <div className="lg:col-span-2">
                {project.description && (
                  <div className="prose prose-invert prose-lg max-w-none text-brand-white/80">
                    <PortableText value={project.description} />
                  </div>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-8 text-brand-accent-02 hover:underline"
                  >
                    Visitar sitio web →
                  </a>
                )}
              </div>

              {metadata.length > 0 && (
                <div className="space-y-6">
                  <dl className="space-y-4">
                    {metadata.map(({ label, value }) => (
                      <div key={label}>
                        <dt className="text-xs text-brand-white uppercase tracking-wider mb-1">{label}</dt>
                        <dd className="text-base text-brand-white/50">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </AnimateInView>

          {project.gallery && project.gallery.length > 0 && (
            <section>
              <GalleryGrid images={project.gallery} projectTitle={project.title} />
            </section>
          )}

          {project.contentSections && project.contentSections.length > 0 && (
            <ProjectContentSections sections={project.contentSections} projectTitle={project.title} />
          )}
        </div>
      </article>
    </>
  )
}
