"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
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
    <svg
      width="124"
      height="40"
      viewBox="0 0 124 40"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_553_36)">
        <path d="M0 0.802141H6.03449V4.68166H6.14639C7.04058 3.01886 8.28776 1.82726 9.88997 1.10685C11.4912 0.386442 13.2236 0.0262375 15.0872 0.0262375C17.3588 0.0262375 19.3425 0.423774 21.0383 1.21784C22.7331 2.01291 24.14 3.10261 25.257 4.48793C26.3749 5.87326 27.2132 7.48964 27.7717 9.33707C28.3302 11.1845 28.6099 13.1611 28.6099 15.2668C28.6099 17.1879 28.3586 19.0545 27.8551 20.8646C27.3526 22.6747 26.5886 24.273 25.5642 25.6583C24.5388 27.0436 23.2458 28.1525 21.6812 28.9839C20.1167 29.8153 18.2723 30.231 16.1493 30.231C15.2175 30.231 14.2856 30.1482 13.3558 29.9817C12.424 29.8153 11.5298 29.5469 10.6733 29.1786C9.81571 28.8093 9.02528 28.3381 8.29793 27.765C7.57159 27.1929 6.9653 26.5179 6.48209 25.742H6.37019V40.0402H0V0.802141ZM22.2387 15.1558C22.2387 13.8633 22.0708 12.6062 21.7362 11.3873C21.4005 10.1685 20.8979 9.08786 20.2275 8.14547C19.5572 7.20309 18.7189 6.44636 17.7128 5.87326C16.7067 5.30117 15.5521 5.01462 14.249 5.01462C11.5664 5.01462 9.54613 5.93884 8.18603 7.78527C6.82593 9.6327 6.14639 12.0896 6.14639 15.1558C6.14639 16.5967 6.32238 17.9366 6.67741 19.1736C7.03142 20.4116 7.56142 21.473 8.26945 22.3599C8.97645 23.2468 9.82385 23.9491 10.8116 24.4657C11.7984 24.9833 12.9438 25.2416 14.248 25.2416C15.7007 25.2416 16.9305 24.9459 17.9356 24.3547C18.9417 23.7644 19.7698 22.9966 20.4218 22.0552C21.0729 21.1128 21.5398 20.0423 21.8186 18.8406C22.0983 17.6399 22.2377 16.412 22.2377 15.1548L22.2387 15.1558Z" />
        <path d="M36.71 16.7631C36.71 17.8719 36.8677 18.9435 37.1851 19.9777C37.5015 21.0129 37.9755 21.9169 38.6103 22.6928C39.243 23.4687 40.0436 24.0883 41.0131 24.5494C41.9816 25.0115 43.1362 25.2425 44.4769 25.2425C46.3396 25.2425 47.838 24.846 48.9753 24.0509C50.1116 23.2569 50.959 22.0653 51.5175 20.4761H57.552C57.2163 22.0279 56.6385 23.4132 55.8196 24.6331C54.9996 25.853 54.0119 26.8781 52.8583 27.7095C51.7037 28.5409 50.4087 29.1695 48.9753 29.5942C47.541 30.019 46.0415 30.2319 44.4769 30.2319C42.2043 30.2319 40.1932 29.8626 38.4424 29.1241C36.6907 28.3855 35.2106 27.3503 34 26.0204C32.7894 24.6906 31.8769 23.1025 31.2625 21.254C30.6481 19.4066 30.3409 17.3745 30.3409 15.1578C30.3409 13.1267 30.6664 11.1955 31.3185 9.36627C31.9695 7.537 32.9013 5.9297 34.1119 4.54437C35.3225 3.15905 36.7843 2.06027 38.4984 1.24704C40.2115 0.432794 42.1484 0.0261765 44.3091 0.0261765C46.5807 0.0261765 48.6203 0.497369 50.428 1.43975C52.2347 2.38214 53.7331 3.62923 54.9264 5.18104C56.1187 6.73284 56.9844 8.51571 57.5245 10.5286C58.0637 12.5425 58.2041 14.621 57.9437 16.7631H36.71ZM51.5735 12.6061C51.4982 11.6082 51.2846 10.6487 50.9305 9.72446C50.5765 8.80125 50.0923 7.9981 49.4779 7.31401C48.8634 6.63094 48.1178 6.07701 47.2429 5.65122C46.367 5.22644 45.3894 5.01355 44.3091 5.01355C43.2287 5.01355 42.1759 5.20727 41.2634 5.59573C40.3498 5.98317 39.5676 6.51995 38.9165 7.20303C38.2644 7.88711 37.7426 8.69026 37.3519 9.61347C36.9613 10.5377 36.7456 11.5346 36.709 12.6061H51.5724H51.5735Z" />
        <path d="M59.9813 0.853639H66.1053V6.53014H66.2193C66.4095 5.73507 66.7818 4.96017 67.3352 4.20243C67.8876 3.4457 68.5559 2.75455 69.3382 2.12999C70.1195 1.50544 70.9883 1.00398 71.9425 0.62561C72.8957 0.248253 73.8692 0.0575562 74.861 0.0575562C75.624 0.0575562 76.1489 0.0767267 76.4348 0.114059C76.7206 0.1524 77.0156 0.190741 77.3218 0.227064V6.32229C74.0086 6.00245 72.3707 6.40604 71.3982 6.84091C70.4247 7.27678 69.5753 7.9195 68.851 8.77108C68.1256 9.62266 67.5529 10.673 67.1338 11.9221C66.7137 13.1712 66.5041 14.61 66.5041 16.2365V30.2017H59.9793V0.853639H59.9813Z" />
        <path d="M79.2711 30.1533V0.748661H85.7959V3.01079H88.983V0H96.5943V6.32225H88.983V9.03438H85.7959V30.1543H79.2711V30.1533Z" />
        <path d="M102.706 30.2027V27.1919H99.6709V24.1811H96.6353V6.07203H99.6709V3.06125H102.706V0.0494537H117.928V3.06024H120.963V6.07103H123.999V24.1801H120.963V27.1909H117.928V30.2017H102.706V30.2027ZM114.871 24.1811V21.1704H117.928V9.08383H114.871V6.07304H105.742V9.08383H102.706V21.1704H105.742V24.1811H114.871Z" />
      </g>
      <defs>
        <clipPath id="clip0_553_36">
          <rect width="124" height="40" />
        </clipPath>
      </defs>
    </svg>
  )
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

export function Nav() {
  const [isOpen, setIsOpen] = useState(false)
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
              ? "mx-auto mt-4 max-w-[90vw] md:max-w-[1000px] bg-brand-black/70 backdrop-blur-xl border border-brand-white/10 shadow-xl rounded-full px-6"
              : "bg-brand-black/80 backdrop-blur-md border border-transparent"
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
                className="text-brand-white transition-colors duration-200 hover:text-brand-primary-main"
              >
                <Logo className="h-6 w-auto" />
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
                    className={cn(
                      "text-lg tracking-wide uppercase transition-all duration-200 text-brand-white hover:underline underline-offset-4 decoration-brand-accent-02 hover:text-brand-accent-02",
                      pathname === link.href && "text-brand-accent-02"
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
                <Button href="/contacto" variant="cta">
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
                  className={cn(
                    "text-2xl tracking-wide uppercase transition-all duration-200 text-brand-white hover:underline underline-offset-4 decoration-brand-accent-02 hover:text-brand-accent-02",
                    pathname === link.href && "text-brand-accent-02"
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
              <Button href="/contacto" variant="cta" className="mt-4">
                Contacto
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
