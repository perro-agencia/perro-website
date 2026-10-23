"use client"

import { useEffect } from "react"
import { Nav } from "@/components/layout/Nav"
import { Button } from "@/components/ui/Button"

export default function ErrorPage({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <>
      <Nav />
      <section className="min-h-screen flex items-center justify-center py-24">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <p className="font-display font-light leading-none -tracking-[0.03em] text-[clamp(5rem,20vw,250px)] text-brand-white">
            500
          </p>
          <h1 className="font-display font-light text-display-md text-brand-white mt-4">
            Algo salió mal.
          </h1>
          <p className="text-brand-white/70 text-lg mt-4">
            Tuvimos un problema al cargar esta página. Probá de nuevo en unos minutos.
          </p>
          <div className="mt-10 flex justify-center">
            <Button href="/">Volver al inicio</Button>
          </div>
        </div>
      </section>
    </>
  )
}
