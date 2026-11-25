import { useState } from "react"
import { EnvelopeIcon } from "@sanity/icons"
import { useToast } from "@sanity/ui"
import type { DocumentActionComponent } from "sanity"

export const EMAIL_DOC_TYPES = ["post", "project", "newsletter"]

const labels: Record<string, string> = {
  post: "esta nota del blog",
  project: "este case study",
  newsletter: "este newsletter",
}

// Arma el email con el template de PERRO y lo deja como borrador en Resend; nunca envía
export const PrepareEmailAction: DocumentActionComponent = ({ id, type, draft, published }) => {
  const toast = useToast()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const disabledReason = !published
    ? "Publicá el documento antes de preparar el email"
    : draft
      ? "Hay cambios sin publicar: publicalos para que el email los incluya"
      : undefined

  const createDraft = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/email/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, id }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "No se pudo crear el borrador")

      toast.push({
        status: "success",
        title: "Borrador creado en Resend",
        description: "Se abrió en una pestaña nueva para revisarlo y enviarlo.",
      })
      window.open(json.url, "_blank", "noopener")
    } catch (err) {
      toast.push({
        status: "error",
        title: "No se pudo preparar el email",
        description: err instanceof Error ? err.message : undefined,
      })
    } finally {
      setLoading(false)
      setDialogOpen(false)
    }
  }

  return {
    label: loading ? "Preparando email…" : "Preparar email",
    icon: EnvelopeIcon,
    disabled: Boolean(disabledReason) || loading,
    title: disabledReason,
    onHandle: () => setDialogOpen(true),
    dialog: dialogOpen && {
      type: "confirm",
      tone: "primary",
      message: `Se va a crear un borrador en Resend con ${labels[type] ?? "este documento"}. No se envía nada hasta que lo mandes desde Resend.`,
      onCancel: () => setDialogOpen(false),
      onConfirm: createDraft,
    },
  }
}
