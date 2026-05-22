import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-brand-white/10 py-12 mt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-display text-lg">
            PERRO
          </Link>
          <p className="text-sm text-brand-white/40">
            &copy; {new Date().getFullYear()} PERRO. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
