"use client"

import { useEffect, useState } from "react"
import { BlogCard } from "@/components/blog/BlogCard"
import { BlogCategoryFilter } from "@/components/blog/BlogCategoryFilter"
import type { Category, Post } from "@/types/sanity"

interface Props {
  posts: Post[]
  categories: Category[]
}

const PARAM = "categoria"

const getColSpan = (relevance: number = 1) => {
  if (relevance === 3) return "md:col-span-3"
  if (relevance === 2) return "md:col-span-2"
  return "md:col-span-1"
}

export function BlogFilteredGrid({ posts, categories }: Props) {
  const [active, setActive] = useState<string | null>(null)

  // El filtro vive en ?categoria= para que se pueda compartir el link; se lee al montar para no volver dinámica la página
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get(PARAM)
    if (slug && categories.some((c) => c.slug.current === slug)) setActive(slug)
  }, [categories])

  const handleChange = (slug: string | null) => {
    setActive(slug)
    const url = new URL(window.location.href)
    if (slug) url.searchParams.set(PARAM, slug)
    else url.searchParams.delete(PARAM)
    window.history.replaceState(null, "", url)
  }

  // Se conserva el índice original para que cada card mantenga su color al filtrar
  const visible = posts
    .map((post, index) => ({ post, index }))
    .filter(({ post }) => !active || post.categories?.some((c) => c.slug.current === active))

  return (
    <>
      {categories.length > 0 && (
        <BlogCategoryFilter categories={categories} active={active} onChange={handleChange} />
      )}

      {visible.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visible.map(({ post, index }) => (
            <div key={post._id} className={getColSpan(post.relevance)}>
              <BlogCard post={post} index={index} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-brand-white/60 text-lg py-16 text-center">
          Todavía no hay notas en esta categoría.
        </p>
      )}
    </>
  )
}
