"use client"

import { motion } from "framer-motion"
import { ServiceCard, type Service } from "@/components/ui/ServiceCard"

const brandColors: Record<string, string> = {
  "bg-brand-primary-main": "#885de3",
  "bg-brand-accent-01": "#de4a27",
  "bg-brand-accent-02": "#c4f875",
  "bg-brand-white": "#f5f5f0",
}

const services: Service[] = [
  {
    title: "Paid Media & SEO",
    image: "/services/paid-media/phone.png",
    description:
      "Visibilidad digital: creamos campañas estratégicas que maximizan la presencia y performance de tus anuncios.",
    bg: "bg-brand-primary-main",
    textColor: "text-brand-white",
    shadowColor: brandColors["bg-brand-primary-main"],
    floatingIcons: [
      "/services/paid-media/icon-01.png",
      "/services/paid-media/icon-02.png",
      "/services/paid-media/icon-03.png",
      "/services/paid-media/icon-04.png",
    ],
  },
  {
    title: "Producto",
    image: "/services/service-product.png",
    description:
      "Estrategia & usabilidad: diseñamos y construimos productos que combinan visión de negocio, diseño centrado en el usuario y desarrollo sólido.",
    bg: "bg-brand-white",
    textColor: "text-brand-black",
    shadowColor: brandColors["bg-brand-white"],
  },
  {
    title: "Design",
    image: "/services/service-design.png",
    description:
      "No hacemos logos, creamos marcas únicas. Le damos identidad a tu negocio y su propia historia.",
    bg: "bg-brand-accent-02",
    textColor: "text-brand-black",
    shadowColor: brandColors["bg-brand-accent-02"],
  },
  {
    title: "Social Content",
    image: "/services/service-social.png",
    description:
      "Transformamos tu estrategia en contenido relevante y coherente, capaz de atraer resultados, fidelizar y generar interacción con tu comunidad digital.",
    bg: "bg-brand-accent-01",
    textColor: "text-brand-white",
    shadowColor: brandColors["bg-brand-accent-01"],
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

export function ServicesSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="block text-xl uppercase text-brand-white mb-6"
        >
          nuestros servicios
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="font-display font-light leading-[0.95] -tracking-[0.03em] text-[clamp(2.5rem,8vw,6rem)]  mb-16 md:mb-20"
        >
          Soluciones que potencian el crecimiento de tu negocio
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-x-4 gap-y-8 md:grid-cols-2 max-w-[1100px] mx-auto justify-items-center"
        >
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
