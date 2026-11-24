import { createElement, type ReactElement } from "react"
import { Resend } from "resend"
import { render } from "@react-email/render"
import ContactNotification from "@/emails/ContactNotification"
import ContactAutoReply from "@/emails/ContactAutoReply"

const CONTACT_FROM = "Contacto PERRO <contacto@perroagency.com>"
const AUTO_REPLY_FROM = "PERRO <contacto@perroagency.com>"
const BROADCAST_FROM = process.env.RESEND_BROADCAST_FROM || "PERRO <novedades@perroagency.com>"
const TEAM_EMAIL = process.env.CONTACT_EMAIL_TO || "queonda@perroagency.com"

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error("RESEND_API_KEY no está configurada")
  return new Resend(key)
}

async function renderEmail(element: ReactElement) {
  const [html, text] = await Promise.all([render(element), render(element, { plainText: true })])
  return { html, text }
}

interface ContactPayload {
  name: string
  company?: string
  email: string
  message?: string
  service?: string
  fields?: Record<string, string>
}

// Aviso interno a la casilla del equipo; replyTo permite contestarle directo al contacto
export async function sendContactEmail({ name, company, email, message, service, fields }: ContactPayload) {
  const serviceLabel = service ? ` [${service}]` : ""
  const { html, text } = await renderEmail(
    createElement(ContactNotification, { name, email, company, service, message, fields }),
  )

  return getResend().emails.send({
    from: CONTACT_FROM,
    to: TEAM_EMAIL,
    replyTo: email,
    subject: `Nuevo contacto${serviceLabel} de ${name}`,
    html,
    text,
  })
}

// Confirmación automática a quien completó el formulario
export async function sendContactAutoReply({ name, email }: Pick<ContactPayload, "name" | "email">) {
  const { html, text } = await renderEmail(createElement(ContactAutoReply, { name }))

  return getResend().emails.send({
    from: AUTO_REPLY_FROM,
    to: email,
    replyTo: TEAM_EMAIL,
    subject: "Recibimos tu mensaje 🐾",
    html,
    text,
  })
}

// Crea un broadcast en borrador (nunca lo envía): se revisa y se manda desde el panel de Resend
export async function createBroadcastDraft({
  name,
  subject,
  previewText,
  element,
}: {
  name: string
  subject: string
  previewText?: string
  element: ReactElement
}) {
  const segmentId = process.env.RESEND_SEGMENT_ID
  if (!segmentId) throw new Error("RESEND_SEGMENT_ID no está configurada")

  const { html, text } = await renderEmail(element)

  return getResend().broadcasts.create({
    name,
    segmentId,
    from: BROADCAST_FROM,
    replyTo: TEAM_EMAIL,
    subject,
    previewText,
    html,
    text,
  })
}
