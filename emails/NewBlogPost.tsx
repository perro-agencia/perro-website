import { Img, Section, Text } from "react-email"
import { PerroButton, PerroLayout, SITE_URL, colors, eyebrow, heading, text } from "./components/PerroLayout"

export interface NewBlogPostProps {
  title: string
  excerpt?: string
  url: string
  imageUrl?: string
  categories?: string[]
}

export default function NewBlogPost({ title, excerpt, url, imageUrl, categories = [] }: NewBlogPostProps) {
  return (
    <PerroLayout preview={excerpt || title} unsubscribe>
      {imageUrl && (
        <Section style={{ marginBottom: "32px" }}>
          <Img src={imageUrl} width="552" alt={title} style={{ width: "100%", height: "auto", borderRadius: "24px" }} />
        </Section>
      )}
      <Section>
        <Text style={eyebrow}>
          Nuevo en el blog{categories.length > 0 ? ` · ${categories.join(" · ")}` : ""}
        </Text>
        <Text style={heading}>{title}</Text>
        {excerpt && <Text style={{ ...text, color: colors.muted, margin: "0 0 32px" }}>{excerpt}</Text>}
        <PerroButton href={url}>Leer la nota</PerroButton>
      </Section>
    </PerroLayout>
  )
}

NewBlogPost.PreviewProps = {
  title: "Por qué tu marca necesita algo más que un logo",
  excerpt: "Branding no es solo identidad visual: es cómo se siente tu marca en cada punto de contacto.",
  url: `${SITE_URL}/blog`,
  imageUrl: `${SITE_URL}/og/og-website.png`,
  categories: ["Marketing 101"],
} satisfies NewBlogPostProps
