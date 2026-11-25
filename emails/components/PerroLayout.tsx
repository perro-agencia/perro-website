import type { CSSProperties, ReactNode } from "react"
import { Body, Button, Column, Container, Head, Html, Img, Link, Preview, Row, Section, Text } from "react-email"

// Los emails usan URLs absolutas: las imágenes de /public solo cargan una vez deployadas
export const SITE_URL = "https://www.perroagency.com"
// En el preview local (`pnpm email`) el logo se toma del dev server de Next
const ASSETS_URL = process.env.EMAIL_ASSETS_URL || SITE_URL

export const colors = {
  black: "#0a0a0a",
  white: "#ffffff",
  canvas: "#f2f2f2",
  muted: "#6b6b6b",
  mutedOnDark: "#a3a3a3",
  line: "#e6e6e6",
  primary: "#885de3",
  accent01: "#de4a27",
  accent02: "#c4f875",
}

export const fontFamily = '"Helvetica Neue", Helvetica, Arial, sans-serif'

// Ancho útil del cuerpo: 600px de card menos 48px de padding a cada lado
export const CONTENT_WIDTH = 504

export const text: CSSProperties = {
  color: colors.black,
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 0 16px",
}

export const heading: CSSProperties = {
  color: colors.black,
  fontSize: "32px",
  lineHeight: "38px",
  fontWeight: 500,
  letterSpacing: "-0.5px",
  margin: "0 0 16px",
}

export const eyebrow: CSSProperties = {
  color: colors.primary,
  fontSize: "12px",
  lineHeight: "16px",
  fontWeight: 500,
  letterSpacing: "2px",
  textTransform: "uppercase",
  margin: "0 0 12px",
}

export function PerroButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Button
      href={href}
      style={{
        backgroundColor: colors.primary,
        color: colors.white,
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

const footerLink: CSSProperties = { color: colors.mutedOnDark, textDecoration: "underline" }
const footerSep = <span style={{ color: colors.mutedOnDark }}> · </span>
const socialLink: CSSProperties = { color: colors.white, fontSize: "14px", fontWeight: 500, textDecoration: "none" }

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
      <Body style={{ backgroundColor: colors.canvas, fontFamily, margin: 0, padding: "32px 12px" }}>
        <Container style={{ maxWidth: "600px", width: "100%", borderRadius: "24px", overflow: "hidden" }}>
          <Section style={{ backgroundColor: colors.black, padding: "40px 48px" }}>
            <Link href={SITE_URL}>
              <Img src={`${ASSETS_URL}/email/logo-white.png`} width="124" height="40" alt="PERRO" />
            </Link>
          </Section>

          <Section style={{ backgroundColor: colors.white, padding: "48px" }}>{children}</Section>

          <Section style={{ backgroundColor: colors.black, padding: "40px 48px" }}>
            <Row>
              <Column>
                <Img src={`${ASSETS_URL}/email/logo-white.png`} width="93" height="30" alt="PERRO" />
              </Column>
              <Column align="right">
                <Link href="https://www.instagram.com/perroagency/" style={socialLink}>
                  Instagram
                </Link>
                <span style={{ display: "inline-block", width: "20px" }} />
                <Link href="https://www.linkedin.com/company/perroagency/" style={socialLink}>
                  LinkedIn
                </Link>
                <span style={{ display: "inline-block", width: "20px" }} />
                <Link href="https://wa.me/541124058394" style={socialLink}>
                  WhatsApp
                </Link>
              </Column>
            </Row>

            <Text style={{ fontSize: "14px", lineHeight: "22px", margin: "32px 0 16px" }}>
              <Link href={SITE_URL} style={footerLink}>
                perroagency.com
              </Link>
              {footerSep}
              <Link href={`${SITE_URL}/contacto`} style={footerLink}>
                Contacto
              </Link>
              {footerSep}
              <Link href={`${SITE_URL}/legal/politicas-de-privacidad`} style={footerLink}>
                Privacidad
              </Link>
              {unsubscribe && (
                <>
                  {footerSep}
                  <Link href="{{{RESEND_UNSUBSCRIBE_URL}}}" style={footerLink}>
                    Darte de baja
                  </Link>
                </>
              )}
            </Text>

            <Text style={{ color: colors.mutedOnDark, fontSize: "13px", lineHeight: "20px", margin: "0 0 12px" }}>
              {unsubscribe
                ? "Recibís este email porque te suscribiste a las novedades de PERRO."
                : "Recibís este email porque nos escribiste desde perroagency.com."}{" "}
              PERRO, nativos en la era digital.
            </Text>
            <Text style={{ color: colors.mutedOnDark, fontSize: "13px", lineHeight: "20px", margin: 0 }}>
              © {new Date().getFullYear()} PERRO Agency · Todos los derechos reservados.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
