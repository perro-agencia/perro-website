"use client"

import { useState, type FormEvent } from "react"
import { cn } from "@/lib/utils"

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")

    const form = e.currentTarget
    // safe: los name de los inputs coinciden con los campos esperados
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      setStatus("success")
      form.reset()
    } else {
      setStatus("error")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className={cn(
            "w-full px-4 py-3 bg-brand-white/5 border border-brand-white/10 rounded-lg",
            "focus:outline-none focus:border-brand-primary-main transition-colors"
          )}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={cn(
            "w-full px-4 py-3 bg-brand-white/5 border border-brand-white/10 rounded-lg",
            "focus:outline-none focus:border-brand-primary-main transition-colors"
          )}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={cn(
            "w-full px-4 py-3 bg-brand-white/5 border border-brand-white/10 rounded-lg",
            "focus:outline-none focus:border-brand-primary-main transition-colors resize-y"
          )}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3 px-6 bg-brand-primary-main text-brand-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === "sending" ? "Enviando..." : "Enviar mensaje"}
      </button>

      {status === "success" && (
        <p role="alert" className="text-brand-accent-02 text-sm">
          Mensaje enviado correctamente. Te responderemos pronto.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-brand-accent-01 text-sm">
          Hubo un error al enviar el mensaje. Intentá de nuevo.
        </p>
      )}
    </form>
  )
}
