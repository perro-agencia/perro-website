import { Nav } from "@/components/layout/Nav"
import { Footer } from "@/components/layout/Footer"
import { AnimateInView } from "@/components/AnimateInView"
import { Chip } from "@/components/ui/Chip"
import { LandingContactForm } from "@/components/landing/LandingContactForm"
import { FloatingLogos, type FloatingLogo } from "@/components/landing/FloatingLogos"
import { ClientsSection } from "@/components/sections/ClientsSection"
import { JsonLd } from "@/components/JsonLd"
import { buildMetadata } from "@/lib/metadata"
import type { FieldConfig } from "@/components/landing/LandingContactForm"

export const metadata = buildMetadata({
  title: "Perro Agency - Publicidad Digital",
  description: "Diseñamos, ejecutamos y optimizamos estrategias de Paid Media y performance para empresas que invierten y buscan crecimiento sostenible.",
  path: "/performance-ads",
})

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Performance Marketing / Publicidad paga",
  provider: {
    "@type": "Organization",
    name: "PERRO Agency",
    url: "https://www.perroagency.com/",
  },
  areaServed: "AR",
  url: "https://www.perroagency.com/performance-ads",
  description:
    "Gestión y optimización de campañas de publicidad paga en Google Ads, Meta, TikTok y LinkedIn, con foco en ROAS y CAC/LTV. Más de USD 112M gestionados en inversión publicitaria.",
}

const chips = [
  "Anuncios", "Paid Media", "ROAS", "ROI", "Performance",
  "Creatividades", "copies", "línea de crédito", "tracking", "ga4", "google tag manager"
]

const heroLogos: FloatingLogo[] = [
  { src: "/performance-ads-landing/icons/logo-gads.png", alt: "Google Ads" },
  { src: "/performance-ads-landing/icons/logo-metads.png", alt: "Meta Ads" },
  { src: "/performance-ads-landing/icons/logo-ganalytics.png", alt: "Google Analytics" },
  { src: "/performance-ads-landing/icons/logo-gtags.png", alt: "Google Tag Manager" },
  { src: "/performance-ads-landing/icons/logo-gads2.png", alt: "Display & Video 360" },
  { src: "/performance-ads-landing/icons/logo-gmarketplace.png", alt: "Google Marketing Platform" },
  { src: "/performance-ads-landing/icons/logo-gads3.png", alt: "Google Ads" },
  { src: "/performance-ads-landing/icons/logo-codeads.png", alt: "Ads" },
  { src: "/performance-ads-landing/icons/logo-gads4.png", alt: "Google Ads" },
]

const formFields: FieldConfig[] = [
  { name: "name", type: "text", label: "Nombre", required: true },
  { name: "email", type: "email", label: "Email corporativo", required: true },
  { name: "role", type: "text", label: "Rol en la empresa" },
  { name: "website", type: "text", label: "Website" },
  { name: "budget", type: "select", label: "Presupuesto mensual estimado", options: ["$1.000 - $5.000 USD", "$5.000 - $15.000 USD", "+$15.000 USD"] },
  { name: "message", type: "textarea", label: "¿Cuál es tu principal desafío hoy? (Ej: Bajar el CAC, escalar facturación, falta de tracking real)", required: true },
]

