import Link from "next/link"
import { Navigation } from "./Navigation"
import { Button } from "@/components/ui/Button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" aria-label="Ir al inicio" className="text-display-md font-display">
          PERRO
        </Link>
        <div className="flex items-center gap-6">
          <Navigation />
          <Button href="/contacto">Contacto</Button>
        </div>
      </div>
    </header>
  )
}
