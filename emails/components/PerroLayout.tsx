import type { CSSProperties, ReactNode } from "react"
import { Body, Button, Container, Head, Hr, Html, Img, Link, Preview, Section, Text } from "react-email"

// Los emails usan URLs absolutas: las imágenes de /public solo cargan una vez deployadas
export const SITE_URL = "https://www.perroagency.com"

export const colors = {
  black: "#0a0a0a",
  white: "#ffffff",
  muted: "#a3a3a3",
  line: "#2a2a2a",
  primary: "#885de3",
  accent01: "#de4a27",
  accent02: "#c4f875",
}

export const fontFamily = '"Helvetica Neue", Helvetica, Arial, sans-serif'

export const text: CSSProperties = {
  color: colors.white,
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 0 16px",
}

export const heading: CSSProperties = {
  color: colors.white,
  fontSize: "32px",
  lineHeight: "38px",
  fontWeight: 500,
  letterSpacing: "-0.5px",
  margin: "0 0 16px",
}

export const eyebrow: CSSProperties = {
  color: colors.accent02,
  fontSize: "12px",
  lineHeight: "16px",
  letterSpacing: "2px",
  textTransform: "uppercase",
  margin: "0 0 12px",
}

export function PerroButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Button
      href={href}
      style={{
        backgroundColor: colors.accent02,
        color: colors.black,
        borderRadius: "999px",
        padding: "14px 32px",
        fontSize: "14px",
        fontWeight: 500,
        letterSpacing: "1px",
        textTransform: "uppercase",
        textDecoration: "none",
      }}
    >
      {children}
    </Button>
  )
}

interface Props {
  preview: string
  children: ReactNode
  // Los broadcasts de Resend exigen el link de baja; los transaccionales no lo llevan
  unsubscribe?: boolean
}

export function PerroLayout({ preview, children, unsubscribe = false }: Props) {
  return (
    <Html lang="es">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: colors.black, fontFamily, margin: 0, padding: "32px 0" }}>
        <Container style={{ maxWidth: "600px", width: "100%", padding: "0 24px" }}>
          <Section style={{ padding: "8px 0 40px" }}>
            <Link href={SITE_URL}>
              <Img src={`${SITE_URL}/email/logo-white.png`} width="124" height="40" alt="PERRO" />
            </Link>
          </Section>

          {children}

          <Hr style={{ borderColor: colors.line, margin: "48px 0 24px" }} />

          <Section>
            <Text style={{ ...text, fontSize: "14px", lineHeight: "22px", margin: "0 0 8px" }}>
              PERRO, nativos en la era digital.
            </Text>
            <Text style={{ fontSize: "13px", lineHeight: "20px", margin: "0 0 16px" }}>
              <Link href={SITE_URL} style={{ color: colors.muted }}>
                perroagency.com
              </Link>
              <span style={{ color: colors.line }}> · </span>
              <Link href="https://www.instagram.com/perroagency/" style={{ color: colors.muted }}>
                Instagram
              </Link>
              <span style={{ color: colors.line }}> · </span>
              <Link href="https://www.linkedin.com/company/perroagency/" style={{ color: colors.muted }}>
                LinkedIn
              </Link>
              <span style={{ color: colors.line }}> · </span>
              <Link href="https://wa.me/541124058394" style={{ color: colors.muted }}>
                WhatsApp
              </Link>
            </Text>
            {unsubscribe && (
              <Text style={{ color: colors.muted, fontSize: "12px", lineHeight: "18px", margin: 0 }}>
                Recibís este email porque te suscribiste a las novedades de PERRO.{" "}
                <Link href="{{{RESEND_UNSUBSCRIBE_URL}}}" style={{ color: colors.muted, textDecoration: "underline" }}>
                  Darte de baja
                </Link>
              </Text>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
