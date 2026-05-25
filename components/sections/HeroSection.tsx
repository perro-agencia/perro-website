"use client"

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
  return (
    <section className="relative md:h-[100vh] min-h-[600px] flex items-center pt-[80px] md:py-[10px] max-w-[1500px] mx-auto">
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/miscelaneous/atar-animation.gif"
            alt=""
            width={694}
            height={1000}
            className="absolute right-[-200px] md:right-0 top-1/2 -translate-y-1/2 h-[1300px] w-auto object-contain -rotate-[-15deg]"
            priority
          />
        </motion.div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <h1 className="font-display font-normal leading-[0.9] -tracking-[0.03em] text-[clamp(6rem,15vw,12rem)]">
          {lines.map((line, li) => (
            <div key={li} className="flex flex-wrap gap-x-[0.2em]">
              {line.map((word, wi) => {
                const wDelay = getWordDelay(li, wi)
                const iDelay = getItalicDelay(li, wi)

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
                        initial={{ fontStyle: "normal" }}
                        animate={{ fontStyle: "italic" }}
                        transition={{ duration: 0.3, delay: iDelay, ease: "easeIn" }}
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
