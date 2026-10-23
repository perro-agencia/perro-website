import { PortableText } from "@portabletext/react"
import { portableTextComponents } from "@/components/common/portableTextComponents"
import type { Post } from "@/types/sanity"

interface Props {
  post: Post
}

export function PostBody({ post }: Props) {
  return (
    <div className="prose prose-invert max-w-none">
      {post.body && <PortableText value={post.body} components={portableTextComponents} />}
    </div>
  )
}
