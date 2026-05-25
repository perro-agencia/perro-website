"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

type Client = {
  name: string
  image: string
  href: string
}

const clients: Client[] = [
  { name: "H Basadores", image: "/clients/cliente-hbasadores.png", href: "#" },
  { name: "Intrepid", image: "/clients/cliente-intrepid.png", href: "#" },
  { name: "Legal Meet", image: "/clients/cliente-legalmeet.png", href: "#" },
  { name: "Simón", image: "/clients/cliente-simon.png", href: "#" },
  { name: "Melon Help", image: "/clients/cliente-melonhelp.png", href: "#" },
  { name: "Latin Cloud", image: "/clients/cliente-latincloud.png", href: "#" },
  { name: "Arcadia", image: "/clients/cliente-arcadia.png", href: "#" },
  { name: "United T Experience", image: "/clients/cliente-unitedTexperience.png", href: "#" },
  { name: "Planexware", image: "/clients/cliente-planexware.png", href: "#" },
  { name: "Reposarte", image: "/clients/cliente-reposarte.png", href: "#" },
  { name: "Prusia", image: "/clients/cliente-prusia.png", href: "#" },
  { name: "Tienda Nube", image: "/clients/cliente-tiendanube.png", href: "#" },
  { name: "Devra", image: "/clients/cliente-devra.png", href: "#" },
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
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12 items-center"
        >
          {clients.map((client) => (
            <motion.div key={client.name} variants={itemVariants}>
              <Link
                href={client.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center border rounded-sm border-black hover:border-white hover:rounded-xl hover:scale-[1.03] hover:shadow-[0_0_24px_-8px_rgba(255,255,255,1)] transition-all duration-300 ease-in-out"
              >
                <Image
                  src={client.image}
                  alt={client.name}
                  width={160}
                  height={80}
                  className="w-full h-auto max-h-12 md:max-h-16 object-contain opacity-50 hover:opacity-100 transition-opacity duration-300"
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
