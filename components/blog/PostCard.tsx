import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import type { Post } from "@/types/sanity"

interface Props {
  post: Post
}

export function PostCard({ post }: Props) {
  return (
    <Link href={`/blog/${post.slug.current}`} className="group block">
      {post.coverImage && (
        <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
          <Image
            src={urlFor(post.coverImage).width(600).height(400).url()}
            alt={post.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <h3 className="text-xl font-display mb-2">{post.title}</h3>
      {post.excerpt && <p className="text-sm text-brand-white/60 line-clamp-2">{post.excerpt}</p>}
      {post.publishedAt && (
        <time className="text-xs text-brand-white/40 mt-2 block">
          {new Date(post.publishedAt).toLocaleDateString("es-AR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      )}
    </Link>
  )
}
