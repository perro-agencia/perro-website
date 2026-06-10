"use client"

import { motion } from "framer-motion"
import { ServiceCard, type Service } from "@/components/ui/ServiceCard"

const services: Service[] = [
  {
    title: "Paid Media & SEO",
    image: "/services/paid-media/phone.png",
    description:
      "Visibilidad digital: creamos campañas estratégicas que maximizan la presencia y performance de tus anuncios.",
    bg: "bg-brand-primary-main",
    textColor: "text-brand-white",
    shadowColor: "#885de3",
    gradientFrom: "#885de3",
    gradientTo: "#6b3fc9",
    floatingIcons: [
      "/services/paid-media/icon-01.png",
      "/services/paid-media/icon-02.png",
      "/services/paid-media/icon-03.png",
      "/services/paid-media/icon-04.png",
    ],
  },
  {
    title: "Producto",
    image: "/services/product/phone.png",
    description:
      "Estrategia & usabilidad: Diseñamos y construimos productos que combinan visión de negocio, diseño centrado en el usuario y desarrollo sólido.",
    bg: "bg-brand-white",
    textColor: "text-brand-black",
    shadowColor: "#ffffff",
    gradientFrom: "#ffffff",
    gradientTo: "#c5c5c5ff",
    floatingIcons: [
      "/services/product/icon-01.png",
      "/services/product/icon-02.png",
      "/services/product/icon-03.png",
    ],
  },
  {
    title: "Design",
    image: "/services/design/phone.png",
    description:
      "No hacemos logos, creamos marcas únicas. Le damos identidad a tu negocio y su propia historia.",
    bg: "bg-brand-accent-02",
    textColor: "text-brand-black",
    shadowColor: "#c4f875",
    gradientFrom: "#c4f875",
    gradientTo: "#73983fff",
    floatingIcons: [
      "/services/design/icon-02.png",
      "/services/design/icon-03.png",
      "/services/design/icon-01.png",
    ],
  },
  {
    title: "Social Content",
    image: "/services/social-content/phone.png",
    description:
      "Transformamos tu estrategia en contenido relevante y coherente, capaz de atraer resultados, fidelizar y generar interacción con tu comunidad digital.",
    bg: "bg-brand-accent-01",
    textColor: "text-brand-white",
    shadowColor: "#de4a27",
    gradientFrom: "#de4a27",
    gradientTo: "#732513ff",
    floatingIcons: [
      "/services/social-content/icon-01.png",
      "/services/social-content/icon-02.png",
      "/services/social-content/icon-03.png",
    ],
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

export function ServicesSectionV2() {
  return (
    <section className="py-24 md:py-32 relative">
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
          className="font-display font-light leading-[0.95] -tracking-[0.03em] text-[clamp(2.5rem,8vw,6rem)] mb-16 md:mb-20"
        >
          Soluciones que potencian el crecimiento de tu negocio
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-wrap gap-6 max-w-[1100px] mx-auto"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              noImageHoverScale
              className="w-full md:w-[calc(40%-0.75rem)] md:grow md:hover:grow-[16] md:transition-all md:duration-700 md:ease-in-out"
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
