import { Inter, DM_Sans } from "next/font/google"

export const fontDisplay = DM_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

export const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})
