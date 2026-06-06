"use client"

import { motion } from "framer-motion"
import Image from "next/image"

type Client = {
  name: string
  image: string
}

const clients: Client[] = [
  { name: "H Basadores", image: "/clients/cliente-hbasadores.png" },
  { name: "Intrepid", image: "/clients/cliente-intrepid.png" },
  { name: "Legal Meet", image: "/clients/cliente-legalmeet.png" },
  { name: "Simón", image: "/clients/cliente-simon.png" },
  { name: "Melon Help", image: "/clients/cliente-melonhelp.png" },
  { name: "Latin Cloud", image: "/clients/cliente-latincloud.png" },
  { name: "Arcadia", image: "/clients/cliente-arcadia.png" },
  { name: "United T Experience", image: "/clients/cliente-unitedTexperience.png" },
  { name: "Planexware", image: "/clients/cliente-planexware.png" },
  { name: "Prusia", image: "/clients/cliente-prusia.png" },
  { name: "Tienda Nube", image: "/clients/cliente-tiendanube.png" },
  { name: "Devra", image: "/clients/cliente-devra.png" },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export function ClientsSection() {
  return (
    <section className="py-24 relative">
      <div className="text-center container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="block text-xl uppercase text-brand-white mb-12"
        >
          nuestra huella
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 md:gap-12 items-center"
        >
          {clients.map((client) => (
            <motion.div
              key={client.name}
              variants={itemVariants}
              className="flex items-center justify-center border rounded-sm border-black hover:border-white hover:rounded-xl  hover:shadow-[0_0_24px_-8px_rgba(255,255,255,1)] transition-all duration-300 ease-in-out"
            >
              <Image
                src={client.image}
                alt={client.name}
                width={160}
                height={80}
                className="w-full h-auto max-h-12 md:max-h-16 object-contain opacity-50 hover:opacity-100 hover:scale-[1.03] transition-all duration-300 ease-in-out"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
