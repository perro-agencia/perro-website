"use client"

import { motion } from "framer-motion"

export function PortfolioHeader() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-6 relative min-h-[60vh] md:min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <div className="pb-8 md:pb-0 flex flex-col justify-center md:flex-1">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-display font-light leading-[0.85] -tracking-[0.04em] text-[clamp(2.5rem,12vw,250px)] text-brand-white"
        >
          Casos reales.
        </motion.h1>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="font-display font-light md:pb-16 text-base md:text-lg max-w-sm md:absolute md:bottom-[10%] md:right-10 md:text-left text-brand-white/70"
      >
        Casos de estudio de proyectos con clientes reales. Proyectos que nos enorgullecen y reflejan nuestra pasión por el diseño y el desarrollo.
      </motion.p>
    </motion.section>
  )
}
