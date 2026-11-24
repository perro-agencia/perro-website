import { NextResponse } from "next/server"
import { sendContactAutoReply, sendContactEmail } from "@/lib/email"

const rateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW = 60_000

if (typeof globalThis !== "undefined") {
  setInterval(() => {
    const now = Date.now()
    for (const [ip, entry] of rateLimit) {
      if (now > entry.resetAt) rateLimit.delete(ip)
    }
  }, 300_000)
}

function getRateLimitInfo(ip: string) {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || now > entry.resetAt) {
    const resetAt = now + RATE_LIMIT_WINDOW
    rateLimit.set(ip, { count: 1, resetAt })
    return { remaining: RATE_LIMIT_MAX - 1, resetAt }
  }
  entry.count++
  return { remaining: Math.max(0, RATE_LIMIT_MAX - entry.count), resetAt: entry.resetAt }
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    const { remaining, resetAt } = getRateLimitInfo(ip)

    if (remaining <= 0) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Intentá de nuevo en un minuto." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)) } }
      )
    }

    const body = await req.json()
    const { name, company, email, message, service, ...rest } = body

    if (!name || !email) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    if (typeof name !== "string" || typeof email !== "string") {
      return NextResponse.json({ error: "Tipos inválidos" }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    const { error } = await sendContactEmail({
      name,
      company,
      email,
      message,
      service,
      fields: rest,
    })

    if (error) {
      return NextResponse.json({ error: "Error al enviar el mensaje" }, { status: 500 })
    }

    // Si falla la confirmación al usuario, el contacto ya llegó al equipo: no se devuelve error
    try {
      const { error: autoReplyError } = await sendContactAutoReply({ name, email })
      if (autoReplyError) console.error("Auto-reply de contacto falló", autoReplyError)
    } catch (err) {
      console.error("Auto-reply de contacto falló", err)
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
