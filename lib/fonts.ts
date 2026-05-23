import localFont from "next/font/local"

export const fontDisplay = localFont({
  src: [
    {
      path: "../public/fonts/helvetica-neue-5/HelveticaNeueBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/helvetica-neue-5/HelveticaNeueBoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/helvetica-neue-5/HelveticaNeueBlack.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/helvetica-neue-5/HelveticaNeueBlackItalic.otf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../public/fonts/helvetica-neue-5/HelveticaNeueHeavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/helvetica-neue-5/HelveticaNeueHeavyItalic.otf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
})

export const fontBody = localFont({
  src: [
    {
      path: "../public/fonts/helvetica-neue-5/HelveticaNeueRoman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/helvetica-neue-5/HelveticaNeueItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/helvetica-neue-5/HelveticaNeueMedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/helvetica-neue-5/HelveticaNeueMediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/helvetica-neue-5/HelveticaNeueBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/helvetica-neue-5/HelveticaNeueBoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-body",
  display: "swap",
})
