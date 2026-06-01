import { Nav } from "@/components/layout/Nav"
import { buildMetadata } from "@/lib/metadata"
import { BlogHeader } from "@/components/sections/BlogHeader"
import { BlogGrid } from "@/components/blog/BlogGrid"

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Contenido editorial sobre branding, diseño y marketing digital. Ideas, aprendizajes y perspectivas del equipo.",
  path: "/blog",
})

export default function BlogPage() {
  return (
    <>
      <Nav
        logoSrc="/brand/isologotipo-white.svg"
        logoHoverSrc="/brand/isologotipo-color.svg" />
      <BlogHeader />
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <BlogGrid />
        </div>
      </section>
    </>
  )
}
