import type { MetadataRoute } from "next"
import { sanityFetch } from "@/sanity/lib/fetch"
import { postsQuery, projectsQuery } from "@/sanity/lib/queries"
import type { Post, Project } from "@/types/sanity"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.perroagency.com"

  const posts = await sanityFetch<Post[]>({ query: postsQuery, tags: ["post"] })
  const projects = await sanityFetch<Project[]>({ query: projectsQuery, tags: ["project"] })

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/nosotros`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/servicios`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/brand-website`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/performance-ads`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/portfolio`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contacto`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/legal/politicas-de-privacidad`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/legal/terminos-y-condiciones`, changeFrequency: "yearly", priority: 0.2 },
  ]

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : undefined,
    changeFrequency: "yearly",
    priority: 0.5,
  }))

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug.current}`,
    lastModified: project._updatedAt ? new Date(project._updatedAt) : undefined,
    changeFrequency: "yearly",
    priority: 0.6,
  }))

  return [...staticPages, ...postPages, ...projectPages]
}
