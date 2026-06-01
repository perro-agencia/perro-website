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
    defineField({ name: "headerImage1", title: "Header Image — Main", type: "image", description: "Imagen principal del header (ocupa más espacio, a la izquierda)" }),
    defineField({ name: "headerImage2", title: "Header Image — 2", type: "image", description: "Segunda imagen del header (columna derecha, arriba)" }),
    defineField({ name: "headerImage3", title: "Header Image — 3", type: "image", description: "Tercera imagen del header (columna derecha, abajo)" }),
    defineField({ name: "description", title: "Description", type: "blockContent", description: "Descripción del proyecto (rich text)" }),
    defineField({ name: "year", title: "Year", type: "string", description: "Año del proyecto (ej: 2025)" }),
    defineField({ name: "country", title: "Country", type: "string", description: "País" }),
    defineField({ name: "industry", title: "Industry", type: "string", description: "Industria" }),
    defineField({ name: "service", title: "Service", type: "string", description: "Servicio" }),
    defineField({ name: "link", title: "Link", type: "url", description: "URL del proyecto" }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          fields: [
            { name: "span", title: "Span", type: "number", options: { list: [1, 2] }, description: "Cuántas columnas ocupa (1-2)" },
            { name: "alt", title: "Alt text", type: "string" },
          ],
        },
      ],
      description: "Imágenes adicionales para la grilla del detalle",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "logo" },
  },
})
