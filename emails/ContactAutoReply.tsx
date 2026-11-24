import { Section, Text } from "react-email"
import { PerroButton, PerroLayout, SITE_URL, colors, eyebrow, heading, text } from "./components/PerroLayout"

interface Props {
  name: string
}

// No se repite el mensaje del usuario: el form acepta cualquier email y no queremos que sirva para mandar spam a terceros
export default function ContactAutoReply({ name }: Props) {
  const firstName = name.trim().split(/\s+/)[0]?.slice(0, 40) || ""

  return (
    <PerroLayout preview="Recibimos tu mensaje, te respondemos pronto.">
      <Section>
        <Text style={eyebrow}>Mensaje recibido</Text>
        <Text style={heading}>{firstName ? `¡Hola, ${firstName}!` : "¡Hola!"}</Text>
        <Text style={text}>
          Gracias por escribirnos. Tu mensaje ya le llegó al equipo de PERRO y te vamos a responder dentro de las
          próximas 48 horas hábiles.
        </Text>
        <Text style={text}>
          Si necesitás sumar algo, respondé este email y lo recibimos directo en nuestra casilla.
        </Text>
        <Text style={{ ...text, color: colors.muted, margin: "0 0 32px" }}>
          Mientras tanto, podés ver algunos de los proyectos que hicimos.
        </Text>
        <PerroButton href={`${SITE_URL}/portfolio`}>Ver portfolio</PerroButton>
      </Section>
    </PerroLayout>
  )
}

ContactAutoReply.PreviewProps = { name: "Martina López" } satisfies Props
