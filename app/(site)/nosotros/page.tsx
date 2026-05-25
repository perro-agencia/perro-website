"use client"

import { motion } from "framer-motion"
import { Banner } from "@/components/ui/Banner"
import { TeamCard } from "@/components/ui/TeamCard"

export default function NosotrosPage() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-[1500px] mx-auto relative min-h-screen flex flex-col justify-center overflow-hidden"
      >
        <div className="container mx-auto px-6 flex flex-col justify-center flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-display font-light leading-[0.85] -tracking-[0.04em] text-[clamp(2.5rem,12vw,250px)] text-white"
          >
            Un equipo. <br /> Una manada.
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-display font-light container mx-auto px-6 pb-12 md:pb-16 text-base md:text-lg max-w-xl md:absolute md:bottom-[10%] md:right-10 md:text-right text-white"
        >
          Somos un equipo multidisciplinario apasionado por crear experiencias digitales que dejan huella.
        </motion.p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-24 md:py-32"
      >
        <div className="container mx-auto px-6">
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-8"
          >
            <TeamCard
              name="Sergio"
              role="CEO & Fundador"
              image="/team/profile-sergio.png"
              bg="bg-brand-primary-main"
              textColor="text-white"
            />
            <TeamCard
              name="Sebastián Lugo"
              role="Director Creativo"
              image="/team/profile-sebalugo.png"
              bg="bg-brand-accent-01"
              textColor="text-white"
            />
            <TeamCard
              name="Sebastián"
              role="Desarrollador"
              image="/team/profile-seba.png"
              bg="bg-brand-accent-02"
              textColor="text-black"
            />
            <TeamCard
              name="Luciana"
              role="Diseñadora UX/UI"
              image="/team/profile-luchi.png"
              bg="bg-brand-white"
              textColor="text-black"
            />
            <TeamCard
              name="Lucía"
              role="Content Manager"
              image="/team/profile_lu.png"
              bg="bg-brand-primary-main"
              textColor="text-white"
            />
            <TeamCard
              name="Federico"
              role="Desarrollador"
              image="/team/profile-fede.png"
              bg="bg-brand-accent-01"
              textColor="text-white"
            />
            <TeamCard
              name="Emiliano"
              role="Marketing Digital"
              image="/team/profile-Emi.png"
              bg="bg-brand-accent-02"
              textColor="text-black"
            />
            <TeamCard
              name="Bianca"
              role="Diseñadora Gráfica"
              image="/team/profile-bian.png"
              bg="bg-brand-white"
              textColor="text-black"
            />
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
            className="block text-xl uppercase text-white mb-6 tracking-wide"
          >
            nuestra misión
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="font-display font-light leading-[0.95] -tracking-[0.03em] text-[clamp(2.5rem,8vw,8rem)] text-white max-w-8xl mx-auto"
          >
            Convertimos ideas audaces en resultados reales
          </motion.h2>
        </div>
      </motion.section>

      <section className="py-24 px-6">
        <Banner
          title="¿Empezamos con tu proyecto?"
          buttonText="Contacto"
          buttonHref="/contacto"
        />
      </section>
    </>
  )
}
