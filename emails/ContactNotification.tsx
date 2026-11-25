import { Link, Section, Text } from "react-email"
import { PerroLayout, colors, eyebrow, heading, text } from "./components/PerroLayout"

interface Props {
  name: string
  email: string
  company?: string
  service?: string
  message?: string
  fields?: Record<string, string>
}

const fieldLabels: Record<string, string> = {
  role: "Rol",
  website: "Website",
  budget: "Presupuesto mensual",
}

const label = { color: colors.muted, fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase" as const, margin: "0 0 4px" }
const value = { ...text, margin: "0 0 20px" }

export default function ContactNotification({ name, email, company, service, message, fields = {} }: Props) {
  const extra = Object.entries(fields).filter(([, v]) => typeof v === "string" && v)

  return (
    <PerroLayout preview={`${name}${service ? ` · ${service}` : ""}`}>
      <Section>
        <Text style={eyebrow}>Nuevo contacto{service ? ` · ${service}` : ""}</Text>
        <Text style={{ ...heading, margin: "0 0 32px" }}>{name}</Text>

        <Text style={label}>Email</Text>
        <Text style={value}>
          <Link href={`mailto:${email}`} style={{ color: colors.primary }}>
            {email}
          </Link>
        </Text>

        {company && (
          <>
            <Text style={label}>Empresa</Text>
            <Text style={value}>{company}</Text>
          </>
        )}

        {extra.map(([key, v]) => (
          <div key={key}>
            <Text style={label}>{fieldLabels[key] ?? key}</Text>
            <Text style={value}>{v}</Text>
          </div>
        ))}

        {message && (
          <>
            <Text style={label}>Mensaje</Text>
            <Text style={{ ...value, whiteSpace: "pre-line" }}>{message}</Text>
          </>
        )}

        <Text style={{ ...text, color: colors.muted, fontSize: "13px", margin: "24px 0 0" }}>
          Respondé este email para contestarle directo a {name}.
        </Text>
      </Section>
    </PerroLayout>
  )
}

ContactNotification.PreviewProps = {
  name: "Martina López",
  email: "martina@empresa.com",
  service: "Performance Ads",
  message: "Hola! Queremos escalar la facturación del ecommerce.\nHoy invertimos en Meta pero sin tracking real.",
  fields: { role: "CMO", website: "empresa.com", budget: "$5.000 - $15.000 USD" },
} satisfies Props
