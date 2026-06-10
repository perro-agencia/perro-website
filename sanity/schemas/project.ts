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
    defineField({ name: "bgColor", title: "Background Color", type: "string", description: "Color de fondo sólido del proyecto (ej: #885de3)" }),
    defineField({ name: "order", title: "Order", type: "number", description: "Orden de aparición en la grilla" }),
    defineField({ name: "span", title: "Span", type: "number", initialValue: 1, options: { list: [1, 2, 3] }, description: "1 = 1 columna, 2 = 2 columnas, 3 = fila completa (highlight)" }),
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
    defineField({
      name: "contentSections",
      title: "Content Sections",
      type: "array",
      of: [
        {
          type: "object",
          name: "contentSection",
          title: "Content Section",
          fields: [
            { name: "heading", title: "Heading", type: "string" },
            { name: "text", title: "Text", type: "blockContent" },
            {
              name: "gallery",
              title: "Gallery",
              type: "array",
              of: [
                {
                  type: "image",
                  fields: [
                    { name: "span", type: "number", options: { list: [1, 2] } },
                    { name: "alt", type: "string" },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: { title: "heading" },
          },
        },
      ],
      description: "Secciones adicionales (heading + texto + galería) que aparecen después de la galería principal",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "logo" },
  },
})
