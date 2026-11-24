import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react"
import { Heading, Img, Link, Section, Text } from "react-email"
import { PerroButton, PerroLayout, colors, heading, text } from "./components/PerroLayout"

export interface NewsletterProps {
  heading: string
  previewText?: string
  imageUrl?: string
  body?: PortableTextBlock[]
  cta?: { label?: string; url?: string }
}

const h2 = { ...heading, fontSize: "24px", lineHeight: "30px", margin: "32px 0 12px" }
const h3 = { ...heading, fontSize: "20px", lineHeight: "26px", margin: "24px 0 8px" }

// Las imágenes llegan con la URL ya resuelta desde la query (ver app/api/email/broadcast)
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <Text style={text}>{children}</Text>,
    h2: ({ children }) => <Heading as="h2" style={h2}>{children}</Heading>,
    h3: ({ children }) => <Heading as="h3" style={h3}>{children}</Heading>,
    h4: ({ children }) => <Heading as="h4" style={h3}>{children}</Heading>,
    blockquote: ({ children }) => (
      <Text style={{ ...text, borderLeft: `3px solid ${colors.primary}`, paddingLeft: "16px", fontStyle: "italic" }}>
        {children}
      </Text>
    ),
  },
  list: {
    bullet: ({ children }) => <ul style={{ ...text, paddingLeft: "20px" }}>{children}</ul>,
    number: ({ children }) => <ol style={{ ...text, paddingLeft: "20px" }}>{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => (
      <Link href={value?.href} style={{ color: colors.accent02, textDecoration: "underline" }}>
        {children}
      </Link>
    ),
  },
  types: {
    image: ({ value }) =>
      value?.url ? (
        <Img src={value.url} alt={value.alt || ""} width="552" style={{ width: "100%", height: "auto", borderRadius: "16px", margin: "8px 0 24px" }} />
      ) : null,
  },
}

export default function Newsletter({ heading: title, previewText, imageUrl, body, cta }: NewsletterProps) {
  return (
    <PerroLayout preview={previewText || title} unsubscribe>
      {imageUrl && (
        <Section style={{ marginBottom: "32px" }}>
          <Img src={imageUrl} width="552" alt={title} style={{ width: "100%", height: "auto", borderRadius: "24px" }} />
        </Section>
      )}
      <Section>
        <Text style={{ ...heading, fontSize: "36px", lineHeight: "42px", margin: "0 0 24px" }}>{title}</Text>
        {body && <PortableText value={body} components={components} />}
        {cta?.label && cta.url && (
          <Section style={{ marginTop: "16px" }}>
            <PerroButton href={cta.url}>{cta.label}</PerroButton>
          </Section>
        )}
      </Section>
    </PerroLayout>
  )
}

Newsletter.PreviewProps = {
  heading: "Lo que aprendimos este mes",
  previewText: "Tendencias, herramientas y un par de cosas que nos volaron la cabeza.",
  body: [
    {
      _type: "block",
      _key: "a",
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: "a1", text: "Hola! Este mes estuvimos probando nuevas formas de medir campañas y armamos un resumen con lo que funcionó.", marks: [] }],
    },
    {
      _type: "block",
      _key: "b",
      style: "h2",
      markDefs: [],
      children: [{ _type: "span", _key: "b1", text: "1. Tracking server-side", marks: [] }],
    },
    {
      _type: "block",
      _key: "c",
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: "c1", text: "Con los bloqueadores y las cookies cada vez más limitadas, medir desde el servidor ya no es opcional.", marks: [] }],
    },
  ],
  cta: { label: "Hablemos", url: "https://www.perroagency.com/contacto" },
} satisfies NewsletterProps
