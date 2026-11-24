import { defineType, defineField } from "sanity"

export const newsletter = defineType({
  name: "newsletter",
  title: "Newsletter",
  type: "document",
  fields: [
    defineField({
      name: "subject",
      title: "Asunto",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "previewText",
      title: "Preview text",
      type: "string",
      description: "Texto corto que aparece al lado del asunto en la bandeja de entrada",
    }),
    defineField({ name: "heading", title: "Título", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "coverImage", title: "Imagen principal", type: "image" }),
    defineField({ name: "body", title: "Contenido", type: "blockContent" }),
    defineField({
      name: "cta",
      title: "Botón (CTA)",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Texto", type: "string" }),
        defineField({ name: "url", title: "URL", type: "url" }),
      ],
    }),
  ],
  preview: {
    select: { title: "subject", subtitle: "heading", media: "coverImage" },
  },
})
