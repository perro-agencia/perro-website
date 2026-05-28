import type { PortableTextBlock } from "@portabletext/react"

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  client?: string
  logo?: Record<string, unknown>
  gradientFrom?: string
  gradientTo?: string
  hoverImage?: Record<string, unknown>
}

export interface Post {
  _id: string
  title: string
  slug: { current: string }
  author?: string
  publishedAt?: string
  coverImage?: Record<string, unknown>
  excerpt?: string
  body?: PortableTextBlock[]
  tags?: string[]
  seoTitle?: string
  seoDescription?: string
}
