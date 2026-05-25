import { defineType, defineField } from "sanity"

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "client", title: "Client", type: "string" }),
    defineField({ name: "services", title: "Services", type: "array", of: [{ type: "reference", to: [{ type: "service" }] }] }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "images", title: "Images", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({ name: "summary", title: "Summary", type: "text" }),
    defineField({ name: "body", title: "Body", type: "blockContent" }),
    defineField({ name: "year", title: "Year", type: "number" }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "coverImage" },
  },
})
