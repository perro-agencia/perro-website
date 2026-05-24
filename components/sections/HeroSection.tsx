"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

type WordDef = {
  text: string
  color: "primary" | "white"
  italicIndex?: number
}

const lines: WordDef[][] = [
  [{ text: "Nativos", color: "primary", italicIndex: 3 }],
  [
    { text: "en", color: "white" },
    { text: "la", color: "white" },
    { text: "era", color: "white", italicIndex: 0 },
  ],
  [{ text: "digital", color: "white" }],
]

const WORD_STAGGER = 0.12
const ITALIC_DELAY_OFFSET = 0.6

function getWordDelay(lineIndex: number, wordIndex: number): number {
  let delay = 0.1
  for (let l = 0; l < lineIndex; l++) {
    delay += lines[l].length * WORD_STAGGER
  }
  delay += wordIndex * WORD_STAGGER
  return delay
}

function getItalicDelay(lineIndex: number, wordIndex: number): number {
  return getWordDelay(lineIndex, wordIndex) + ITALIC_DELAY_OFFSET
}

export function HeroSection() {
  const [italicStates, setItalicStates] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    lines.forEach((line, li) => {
      line.forEach((word, wi) => {
        if (word.italicIndex !== undefined) {
          const key = `${li}-${wi}`
          const delay = getItalicDelay(li, wi) * 1000
          const timer = setTimeout(() => {
            setItalicStates((prev) => ({ ...prev, [key]: true }))
          }, delay)
          timers.push(timer)
        }
      })
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden py-12 md:py-[140px]">
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/miscelaneous/star-animation.gif"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/60 to-transparent" />
      </div>

      <div className="absolute inset-0 bg-brand-black md:hidden" />

      <div className="relative z-10 container mx-auto px-6">
        <h1 className="font-display font-regular leading-[0.9] -tracking-[0.03em] text-[clamp(3rem,15vw,12rem)]">
          {lines.map((line, li) => (
            <div key={li} className="flex flex-wrap gap-x-[0.2em]">
              {line.map((word, wi) => {
                const wDelay = getWordDelay(li, wi)
                const italicKey = `${li}-${wi}`
                const isItalic = italicStates[italicKey]

                if (word.italicIndex !== undefined) {
                  const before = word.text.slice(0, word.italicIndex)
                  const italicChar = word.text[word.italicIndex]
                  const after = word.text.slice(word.italicIndex + 1)

                  return (
                    <motion.span
                      key={`${li}-${wi}`}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: wDelay, ease: "easeOut" }}
                      className={
                        word.color === "primary"
                          ? "text-brand-primary-main"
                          : "text-brand-white"
                      }
                    >
                      {before}
                      <motion.span
                        animate={{ fontStyle: isItalic ? "italic" : "normal" }}
                        transition={{ duration: 0.3, ease: "easeIn" }}
                        className="inline-block"
                      >
                        {italicChar}
                      </motion.span>
                      {after}
                    </motion.span>
                  )
                }

                return (
                  <motion.span
                    key={`${li}-${wi}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: wDelay, ease: "easeOut" }}
                    className={
                      word.color === "primary"
                        ? "text-brand-primary-main"
                        : "text-brand-white"
                    }
                  >
                    {word.text}
                  </motion.span>
                )
              })}
            </div>
          ))}
        </h1>
      </div>
    </section>
  )
}
