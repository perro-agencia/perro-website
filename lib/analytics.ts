declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

// Evento de conversión para GTM: se dispara solo cuando /api/contact responde OK
export function trackLead() {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: "generate_lead", form_location: window.location.pathname })
}
