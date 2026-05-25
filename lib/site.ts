export const siteConfig = {
  name: "PERRO",
  tagline: "Agencia Creativa",
  description:
    "Agencia creativa especializada en branding, diseño UX/UI, desarrollo web y marketing digital. Transformamos marcas en experiencias digitales.",
  email: "hola@perroagency.com",
  phone: "+541124058394",
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://perro.agency",
  ogImage: "/meta/og-graph-image.png",
  ogImageAlt: "PERRO — Agencia Creativa",
  icons: {
    icon: [
      { url: "/meta/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/meta/favicon-256x256.png", sizes: "256x256", type: "image/png" },
    ],
  },
  social: {
    instagram: "https://www.instagram.com/perroagency/",
    linkedin: "https://www.linkedin.com/company/perroagency/",
    whatsapp: "https://wa.me/541124058394",
  },
}
