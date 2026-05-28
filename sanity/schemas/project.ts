import { defineType, defineField } from "sanity"

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "client", title: "Client", type: "string" }),
    defineField({ name: "logo", title: "Client Logo", type: "image", description: "Logo del cliente para mostrar en la card del portfolio" }),
    defineField({ name: "gradientFrom", title: "Gradient From", type: "string", description: "Color inicial del gradient (ej: #885de3)" }),
    defineField({ name: "gradientTo", title: "Gradient To", type: "string", description: "Color final del gradient (ej: #0a0a0a)" }),
    defineField({ name: "order", title: "Order", type: "number", description: "Orden de aparición en la grilla" }),
    defineField({ name: "hoverImage", title: "Hover Image", type: "image", description: "Imagen que aparece al hacer hover sobre la card" }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "logo" },
  },
})
