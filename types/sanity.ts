import type { PortableTextBlock } from "@portabletext/react"

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  client?: string
  services?: Service[]
  coverImage?: Record<string, unknown>
  images?: Record<string, unknown>[]
  summary?: string
  body?: PortableTextBlock[]
  year?: number
  featured?: boolean
  tags?: string[]
}

export interface Post {
  _id: string
  title: string
  slug: { current: string }
  author?: TeamMember
  publishedAt?: string
  coverImage?: Record<string, unknown>
  excerpt?: string
  body?: PortableTextBlock[]
  tags?: string[]
  seoTitle?: string
  seoDescription?: string
}

export interface TeamMember {
  _id: string
  name: string
  role?: string
  photo?: Record<string, unknown>
  bio?: string
  order?: number
}

export interface Service {
  _id: string
  title: string
  description?: string
  icon?: string
  order?: number
}
