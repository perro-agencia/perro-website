"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const sitemapLinks = [
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
]

const socialLinks = [
  { href: "https://www.instagram.com/perroagency/", label: "Instagram" },
  { href: "https://www.linkedin.com/company/perroagency/", label: "Linkedin" },
]

const linkHoverStyle = "transition-all duration-200 hover:text-brand-accent-02 hover:underline underline-offset-2"

export function Footer() {
  return (
    <footer>
      <div className="bg-black w-full max-w-[1500px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="hidden md:block"
        >
          <Image
            src="/miscelaneous/perro-logo-cut-white.svg"
            alt="PERRO Agency logo"
            width={268}
            height={352}
            className="w-full h-auto"
          />
              
        </motion.div>
      </div>

      <div className="bg-white mx-auto px-6 py-16 md:py-24">
        <div className="container md:mx-auto flex flex-col items-center text-center md:text-left">
          <div className="flex flex-col items-start text-start md:flex-row justify-between w-full gap-12 md:gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-5xl max-w-md font-display text-brand-black">
                Perro que ladra, muerde
              </h2>
              <div className="flex flex-col gap-2 text-brand-black/60">
                <Link
                  href="/contacto"
                  aria-label="Enviar un correo a PERRO Agency"
                  className={linkHoverStyle}
                >
                  queonda@perroagency.com
                </Link>
                <a
                  href="https://wa.me/541124058394"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contactar por WhatsApp a PERRO Agency"
                  className={linkHoverStyle}
                >
                  +541124058394
                </a>
              </div>
            </div>

            <div className="flex flex-row items-start justify-between gap-8 md:flex-1 md:justify-end md:gap-24">
              <nav aria-label="Sitemap" className="flex flex-col gap-4">
                <span className="text-sm tracking-wider text-brand-black font-medium">
                  Sitemap:
                </span>
                <div className="flex flex-col gap-2">
                  {sitemapLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-brand-black/60 ${linkHoverStyle}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>

              <nav aria-label="Redes sociales" className="flex flex-col gap-4">
                <span className="text-sm tracking-wider text-brand-black font-medium">
                  Seguinos:
                </span>
                <div className="flex flex-col gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-brand-black/60 ${linkHoverStyle}`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </nav>

              <div className="flex items-center">
                <Image
                  src="/miscelaneous/perro-pista.png"
                  alt=""
                  width={268}
                  height={352}
                  className="h-32 w-auto"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 mt-16 pt-8 border-t border-brand-black/10">
            <p className="text-sm text-brand-black">
              <span className="font-medium">&copy; PERRO Agency {new Date().getFullYear()}.</span>{" "}
              Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/legal/politicas-de-privacidad"
                className={`text-brand-black ${linkHoverStyle}`}
              >
                Políticas de privacidad
              </Link>
              <Link
                href="/legal/terminos-y-condiciones"
                className={`text-brand-black ${linkHoverStyle}`}
              >
                Términos y condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
