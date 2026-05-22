import type { Metadata } from "next"
import { siteConfig } from "./site"

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
}: {
  title: string
  description?: string
  path?: string
  ogImage?: string
}): Metadata {
  const url = path ? `${siteConfig.url}${path}` : siteConfig.url
  const fullTitle = `${title} | ${siteConfig.name}`

  return {
    title,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage || siteConfig.ogImage],
    },
    alternates: {
      canonical: url,
    },
  }
}
