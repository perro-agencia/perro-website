import type { Metadata } from "next"

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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://perro.agency"
  const siteName = "PERRO"

  return {
    title: `${title} | ${siteName}`,
    description,
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: path ? `${baseUrl}${path}` : baseUrl,
      siteName,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  }
}
