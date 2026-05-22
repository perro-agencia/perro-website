import type { Metadata } from "next"
import { fontBody } from "@/lib/fonts"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: {
    default: "PERRO | Agencia Creativa",
    template: "%s | PERRO",
  },
  description: "Agencia creativa especializada en branding, diseño y desarrollo digital.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={fontBody.variable}>
      <body>{children}</body>
    </html>
  )
}
