"use client"

import { motion } from "framer-motion"
import { TeamCard } from "@/components/ui/TeamCard"

const teamMembers = [
  { name: "Sebastián Konig", role: "Ceo - Founder\nMarketing Director", image: "/team/profile-seba.png", bg: "bg-brand-primary-main" as const, textColor: "text-brand-white" as const },
  { name: "Federico Gilles", role: "Founder\nProduct Design Director", image: "/team/profile-fede.png", bg: "bg-brand-accent-02" as const, textColor: "text-brand-black" as const },
  { name: "Luz Saltalamachia", role: "Project Manager\n& Copywriter", image: "/team/profile-luchi.png", bg: "bg-brand-accent-01" as const, textColor: "text-brand-white" as const },
  { name: "Sebastián Lugo", role: "Paid Media Lead", image: "/team/profile-sebalugo.png", bg: "bg-brand-black" as const, textColor: "text-brand-white" as const },
  { name: "Emiliano Mario Elias", role: "Multimedia Designer", image: "/team/profile-emielias.png", bg: "bg-brand-accent-01" as const, textColor: "text-brand-white" as const },
  { name: "Lucia Gallo", role: "Lead\nGraphic Designer", image: "/team/profile-lu.png", bg: "bg-brand-black" as const, textColor: "text-brand-white" as const },
  { name: "Sergio Ruestes", role: "Head of production", image: "/team/profile-sergio.png", bg: "bg-brand-primary-main" as const, textColor: "text-brand-white" as const },
  { name: "Bianca Olivetto", role: "Social Media Manager & CM", image: "/team/profile-bian.png", bg: "bg-brand-accent-02" as const, textColor: "text-brand-black" as const },
]

export function NosotrosContent() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 relative min-h-screen flex flex-col justify-center overflow-hidden"
      >
        <div className="pb-8 md:pb-0 flex flex-col justify-center md:flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-display font-light leading-[0.85] -tracking-[0.04em] text-[clamp(2.5rem,12vw,250px)] text-brand-black"
          >
            Un equipo. <br /> Una manada.
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-display font-light md:pb-16 text-base md:text-lg max-w-sm md:absolute md:bottom-[10%] md:right-10 md:text-left text-brand-black/70"
        >Especialistas en Marketing, Diseño & Desarrollo, unidos por el instinto de hacer crcecer marcas.</motion.p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-24 md:py-32"
      >
        <div className="max-w-[1440px] mx-auto px-6">
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-6"
          >
            {teamMembers.map((m) => (
              <TeamCard key={m.name} {...m} />
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="block text-xl uppercase text-brand-black mb-6 tracking-wide"
          >
            nuestra misión
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="font-display font-light leading-[0.95] -tracking-[0.03em] text-[clamp(2.5rem,8vw,8rem)] text-brand-black max-w-7xl mx-auto"
          >
            Convertimos ideas audaces en resultados reales
          </motion.h2>
        </div>
      </motion.section>
    </>
  )
}
