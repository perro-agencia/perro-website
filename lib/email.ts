import { Resend } from "resend"

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error("RESEND_API_KEY no está configurada")
  return new Resend(key)
}

export async function sendContactEmail({
  name,
  company,
  email,
  message,
  service,
  fields,
}: {
  name: string
  company?: string
  email: string
  message?: string
  service?: string
  fields?: Record<string, string>
}) {
  const serviceLabel = service ? ` [${service}]` : ""

  const dynamicFieldsHtml = fields
    ? Object.entries(fields)
        .filter(([, value]) => value)
        .map(
          ([key, value]) =>
            `<p><strong>${escapeHtml(key)}:</strong> ${escapeHtml(value)}</p>`
        )
        .join("")
    : ""

  return getResend().emails.send({
    from: "Contacto PERRO <contacto@perroagency.com>",
    to: process.env.CONTACT_EMAIL_TO || "queonda@perroagency.com",
    subject: `Nuevo contacto${serviceLabel} de ${name}`,
    html: `
      <h2>Nuevo mensaje de contacto${serviceLabel ? ` — ${escapeHtml(service!)}` : ""}</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
      ${company ? `<p><strong>Compañía:</strong> ${escapeHtml(company)}</p>` : ""}
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${dynamicFieldsHtml}
      ${message ? `<p><strong>Mensaje:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>` : ""}
    `,
  })
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
