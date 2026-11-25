import { createElement } from "react"
import { NextResponse } from "next/server"
import { toPlainText, type PortableTextBlock } from "@portabletext/react"
import { writeClient } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { createBroadcastDraft } from "@/lib/email"
import { siteConfig } from "@/lib/site"
import NewBlogPost from "@/emails/NewBlogPost"
import NewCaseStudy from "@/emails/NewCaseStudy"
import Newsletter from "@/emails/Newsletter"

type DocType = "post" | "project" | "newsletter"
type SanityImage = Record<string, unknown> | undefined

const queries: Record<DocType, string> = {
  post: `*[_type == "post" && _id == $id][0]{ title, slug, excerpt, coverImage, "categories": categories[]->title }`,
  project: `*[_type == "project" && _id == $id][0]{ title, slug, description, hoverImage, industry, service, year }`,
  newsletter: `*[_type == "newsletter" && _id == $id][0]{
    subject, previewText, heading, coverImage, cta,
    body[]{ ..., _type == "image" => { ..., "url": asset->url } }
  }`,
}

const imageUrl = (image: SanityImage) => (image ? urlFor(image).width(1200).auto("format").url() : undefined)

const rateLimit = new Map<string, number>()
const RATE_LIMIT_WINDOW = 10_000

// Solo arma borradores en Resend (nunca envía): el envío real se hace a mano desde el panel de Resend
export async function POST(req: Request) {
  const origin = req.headers.get("origin")
  if (origin && origin !== new URL(req.url).origin) {
    return NextResponse.json({ error: "Origen no permitido" }, { status: 403 })
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  const last = rateLimit.get(ip)
  if (last && Date.now() - last < RATE_LIMIT_WINDOW) {
    return NextResponse.json({ error: "Esperá unos segundos antes de volver a intentar" }, { status: 429 })
  }
  rateLimit.set(ip, Date.now())

  try {
    const { type, id } = (await req.json()) as { type?: string; id?: string }
    if (!type || !id || !(type in queries)) {
      return NextResponse.json({ error: "Documento inválido" }, { status: 400 })
    }

    const docType = type as DocType
    const doc = await writeClient.fetch(queries[docType], { id: id.replace(/^drafts\./, "") }, { perspective: "published" })
    if (!doc) {
      return NextResponse.json({ error: "El documento no está publicado" }, { status: 404 })
    }

    let draft: Parameters<typeof createBroadcastDraft>[0]

    if (docType === "post") {
      draft = {
        name: `Blog: ${doc.title}`,
        subject: doc.title,
        previewText: doc.excerpt,
        element: createElement(NewBlogPost, {
          title: doc.title,
          excerpt: doc.excerpt,
          url: `${siteConfig.url}/blog/${doc.slug.current}`,
          imageUrl: imageUrl(doc.coverImage),
          categories: doc.categories?.filter(Boolean),
        }),
      }
    } else if (docType === "project") {
      const summary = doc.description ? toPlainText(doc.description as PortableTextBlock[]).slice(0, 220).trim() : undefined
      const details = [
        { label: "Industria", value: doc.industry },
        { label: "Servicio", value: doc.service },
        { label: "Año", value: doc.year },
      ].filter((d): d is { label: string; value: string } => Boolean(d.value))

      draft = {
        name: `Case study: ${doc.title}`,
        subject: `Nuevo case study: ${doc.title}`,
        previewText: summary,
        element: createElement(NewCaseStudy, {
          title: doc.title,
          summary,
          url: `${siteConfig.url}/portfolio/${doc.slug.current}`,
          imageUrl: imageUrl(doc.hoverImage),
          details,
        }),
      }
    } else {
      draft = {
        name: `Newsletter: ${doc.subject}`,
        subject: doc.subject,
        previewText: doc.previewText,
        element: createElement(Newsletter, {
          heading: doc.heading,
          previewText: doc.previewText,
          imageUrl: imageUrl(doc.coverImage),
          body: doc.body,
          cta: doc.cta,
        }),
      }
    }

    const { data, error } = await createBroadcastDraft(draft)
    if (error || !data) {
      console.error("No se pudo crear el broadcast", error)
      return NextResponse.json({ error: error?.message || "Resend rechazó el borrador" }, { status: 502 })
    }

    return NextResponse.json({ id: data.id, url: `https://resend.com/broadcasts/${data.id}` })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error interno"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
