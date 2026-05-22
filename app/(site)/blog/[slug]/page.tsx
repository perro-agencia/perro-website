import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/fetch"
import { postBySlugQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { PostBody } from "@/components/blog/PostBody"
import { siteConfig } from "@/lib/site"
import type { Post } from "@/types/sanity"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await sanityFetch<Post | null>({ query: postBySlugQuery, params: { slug } })

  if (!post) return {}

  const title = post.seoTitle || post.title
  const description = post.seoDescription || post.excerpt
  const ogImage = post.coverImage ? urlFor(post.coverImage).url() : siteConfig.ogImage
  const fullTitle = `${title} | ${siteConfig.name}`

  return {
    title,
    description,
    openGraph: {
      title: fullTitle,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await sanityFetch<Post | null>({ query: postBySlugQuery, params: { slug } })

  if (!post) notFound()

  return (
    <article className="py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <header className="mb-12">
          <h1 className="text-display-lg mb-4">{post.title}</h1>
          {post.publishedAt && (
            <time className="text-sm text-brand-white/50">
              {new Date(post.publishedAt).toLocaleDateString("es-AR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
        </header>
        <PostBody post={post} />
      </div>
    </article>
  )
}
