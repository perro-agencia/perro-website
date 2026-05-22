import { createImageUrlBuilder } from "@sanity/image-url"
import { client } from "./client"

type SanityImageSource = Record<string, unknown>

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
