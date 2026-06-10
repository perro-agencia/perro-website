"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { urlFor } from "@/sanity/lib/image"
import { cn } from "@/lib/utils"
import type { Project } from "@/types/sanity"
import { motion } from "framer-motion"

interface Props {
  project: Project
  className?: string
  index?: number
}

export function ProjectCard({ project, className, index }: Props) {
  const bgColor = project.bgColor || "#885de3"
  const logoSrc = project.logo ? urlFor(project.logo).width(200).url() : null
  const hoverSrc = project.hoverImage ? urlFor(project.hoverImage).width(800).url() : null

  return (
    <div className={cn("group transition-all duration-700 ease-in-out", className)}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          duration: 0.8,
          ease: [0.215, 0.610, 0.355, 1.000], // easeOutCubic
          delay: index !== undefined ? (index % 3) * 0.15 : 0
        }}
        className="size-full"
      >
        <Link href={`/portfolio/${project.slug.current}`} className="block size-full">
          <div className="relative h-[300px] sm:h-[380px] w-full rounded-3xl overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-700 ease-in-out">
            {hoverSrc && (
              <Image
                src={hoverSrc}
                alt=""
                fill
                className="object-cover scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />
            )}

            <div
              className="absolute inset-0 transition-opacity duration-700 ease-in-out group-hover:opacity-0"
              style={{ backgroundColor: bgColor }}
            />

            <div className="absolute inset-0 flex items-center justify-center p-12">
              {logoSrc && (
                <Image
                  src={logoSrc}
                  alt={`${project.client || project.title} logo`}
                  fill
                  className="object-contain w-full max-w-[150px] mx-auto"
                />
              )}
            </div>

            <div aria-hidden="true" className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <div className="w-10 h-10 rounded-full bg-brand-white text-brand-black flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  )
}
