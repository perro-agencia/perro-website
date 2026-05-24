"use client"

import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Chip } from "@/components/ui/Chip"

const containerVariants = {
  initial: { x: 0 },
  hover: {
    x: 2,
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
}

const arrowVariants = {
  initial: { x: 0, y: 0 },
  hover: {
    x: [0, 16, -16, 0],
    y: [0, -16, 16, 0],
    transition: { duration: 0.5, ease: "easeInOut" as const },
  },
}

const keywords = [
  "websites", "marketing", "motion", "diseño", "producto",
  "creatividad", "seo", "paid media", "desarrollo", "social media",
]

const headlineWords = ["Lleva", "tu", "marca", "al", "siguiente"]

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
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [isHovered, setIsHovered] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      setStatus("success")
      form.reset()
    } else {
      setStatus("error")
    }
  }

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
            <h2 className="font-display font-regular leading-[0.95] -tracking-[0.03em] text-[clamp(4rem,8vw,6rem)] mb-8">
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
              className="flex flex-wrap gap-3"
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
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerVariants(0.08)}
            >
              <motion.div variants={itemVariants}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="NOMBRE"
                  required
                  className="w-full px-6 py-4 bg-brand-black border border-brand-white rounded-full placeholder:text-brand-white text-brand-white uppercase text-sm focus:outline-none hover:border-brand-accent-02 transition-all hover:shadow-[0_0_24px_-4px_#c4f875]"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="COMPAÑÍA"
                  className="w-full px-6 py-4 bg-brand-black border border-brand-white rounded-full placeholder:text-brand-white text-brand-white uppercase text-sm focus:outline-none hover:border-brand-accent-02 transition-all hover:shadow-[0_0_24px_-4px_#c4f875]"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="CORREO"
                  required
                  className="w-full px-6 py-4 bg-brand-black border border-brand-white rounded-full placeholder:text-brand-white text-brand-white uppercase text-sm focus:outline-none hover:border-brand-accent-02 transition-all hover:shadow-[0_0_24px_-4px_#c4f875]"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <textarea
                  id="message"
                  name="message"
                  placeholder="MENSAJE"
                  rows={5}
                  required
                  className="w-full px-6 py-4 bg-brand-black border border-brand-white rounded-3xl placeholder:text-brand-white text-brand-white uppercase text-sm focus:outline-none hover:border-brand-accent-02 transition-all hover:shadow-[0_0_24px_-4px_#c4f875] resize-none"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={cn(
                    "group inline-flex items-center gap-2 transition-all duration-200",
                    "py-2 pl-6 pr-3",
                    "border-2 border-brand-white bg-brand-white rounded-full",
                    "text-md font-display uppercase tracking-wide leading-none text-brand-black font-medium",
                    "hover:bg-brand-black hover:text-brand-white",
                    "ease-brand-bounce",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  <span>{status === "sending" ? "ENVIANDO..." : "ENVIAR"}</span>
                  <motion.span
                    aria-hidden="true"
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-brand-black group-hover:bg-brand-white transition-colors mb-[2px] overflow-hidden"
                    animate={isHovered ? "hover" : "initial"}
                    variants={containerVariants}
                  >
                    <motion.svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-current text-white group-hover:text-brand-black transition-colors"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      animate={isHovered ? "hover" : "initial"}
                      variants={arrowVariants}
                    >
                      <path d="M9 5V7H15.59L4 18.59L5.41 20L17 8.41V15H19V5H9Z" />
                    </motion.svg>
                  </motion.span>
                </button>
              </motion.div>

              {status === "success" && (
                <p role="alert" className="text-brand-accent-02 text-sm">
                  Mensaje enviado correctamente. Te responderemos pronto.
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="text-brand-accent-01 text-sm">
                  Hubo un error al enviar el mensaje. Intentá de nuevo.
                </p>
              )}
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
