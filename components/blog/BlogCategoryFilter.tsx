"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import type { Category } from "@/types/sanity"
import { cn } from "@/lib/utils"

interface Props {
  categories: Category[]
  active: string | null
  onChange: (slug: string | null) => void
}

export function BlogCategoryFilter({ categories, active, onChange }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const update = () => setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
    update()
    el.addEventListener("scroll", update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => {
      el.removeEventListener("scroll", update)
      observer.disconnect()
    }
  }, [categories])

  const scrollRight = () => scrollRef.current?.scrollBy({ left: 240, behavior: "smooth" })

  const items: { slug: string | null; title: string }[] = [
    { slug: null, title: "Todas" },
    ...categories.map((c) => ({ slug: c.slug.current, title: c.title })),
  ]

  return (
    <div className="border-b border-brand-white/20 pb-8 mb-12">
      <div className="flex items-center gap-3">
        <div
          ref={scrollRef}
          role="group"
          aria-label="Filtrar notas por categoría"
          className={cn(
            "flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            canScrollRight && "[mask-image:linear-gradient(to_right,#000_80%,transparent)]",
          )}
        >
          {items.map((item) => {
            const isActive = active === item.slug
            return (
              <button
                key={item.slug ?? "all"}
                type="button"
                aria-pressed={isActive}
                onClick={() => onChange(item.slug)}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full border px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-body transition-colors duration-300",
                  isActive
                    ? "border-brand-white bg-brand-white text-brand-black"
                    : "border-brand-white/30 text-brand-white hover:border-brand-white",
                )}
              >
                {item.title}
              </button>
            )
          })}
        </div>

        {canScrollRight && (
          <button
            type="button"
            onClick={scrollRight}
            aria-label="Ver más categorías"
            className="shrink-0 w-10 h-10 rounded-full bg-brand-white text-brand-black flex items-center justify-center transition-transform duration-300 hover:scale-110"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