export default function PerformanceAdsPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <Nav
        logoSrc="/brand/isologotipo-white.svg"
        logoHoverSrc="/brand/isologotipo-color.svg"
      />

      <main className="w-full max-w-[1440px] mx-auto p-8 md:p-12">
        {/* Hero */}
        <section className="relative flex items-center justify-center h-[calc(100vh-120px)] pt-24 overflow-hidden">
          <FloatingLogos logos={heroLogos} />
          <div className="flex flex-col items-center justify-center w-full max-w-[1200px] text-center relative z-10">
            <AnimateInView>
              <h1 className="font-display font-normal leading-[0.95] -tracking-[0.03em] text-6xl md:text-8xl mb-8">
                Menos humo. Más estrategia,
                <br />
                <span className="text-brand-primary-main">tracking y pauta real</span>
              </h1>
            </AnimateInView>

            <AnimateInView delay={0.1}>
              <p className="text-brand-white text-lg max-w-3xl">
                Diseñamos la estrategia según la necesidad real de tu marca: desde escalar la facturación y bajar el CAC, hasta construir posicionamiento con impacto medible.
              </p>
            </AnimateInView>
          </div>
        </section>

        {/* Multi-plataformas */}
        <section className="py-12 max-w-[900px] mx-auto">
          <div className="text-center">
            <AnimateInView>
              <h2 className="text-xl uppercase text-brand-white mb-6">Estrategia Multi-plataformas</h2>
            </AnimateInView>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              <AnimateInView>
                <div className="flex items-center justify-center p-4">
                  <img src="/multiplatform/google-ads.png" alt="Google Ads" className="h-12 md:h-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                </div>
              </AnimateInView>
              <AnimateInView delay={0.1}>
                <div className="flex items-center justify-center p-4">
                  <img src="/multiplatform/meta-ads.png" alt="Meta Ads" className="h-12 md:h-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                </div>
              </AnimateInView>
              <AnimateInView delay={0.2}>
                <div className="flex items-center justify-center p-4">
                  <img src="/multiplatform/tiktok-ads.png" alt="TikTok Ads" className="h-12 md:h-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                </div>
              </AnimateInView>
              <AnimateInView delay={0.3}>
                <div className="flex items-center justify-center p-4">
                  <img src="/multiplatform/linke-ads.png" alt="LinkedIn Ads" className="h-12 md:h-16 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                </div>
              </AnimateInView>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimateInView>
              <div className="bg-brand-white text-brand-black rounded-3xl px-4 py-6 md:p-8 h-full">
                <h3 className="font-display text-4xl md:text-5xl font-medium mb-4">+$112M</h3>
                <p className="text-brand-black/70 text-lg">Gestionados en inversión publicitaria.</p>
              </div>
            </AnimateInView>
            <AnimateInView delay={0.1}>
              <div className="bg-brand-primary-main text-brand-white rounded-3xl px-4 py-6 md:p-8 h-full">
                <h3 className="whitespace-nowrap font-display text-4xl md:text-5xl font-medium mb-4">E-commerce</h3>
                <p className="text-brand-white/80 text-lg">Maximizamos tu ROAS y facturación.</p>
              </div>
            </AnimateInView>
            <AnimateInView delay={0.2}>
              <div className="bg-brand-accent-02 text-brand-black rounded-3xl px-4 py-6 md:p-8">
                <h3 className="font-display text-4xl md:text-5xl font-medium mb-4">Modelos SaaS</h3>
                <p className="text-brand-black/70 text-lg">Optimización de CAC y LTV para escalar la adquisición.</p>
              </div>
            </AnimateInView>
          </div>
        </section>

        {/* Clientes */}
        <ClientsSection />

        <section className="flex flex-col md:flex-row justify-between py-12 md:py-24">
          <div className="flex flex-col w-full md:w-1/2">
            <AnimateInView>
              <h2 className="font-display font-normal leading-[0.95] -tracking-[0.03em] text-[clamp(2.5rem,6vw,4rem)] mb-8">
                Escalamos el ROAS de <span className="whitespace-nowrap">E-commerces</span> y optimizamos el CAC de plataformas SaaS.
              </h2>
            </AnimateInView>

            <AnimateInView delay={0.1}>
              <p className="text-brand-white/70 text-lg md:text-xl max-w-3xl mb-12">
                Ayudamos a empresas con capacidad de inversión a dominar sus canales de adquisición. Optimizamos cada dólar de tu presupuesto en todo el ecosistema de Paid Media con enfoque 100% en los resultados.
              </p>
            </AnimateInView>

            <AnimateInView delay={0.2}>
              <div className="hidden lg:flex flex-wrap gap-3">
                {chips.map((chip) => (
                  <Chip key={chip} variant="outline">{chip}</Chip>
                ))}
              </div>
            </AnimateInView>
          </div>

          {/* Formulario */}
          <LandingContactForm
            service="Performance Ads"
            fields={formFields}
            successMessage="Gracias por completar el formulario. Te contactaremos pronto."
          />
        </section>
      </main>
    </>
  )
}
