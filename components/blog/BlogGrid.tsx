import { sanityFetch } from "@/sanity/lib/fetch"
import { categoriesQuery, postsQuery } from "@/sanity/lib/queries"
import { BlogFilteredGrid } from "@/components/blog/BlogFilteredGrid"
import type { Category, Post } from "@/types/sanity"

export async function BlogGrid() {
  const [posts, categories] = await Promise.all([
    sanityFetch<Post[]>({ query: postsQuery, tags: ["post"] }),
    sanityFetch<Category[]>({ query: categoriesQuery, tags: ["category"] }),
  ])

  if (posts.length === 0) return null

  return <BlogFilteredGrid posts={posts} categories={categories} />
}
