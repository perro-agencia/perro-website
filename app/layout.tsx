import type { Metadata } from "next"
import { fontBody, fontDisplay } from "@/lib/fonts"
import { siteConfig } from "@/lib/site"
import { JsonLd } from "@/components/JsonLd"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  icons: siteConfig.icons,
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PERRO Agency",
  url: `${siteConfig.url}/`,
  logo: `${siteConfig.url}/brand/isologotipo-color.svg`,
  description:
    "Agencia de marketing digital y diseño especializada en branding, sitios web y performance marketing (Google Ads, Meta, TikTok, LinkedIn).",
  email: "queonda@perroagency.com",
  sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <body>
        <JsonLd data={organizationJsonLd} />
        {children}
      </body>
    </html>
  )
}
