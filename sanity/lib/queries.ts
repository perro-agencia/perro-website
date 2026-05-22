import { defineQuery } from "next-sanity"

export const projectsQuery = defineQuery(`*[_type == "project"] | order(year desc) {
  _id,
  title,
  slug,
  client,
  services,
  coverImage,
  summary,
  year,
  featured,
  tags
}`)

export const projectBySlugQuery = defineQuery(`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  client,
  services[]->,
  coverImage,
  images[],
  summary,
  body,
  year,
  featured,
  tags
}`)

export const postsQuery = defineQuery(`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  author->,
  publishedAt,
  coverImage,
  excerpt,
  tags
}`)

export const postBySlugQuery = defineQuery(`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  author->,
  publishedAt,
  coverImage,
  excerpt,
  body,
  tags,
  seoTitle,
  seoDescription
}`)

export const teamMembersQuery = defineQuery(`*[_type == "teamMember"] | order(order asc) {
  _id,
  name,
  role,
  photo,
  bio
}`)

export const servicesQuery = defineQuery(`*[_type == "service"] | order(order asc) {
  _id,
  title,
  description,
  icon
}`)

export const settingsQuery = defineQuery(`*[_type == "settings"][0] {
  ...
}`)
