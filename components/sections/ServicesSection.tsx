"use client"

import { motion } from "framer-motion"
import Image from "next/image"

type Service = {
  title: string
  image: string
  description: string
  bg: string
  textColor: string
  shadowColor: string
}

const services: Service[] = [
  {
    title: "Paid Media & SEO",
    image: "/services/service-PaidMedia.png",
    description:
      "Visibilidad digital: creamos campañas estratégicas que maximizan la presencia y performance de tus anuncios.",
    bg: "bg-brand-primary-main",
    textColor: "text-brand-white",
    shadowColor: "#885de3",
  },
  {
    title: "Producto",
    image: "/services/service-product.png",
    description:
      "Estrategia & usabilidad: diseñamos y construimos productos que combinan visión de negocio, diseño centrado en el usuario y desarrollo sólido.",
    bg: "bg-brand-accent-01",
    textColor: "text-brand-white",
    shadowColor: "#de4a27",
  },
  {
    title: "Design",
    image: "/services/service-design.png",
    description:
      "No hacemos logos, creamos marcas únicas. Le damos identidad a tu negocio y su propia historia.",
    bg: "bg-brand-accent-02",
    textColor: "text-brand-black",
    shadowColor: "#c4f875",
  },
  {
    title: "Social Content",
    image: "/services/service-social.png",
    description:
      "Transformamos tu estrategia en contenido relevante y coherente, capaz de atraer resultados, fidelizar y generar interacción con tu comunidad digital.",
    bg: "bg-brand-white",
    textColor: "text-brand-black",
    shadowColor: "#f5f5f0",
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export function ServicesSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="block text-xl uppercase text-brand-white mb-6"
        >
          nuestros servicios
        </motion.span>

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
          className="grid gap-8 md:grid-cols-2 max-w-[1000px] mx-auto"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className={`text-left flex flex-col rounded-3xl transition-shadow duration-300 min-h-[460px] ${service.bg}`}
              style={{ boxShadow: `0 0 0 0 ${service.shadowColor}33` } as React.CSSProperties}
              whileHover={{ boxShadow: `0 0 48px -8px ${service.shadowColor}` }}
              transition={{ duration: 0 }}
            >
              <div className="p-8 md:p-10">
                <h3 className={`text-3xl font-medium font-display mb-2 ${service.textColor}`}>
                  {service.title}
                </h3>
                <p className={`${service.textColor}`}>
                  {service.description}
                </p>
              </div>
              <div className="relative flex-1 min-h-0 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={600}
                  height={400}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
