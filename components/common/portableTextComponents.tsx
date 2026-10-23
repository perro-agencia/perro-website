import Image from "next/image"
import type { PortableTextComponents } from "@portabletext/react"
import { urlFor } from "@/sanity/lib/image"

// Las refs de Sanity traen el tamaño original: image-<id>-<width>x<height>-<ext>
function getImageDimensions(ref: string) {
  const [, , size] = ref.split("-")
  const [width, height] = (size ?? "").split("x").map(Number)
  return width && height ? { width, height } : { width: 1200, height: 800 }
}

// Renderers para los bloques no-texto de blockContent (imágenes y code blocks)
export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const ref: string | undefined = value?.asset?._ref
      if (!ref) return null

      const { width, height } = getImageDimensions(ref)

      return (
        <figure className="my-10">
          <Image
            src={urlFor(value).width(1600).fit("max").auto("format").url()}
            alt={value.alt || ""}
            width={width}
            height={height}
            sizes="(max-width: 768px) 100vw, 800px"
            className="w-full h-auto rounded-2xl"
          />
        </figure>
      )
    },
    codeBlock: ({ value }) => {
      if (!value?.code?.code) return null

      return (
        <pre>
          <code>{value.code.code}</code>
        </pre>
      )
    },
  },
}
