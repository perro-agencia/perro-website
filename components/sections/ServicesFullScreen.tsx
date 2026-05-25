"use client"

import { motion } from "framer-motion"
import { Chip } from "@/components/ui/Chip"

type ServiceBg = "bg-brand-primary-main" | "bg-brand-accent-01" | "bg-brand-accent-02" | "bg-brand-white" | "bg-black"
type ServiceTextColor = "text-brand-white" | "text-brand-black"
type ServiceDescColor = "text-brand-white" | "text-brand-white/80" | "text-brand-black" | "text-brand-black/70"

interface ServiceConfig {
  title: string
  description: string
  bg: ServiceBg
  textColor: ServiceTextColor
  descColor: ServiceDescColor
  chips: string[]
  chipClass?: string
}

const services: ServiceConfig[] = [
  {
    title: "Diseño",
    description:
      "No hacemos logos, creamos marcas únicas. Le damos identidad a tu negocio y su propia historia.",
    bg: "bg-brand-accent-02",
    textColor: "text-brand-black",
    descColor: "text-brand-black",
    chips: ["branding", "identidad", "animación", "key visual", "videos", "presentaciones", "manual de marca"],
    chipClass:
      "border-black text-black hover:border-brand-primary-main hover:text-brand-primary-main",
  },
  {
    title: "Paid Media",
    description:
      "Visibilidad digital: creamos campañas estratégicas que maximizan la presencia y performance de tus anuncios.",
    bg: "bg-brand-primary-main",
    textColor: "text-brand-white",
    descColor: "text-brand-white",
    chips: ["anuncios","campañas","KPI's","performance","data","objetivos","roi/roas","optimización","metricas","posicionamiento"],
  },
  {
    title: "Social\nContent",
    description:
      "Transformamos tu estrategia en contenido relevante y coherente, capaz de atraer resultados, fidelizar y generar interacción con tu comunidad digital.",
    bg: "bg-brand-accent-01",
    textColor: "text-brand-white",
    descColor: "text-brand-white",
    chips: ["gestión", "moderación", "estrategia para redes", "storytelling","diseño","performance orgánica"],
  },
  {
    title: "SEO IA",
    description:
      "Optimizamos tu presencia orgánica y en buscadores impulsados por IA para que tu marca aparezca antes que tu competencia.",
    bg: "bg-black",
    textColor: "text-brand-white",
    descColor: "text-brand-white",
    chips: ["keywords", "llms", "ia", "sitemap","robots","estructura","posicionamiento","contenido","blogs"],
  },
  {
    title: "Producto",
    description:
      "Estrategia & usabilidad: Diseñamos y construimos productos que combinan visión de negocio, diseño centrado en el usuario y desarrollo sólido.",
    bg: "bg-brand-white",
    textColor: "text-brand-black",
    descColor: "text-brand-black",
    chips: ["desarrollo web", "prototipo", "esquema", "ux","ui","desarrollo producto","apps","cm's","negocio"],
    chipClass:
      "border-black text-black hover:border-brand-primary-main hover:text-brand-primary-main",
  },
]

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

export function ServicesFullScreen() {
  return (
    <>
      {services.map((service) => (
        <motion.section
          key={service.title}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={`relative min-h-screen flex flex-col justify-center overflow-hidden ${service.bg}`}
        >
          <div className="container relative mx-auto px-6 py-24 flex flex-col justify-center flex-1">
            <motion.h3
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`font-display font-normal leading-[0.85] -tracking-[0.04em] whitespace-pre-line text-[clamp(5rem,13vw,250px)] ${service.textColor}`}
            >
              {service.title}
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap gap-3 mt-8 md:mt-12 max-w-lg"
            >
              {service.chips.map((chip) => (
                <Chip key={chip} variant="outline" className={service.chipClass}>
                  {chip}
                </Chip>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`pt-6 text-xl md:text-xl font-display font-thin max-w-lg md:absolute md:bottom-[10%] md:right-0 md:text-right ${service.descColor}`}
            >
              {service.description}
            </motion.p>
          </div>
        </motion.section>
      ))}
    </>
  )
}
