import { defineQuery } from "next-sanity"

export const projectsQuery = defineQuery(`*[_type == "project"] | order(order asc, title asc) {
  _id,
  title,
  slug,
  client,
  logo,
  bgColor,
  order,
  span,
  hoverImage
}`)

export const projectBySlugQuery = defineQuery(`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  client,
  logo,
  bgColor,
  order,
  span,
  hoverImage,
  headerImage1,
  headerImage2,
  headerImage3,
  description,
  year,
  country,
  industry,
  service,
  link,
  gallery[] {
    ...,
    "alt": asset->alt_text
  },
  contentSections[] {
    heading,
    text,
    gallery[] {
      ...,
      "alt": asset->alt_text
    }
  }
}`)

export const postsQuery = defineQuery(`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  author,
  publishedAt,
  coverImage,
  excerpt,
  tags,
  relevance
}`)

export const postBySlugQuery = defineQuery(`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  author,
  publishedAt,
  coverImage,
  excerpt,
  body,
  tags,
  seoTitle,
  seoDescription
}`)
