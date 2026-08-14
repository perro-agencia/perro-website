import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/fetch"
import { postBySlugQuery } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { PostBody } from "@/components/blog/PostBody"
import { Nav } from "@/components/layout/Nav"
import { JsonLd } from "@/components/JsonLd"
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
  const url = `${siteConfig.url}/blog/${post.slug.current}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
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

  const url = `${siteConfig.url}/blog/${post.slug.current}`
  const ogImage = post.coverImage ? urlFor(post.coverImage).url() : siteConfig.ogImage

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.seoTitle || post.title,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author || "PERRO Agency",
    },
    publisher: {
      "@type": "Organization",
      name: "PERRO Agency",
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/brand/isologotipo-color.svg`,
      },
    },
    image: ogImage,
    mainEntityOfPage: url,
  }

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <Nav />
      <article className="py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <header className="mb-12">
          <h1 className="text-display-lg mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-x-3 text-sm text-brand-white/50">
            {post.author && <span className="font-medium text-brand-white/70">{post.author}</span>}
            {post.author && post.publishedAt && <span aria-hidden="true">·</span>}
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("es-AR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
          </div>
        </header>
        <PostBody post={post} />
      </div>
    </article>
    </>
  )
}
