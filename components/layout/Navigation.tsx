"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },

]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center gap-8">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm tracking-wide transition-colors hover:text-brand-primary-main",
            pathname === link.href ? "text-brand-primary-main" : "text-brand-white/70"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
