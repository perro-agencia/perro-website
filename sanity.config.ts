import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { presentationTool } from "sanity/presentation"
import { codeInput } from "@sanity/code-input"
import { schemaTypes } from "./sanity/schemas"
import { resolve } from "./sanity/lib/resolveHref"
import { EMAIL_DOC_TYPES, PrepareEmailAction } from "./sanity/actions/prepareEmailAction"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ""
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  document: {
    actions: (prev, context) =>
      EMAIL_DOC_TYPES.includes(context.schemaType) ? [...prev, PrepareEmailAction] : prev,
  },
  plugins: [
    structureTool(),
    codeInput(),
    ...(process.env.NODE_ENV === "development" ? [visionTool()] : []),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: "/api/draft",
        },
      },
      resolve,
    }),
  ],
})
