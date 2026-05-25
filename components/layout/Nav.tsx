"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"

const links = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/portfolio", label: "Proyectos" },
  { href: "/blog", label: "Blog" },
]

function Logo({ className }: { className?: string }) {
  return (
    <>  </>
  )
}

type NavProps = {
  logoSrc?: string
  logoHoverSrc?: string
  linkColor?: string
  linkHoverColor?: string
  buttonColorScheme?: "default" | "primary" | "accent" | "dark"
}

function HamburgerButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="md:hidden relative w-6 h-5 text-brand-white hover:text-brand-accent-02 transition-colors duration-200"
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    >
      <span
        className={cn(
          "absolute left-0 top-0 w-full h-0.5 bg-current rounded-full transition-all duration-300",
          isOpen && "top-1/2 -translate-y-1/2 rotate-45"
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-1/2 w-full h-0.5 bg-current -translate-y-1/2 rounded-full transition-all duration-300",
          isOpen && "opacity-0"
        )}
      />
      <span
        className={cn(
          "absolute left-0 bottom-0 w-full h-0.5 bg-current rounded-full transition-all duration-300",
          isOpen && "bottom-1/2 translate-y-1/2 -rotate-45"
        )}
      />
    </button>
  )
}

export function Nav({
  logoSrc = "/brand/isologotipo-white.svg",
  logoHoverSrc,
  linkColor = "text-brand-white",
  linkHoverColor = "#c4f875",
  buttonColorScheme,
}: NavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [logoHover, setLogoHover] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const showScrolled = scrolled && !isOpen

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-2">
        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            showScrolled
              ? "mx-auto mt-4 max-w-[90vw] md:max-w-[800px] lg:max-w-[1200px] bg-brand-black/40 backdrop-blur-xl border border-brand-white/10 shadow-xl rounded-full px-6 md:pr-4"
              : " border border-transparent"
          )}
        >
          <div className={cn(
            "flex items-center justify-between h-16 md:h-20",
            !showScrolled && "container mx-auto px-6"
          )}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <Link
                href="/"
                aria-label="Ir al inicio"
                className="block text-brand-white transition-colors duration-200 hover:text-brand-primary-main"
                onMouseEnter={() => setLogoHover(true)}
                onMouseLeave={() => setLogoHover(false)}
              >
                {logoSrc ? (
                  <div className="relative h-6 w-[124px]">
                    <Image
                      src={logoSrc}
                      alt="PERRO Agency logo"
                      fill
                      className={`object-left object-contain transition-opacity duration-300 ease-in-out ${logoHover && logoHoverSrc ? "opacity-0" : "opacity-100"}`}
                    />
                    {logoHoverSrc && (
                      <Image
                        src={logoHoverSrc}
                        alt="PERRO Agency logo"
                        fill
                        className={`object-left object-contain transition-opacity duration-300 ease-in-out ${logoHover ? "opacity-100" : "opacity-0"}`}
                      />
                    )}
                  </div>
                ) : (
                  <Logo className="h-6 w-auto" />
                )}
              </Link>
            </motion.div>

            <nav className="hidden md:flex items-center gap-8">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    style={{ "--link-hover": linkHoverColor } as React.CSSProperties}
                    className={cn(
                      `text-lg tracking-wide uppercase transition-all duration-200 ${linkColor} hover:underline underline-offset-4 decoration-current hover:text-[var(--link-hover)]`,
                      pathname === link.href && `text-[var(--link-hover)] underline`
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + links.length * 0.08 }}
                className="hidden md:block"
              >
                <Button href="/contacto" variant="cta" colorScheme={buttonColorScheme}>
                  Contacto
                </Button>
              </motion.div>
              <HamburgerButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="navigation"
            aria-label="Menú mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-brand-black/70 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link
                  href={link.href}
                  style={{ "--link-hover": linkHoverColor } as React.CSSProperties}
                  className={cn(
                    `text-2xl tracking-wide uppercase transition-all duration-200 ${linkColor} hover:underline underline-offset-4 decoration-current hover:text-[var(--link-hover)]`,
                    pathname === link.href && "text-[var(--link-hover)]"
                  )}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Button href="/contacto" variant="cta" className="mt-4" colorScheme={buttonColorScheme}>
                Contacto
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
