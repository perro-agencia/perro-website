import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { presentationTool } from "sanity/presentation"
import { schemaTypes } from "./sanity/schemas"
import { resolve } from "./sanity/lib/resolveHref"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ""
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool(),
    visionTool(),
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
