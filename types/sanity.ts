import type { PortableTextBlock } from "@portabletext/react"

export interface GalleryImage {
  asset?: Record<string, unknown>
  span?: number
  alt?: string
}

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  client?: string
  logo?: Record<string, unknown>
  gradientFrom?: string
  gradientTo?: string
  hoverImage?: Record<string, unknown>
  headerImage1?: Record<string, unknown>
  headerImage2?: Record<string, unknown>
  headerImage3?: Record<string, unknown>
  description?: PortableTextBlock[]
  year?: string
  country?: string
  industry?: string
  service?: string
  link?: string
  gallery?: GalleryImage[]
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
  relevance?: number
  seoTitle?: string
  seoDescription?: string
}
