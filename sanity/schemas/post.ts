import { defineType, defineField } from "sanity"

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "author", title: "Author", type: "string" }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text" }),
    defineField({ name: "body", title: "Body", type: "blockContent" }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "relevance",
      title: "Relevance",
      type: "number",
      description: "Determina el tamaño de la card en la grilla: 1 = chica, 2 = mediana, 3 = grande (ancho completo)",
      initialValue: 1,
      options: {
        list: [
          { title: "1 columna", value: 1 },
          { title: "2 columnas", value: 2 },
          { title: "3 columnas (destacado)", value: 3 },
        ],
      },
    }),
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text" }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "coverImage" },
  },
})
