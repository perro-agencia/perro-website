import { sanityFetch } from "@/sanity/lib/fetch"
import { postsQuery } from "@/sanity/lib/queries"
import { BlogCard } from "@/components/blog/BlogCard"
import type { Post } from "@/types/sanity"

export async function BlogGrid() {
  const posts = await sanityFetch<Post[]>({
    query: postsQuery,
    tags: ["post"],
  })

  if (posts.length === 0) return null

  const getColSpan = (relevance: number = 1) => {
    if (relevance === 3) return "md:col-span-3"
    if (relevance === 2) return "md:col-span-2"
    return "md:col-span-1"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <div key={post._id} className={getColSpan(post.relevance)}>
          <BlogCard post={post} index={index} />
        </div>
      ))}
    </div>
  )
}
