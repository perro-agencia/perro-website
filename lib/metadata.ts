import type { Metadata } from "next"
import { siteConfig } from "./site"

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  ogImageAlt,
}: {
  title: string
  description?: string
  path?: string
  ogImage?: string
  ogImageAlt?: string
}): Metadata {
  const url = path ? `${siteConfig.url}${path}` : siteConfig.url
  const fullTitle = `${title} | ${siteConfig.name}`

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "es_AR",
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt || siteConfig.ogImageAlt,
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

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  }
}
