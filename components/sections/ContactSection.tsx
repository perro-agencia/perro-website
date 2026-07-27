"use client"

import { motion } from "framer-motion"
import { Chip } from "@/components/ui/Chip"
import { ContactForm } from "@/components/forms/ContactForm"

const keywords = [
  "websites", "marketing", "motion", "diseño", "producto",
  "creatividad", "seo", "paid media", "desarrollo", "social media",
]

const headlineWords = ["Llevá", "tu", "marca", "al", "siguiente"]

const staggerVariants = (stagger: number) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger },
  },
})

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

export function ContactSection() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="container mx-auto px-6">
        <motion.div
          className="grid gap-12 md:grid-cols-2 md:gap-16 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerVariants(0.15)}
        >
          <motion.div variants={itemVariants}>
            <h2 className="font-display font-normal leading-[0.95] -tracking-[0.03em] text-[clamp(4rem,8vw,6rem)] mb-8">
              {headlineWords.map((word) => (
                <motion.span
                  key={word}
                  className="inline-block mr-[0.15em]"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <span className="text-brand-primary-main">niv<span className="italic">e</span>l</span>
              </motion.span>
            </h2>
            <motion.div
              className="hidden md:flex flex-wrap gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerVariants(0.05)}
            >
              {keywords.map((word) => (
                <motion.div key={word} variants={itemVariants}>
                  <Chip variant="outline">
                    {word}
                  </Chip>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <ContactForm showCompany={true} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
