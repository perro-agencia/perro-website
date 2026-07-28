import { Nav } from "@/components/layout/Nav"
import { Footer } from "@/components/layout/Footer"
import { AnimateInView } from "@/components/AnimateInView"
import { Button } from "@/components/ui/Button"
import { PerformanceContactForm } from "@/components/landing/PerformanceContactForm"
import { FloatingLogos } from "@/components/landing/FloatingLogos"
import { ClientsSection } from "@/components/sections/ClientsSection"
import { buildMetadata } from "@/lib/metadata"
import type { FieldConfig } from "@/components/landing/PerformanceContactForm"

export const metadata = buildMetadata({
  title: "Perro Agency - Brand website",
  description: "Diseñamos y desarrollamos sitios web que comunican quién sos, qué hacés y por qué importa.",
  path: "/brand-website",
})

const steps = [
  {
    step: "01",
    title: "Diagnóstico y relevamiento",
    description: "Analizamos tu marca, competencia y objetivos para definir la arquitectura de contenido y la identidad visual del sitio.",
  },
  {
    step: "02",
    title: "Diseño y desarrollo",
    description: "Diseñamos cada pantalla en Figma y la desarrollamos con tecnologías modernas como Next.js, Tailwind CSS y Sanity CMS.",
  },
  {
    step: "03",
    title: "Lanzamiento y optimización",
    description: "Desplegamos el sitio, configuramos analytics, SEO on-page y te entregamos la documentación para que puedas gestionar el contenido.",
  },
]

const techStack = [
  "Next.js", "React", "Tailwind CSS", "Framer Motion",
  "Sanity CMS", "TypeScript", "Vercel", "SEO On-page",
]

const formFields: FieldConfig[] = [
  { name: "name", type: "text", label: "Nombre", required: true },
  { name: "email", type: "email", label: "Email ", required: true },
  { name: "website", type: "text", label: "Website" },
  { name: "message", type: "textarea", label: "mensaje", required: true },
]

export default function WebsiteInstitucionalPage() {
  return (
    <>
      <Nav
        logoSrc="/brand/isologotipo-white.svg"
        logoHoverSrc="/brand/isologotipo-color.svg"
      />

      <main className="w-full max-w-[1440px] mx-auto px-4 md:p-8 md:p-12">
        {/* Hero + Form */}
        <section className="relative flex items-center justify-center h-[calc(100vh-120px)] pt-24 overflow-hidden">
          <FloatingLogos />
          <div className="flex flex-col items-center justify-center w-full max-w-[1000px] text-center relative z-10">
            <AnimateInView>
              <h1 className="font-display font-normal leading-[0.95] -tracking-[0.03em] text-6xl md:text-7xl lg:text-[140px] mb-8">
                Tu sitio web,
                <br />
                <span className="text-brand-primary-main">hecho a medida.</span>
              </h1>
            </AnimateInView>

            <AnimateInView delay={0.1}>
              <p className="text-brand-white text-lg max-w-4xl mb-12">
                Un buen sitio web abre muchas puertas. <br />
                Diseñamos y desarrollamos sitios web que comunican quién sos, qué hacés y por qué importa. Resolvemos sitios web genéricos, navegación poco clara, usabilidad deficiente o sitios que no reflejan el valor de la marca. <br /> <br />
                Tu sitio web suele ser la primera (y más duradera) impresión que alguien tiene de tu marca. Por eso creamos sitios que no solo informan, sino que también inspiran, atraen y generan confianza.
              </p>
            </AnimateInView>
          </div>
        </section>

        {/* Clientes */}
        <ClientsSection />

        {/* Pasos */}
        <section className="py-12 md:py-24">
          <AnimateInView>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.1] mb-16 text-center">
              Cómo trabajamos
            </h2>
          </AnimateInView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => {
              const cardStyles = [
                { bg: "bg-brand-white", text: "text-brand-black", textMuted: "text-brand-black/70", stepText: "text-brand-black/20" },
                { bg: "bg-brand-primary-main", text: "text-brand-white", textMuted: "text-brand-white/80", stepText: "text-brand-white/20" },
                { bg: "bg-brand-accent-02", text: "text-brand-black", textMuted: "text-brand-black/70", stepText: "text-brand-black/20" },
              ]
              const s = cardStyles[i]
              return (
                <AnimateInView key={step.step} delay={i * 0.15}>
                  <div className={`${s.bg} rounded-3xl p-8 h-full flex flex-col transition-all duration-300 hover:shadow-[0_0_32px_-12px_rgba(255,255,255,0.25)]`}>
                    <span className={`font-display text-[clamp(3rem,5vw,4.5rem)] font-bold ${s.stepText} leading-none mb-6`}>
                      {step.step}
                    </span>
                    <h3 className={`font-display text-xl md:text-2xl font-medium ${s.text} mb-4`}>
                      {step.title}
                    </h3>
                    <p className={`${s.textMuted} text-base leading-relaxed`}>
                      {step.description}
                    </p>
                  </div>
                </AnimateInView>
              )
            })}
          </div>
        </section>

        {/* Formulario */}
        <section id="contacto" className="flex flex-col md:flex-row justify-between py-12 md:py-24 gap-12">
          <div className="flex flex-col w-full md:w-1/2">
            <AnimateInView>
              <h2 className="font-display font-normal leading-[0.95] -tracking-[0.03em] text-[clamp(2rem,5vw,3.5rem)] mb-6">
                ¿Listo para llevar tu presencia online al siguiente nivel?
              </h2>
            </AnimateInView>
            <AnimateInView delay={0.1}>
              <p className="text-brand-white/60 text-lg max-w-xl">
                Completá el formulario y te contactamos en menos de 24 horas para coordinar una reunión sin compromiso.
              </p>
            </AnimateInView>
          </div>

          <PerformanceContactForm
            service="Website Institucional"
            fields={formFields}
            buttonText="CONTACTANOS"
            successMessage="Gracias por completar el formulario. Te contactaremos pronto."
          />
        </section>
      </main>
    </>
  )
}
