"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { urlFor } from "@/sanity/lib/image"
import { Chip } from "@/components/ui/Chip"
import type { Post } from "@/types/sanity"
import { cn } from "@/lib/utils"

interface Props {
  post: Post
  index: number
}

const brandColorPairs = [
  { bg: "bg-brand-primary-main", text: "text-brand-white" },
  { bg: "bg-brand-accent-01", text: "text-brand-white" },
  { bg: "bg-brand-accent-02", text: "text-brand-black" },
  { bg: "bg-brand-black", text: "text-brand-white" },
]

function getHeightClass(relevance: number): string {
  if (relevance === 3) return "min-h-[420px] md:min-h-[500px]"
  if (relevance === 2) return "min-h-[320px] md:min-h-[380px]"
  return "min-h-[280px] md:min-h-[340px]"
}

export function BlogCard({ post, index }: Props) {
  const relevance = post.relevance || 1
  const colorPair = brandColorPairs[index % brandColorPairs.length]
  const hasTags = (post.tags?.length ?? 0) > 0
  const showTags = relevance >= 2 && hasTags

  return (
    <Link href={`/blog/${post.slug.current}`} className="block group h-full">
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl h-full",
          getHeightClass(relevance),
        )}
      >
        {relevance === 2 && post.coverImage ? (
          <div className="flex h-full">
            <div className="relative w-[60%] flex flex-col justify-end p-8">
              <div className={cn("absolute inset-0", colorPair.bg)} />
              <div className="relative z-10">
                <h3 className={cn("font-display font-medium text-xl mb-3", colorPair.text)}>
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className={cn("text-sm md:text-base line-clamp-2 mb-4 opacity-70", colorPair.text)}>
                    {post.excerpt}
                  </p>
                )}
                {showTags && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag) => (
                      <Chip key={tag} variant="outline-dark">
                        {tag}
                      </Chip>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="relative w-[40%]">
              <Image
                src={urlFor(post.coverImage).width(600).url()}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>
        ) : (
          <div className={cn("h-full flex flex-col justify-end p-8", relevance === 1 && "pb-12")}>
            {relevance === 3 && post.coverImage ? (
              <>
                <Image
                  src={urlFor(post.coverImage).width(1200).url()}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
              </>
            ) : (
              <div className={cn("absolute inset-0", colorPair.bg)} />
            )}

            <div className="relative z-10">
              <h3
                className={cn(
                  "font-display font-medium text-xl mb-3",
                  relevance === 3 ? "text-brand-white" : colorPair.text,
                )}
              >
                {post.title}
              </h3>

              {post.excerpt && (
                <p
                  className={cn(
                    "text-sm md:text-base line-clamp-2 mb-4",
                    relevance === 3
                      ? "text-brand-white/70"
                      : colorPair.text,
                    relevance !== 3 && "opacity-70",
                  )}
                >
                  {post.excerpt}
                </p>
              )}

              {showTags && (
                <div className="flex flex-wrap gap-2">
                  {post.tags?.map((tag) => (
                    <Chip key={tag} variant="outline">
                      {tag}
                    </Chip>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div aria-hidden="true" className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              relevance === 3 ? "bg-brand-white text-brand-black" : colorPair.text === "text-brand-black" ? "bg-brand-black text-brand-white" : "bg-brand-white text-brand-black",
            )}
          >
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  )
}
