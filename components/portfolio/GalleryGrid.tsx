"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { urlFor } from "@/sanity/lib/image"
import type { GalleryImage } from "@/types/sanity"

interface Props {
  images: GalleryImage[]
  projectTitle: string
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
  },
}

function getGalleryWidth(span?: number): string {
  if (span === 2) return "w-full"
  return "w-full md:w-[calc(50%-8px)]"
}

function getGalleryHeight(span?: number): string {
  if (span === 2) return "md:min-h-[500px]"
  return "md:min-h-[300px]"
}

function getGalleryAspect(span?: number): string {
  if (span === 2) return "aspect-[16/9]"
  return "aspect-[4/3]"
}

export function GalleryGrid({ images, projectTitle }: Props) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="flex flex-wrap gap-4"
    >
      {images.map((item, i) => {
        const span = item.span || 1
        const imgUrl = item.asset ? urlFor(item.asset).width(1200).url() : null
        if (!imgUrl) return null

        return (
          <motion.div
            key={i}
            variants={itemVariants}
            className={`relative ${getGalleryAspect(span)} ${getGalleryWidth(span)} ${getGalleryHeight(span)} rounded-2xl overflow-hidden bg-brand-white/5`}
          >
            <Image
              src={imgUrl}
              alt={item.alt || `${projectTitle} gallery ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </motion.div>
        )
      })}
    </motion.div>
  )
}
