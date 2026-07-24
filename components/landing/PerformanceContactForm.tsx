"use client"

import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

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

export type FieldType = "text" | "email" | "textarea" | "select"

export interface FieldConfig {
  name: string
  type: FieldType
  label: string
  required?: boolean
  options?: string[]
}

interface PerformanceContactFormProps {
  service: string
  fields: FieldConfig[]
  successMessage?: string
}

export function PerformanceContactForm({
  service,
  fields,
  successMessage = "Gracias por completar el formulario. Revisaremos la información y te contactaremos pronto.",
}: PerformanceContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [isHovered, setIsHovered] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")

    const form = e.currentTarget
    const data: Record<string, string> = { service }

    for (const field of fields) {
      const el = form.elements.namedItem(field.name)
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
        data[field.name] = el.value
      }
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
    <section className="w-full max-w-[560px]">
      <div>
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerVariants(0.08)}
        >
          {fields.map((field) => (
            <motion.div key={field.name} variants={itemVariants}>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  placeholder={field.label.toUpperCase()}
                  rows={5}
                  required={field.required}
                  className="w-full px-6 py-4 bg-brand-black border border-brand-white rounded-3xl placeholder:text-brand-white text-brand-white uppercase text-sm focus:outline-none hover:border-brand-accent-02 transition-all hover:shadow-[0_0_24px_-4px_#c4f875] resize-none"
                />
              ) : field.type === "select" ? (
                <select
                  name={field.name}
                  required={field.required}
                  defaultValue=""
                  className="w-full px-6 py-4 bg-brand-black border border-brand-white rounded-full text-brand-white uppercase text-sm focus:outline-none hover:border-brand-accent-02 transition-all hover:shadow-[0_0_24px_-4px_#c4f875] appearance-none"
                >
                  <option value="" disabled className="text-brand-black">
                    {field.label.toUpperCase()}
                  </option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt} className="text-brand-black">
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.label.toUpperCase()}
                  required={field.required}
                  className="w-full px-6 py-4 bg-brand-black border border-brand-white rounded-full placeholder:text-brand-white text-brand-white uppercase text-sm focus:outline-none hover:border-brand-accent-02 transition-all hover:shadow-[0_0_24px_-4px_#c4f875]"
                />
              )}
            </motion.div>
          ))}

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
                "text-base font-display uppercase tracking-wide leading-none text-brand-black font-medium",
                "hover:bg-brand-black hover:text-brand-white",
                "ease-brand-bounce",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              <span>{status === "sending" ? "ENVIANDO..." : "SOLICITAR DIAGNÓSTICO"}</span>
              <motion.span
                aria-hidden="true"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-brand-black group-hover:bg-brand-white transition-colors mb-[2px] overflow-hidden"
                animate={isHovered ? "hover" : "initial"}
                variants={containerVariants}
              >
                <motion.svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current text-brand-white group-hover:text-brand-black transition-colors"
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
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              className="text-brand-accent-02 text-sm mt-4"
            >
              {successMessage}
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              className="text-brand-accent-01 text-sm mt-4"
            >
              Hubo un error al enviar el mensaje. Intentá de nuevo.
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  )
}
