import { Column, Img, Row, Section, Text } from "react-email"
import { PerroButton, PerroLayout, SITE_URL, colors, eyebrow, heading, text } from "./components/PerroLayout"

export interface NewCaseStudyProps {
  title: string
  summary?: string
  url: string
  imageUrl?: string
  details?: { label: string; value: string }[]
}

export default function NewCaseStudy({ title, summary, url, imageUrl, details = [] }: NewCaseStudyProps) {
  return (
    <PerroLayout preview={summary || `Nuevo case study: ${title}`} unsubscribe>
      {imageUrl && (
        <Section style={{ marginBottom: "32px" }}>
          <Img src={imageUrl} width="552" alt={title} style={{ width: "100%", height: "auto", borderRadius: "24px" }} />
        </Section>
      )}
      <Section>
        <Text style={eyebrow}>Nuevo case study</Text>
        <Text style={heading}>{title}</Text>
        {summary && <Text style={{ ...text, color: colors.muted }}>{summary}</Text>}
      </Section>

      {details.length > 0 && (
        <Section style={{ borderTop: `1px solid ${colors.line}`, padding: "20px 0 8px", margin: "8px 0 24px" }}>
          <Row>
            {details.map(({ label, value }) => (
              <Column key={label} style={{ verticalAlign: "top", paddingRight: "12px" }}>
                <Text style={{ color: colors.muted, fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", margin: "0 0 4px" }}>
                  {label}
                </Text>
                <Text style={{ ...text, fontSize: "14px", lineHeight: "20px", margin: 0 }}>{value}</Text>
              </Column>
            ))}
          </Row>
        </Section>
      )}

      <Section>
        <PerroButton href={url}>Ver el proyecto</PerroButton>
      </Section>
    </PerroLayout>
  )
}

NewCaseStudy.PreviewProps = {
  title: "Rebranding y ecommerce para una marca de indumentaria",
  summary: "Redefinimos la identidad y construimos una tienda pensada para convertir.",
  url: `${SITE_URL}/portfolio`,
  imageUrl: `${SITE_URL}/og/og-website.png`,
  details: [
    { label: "Industria", value: "Moda" },
    { label: "Servicio", value: "Branding" },
    { label: "Año", value: "2026" },
  ],
} satisfies NewCaseStudyProps
