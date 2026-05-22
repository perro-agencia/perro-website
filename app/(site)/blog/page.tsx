import { buildMetadata } from "@/lib/metadata"
import { sanityFetch } from "@/sanity/lib/fetch"
import { postsQuery } from "@/sanity/lib/queries"
import { PostCard } from "@/components/blog/PostCard"
import type { Post } from "@/types/sanity"

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Contenido editorial sobre branding, diseño y marketing digital. Ideas, aprendizajes y perspectivas del equipo.",
  path: "/blog",
})

export default async function BlogPage() {
  const posts = await sanityFetch<Post[]>({
    query: postsQuery,
    tags: ["post"],
  })

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-display-lg mb-8">Blog</h1>
        <p className="text-lg text-brand-white/70 max-w-2xl mb-16">
          Ideas, aprendizajes y perspectivas del equipo.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
