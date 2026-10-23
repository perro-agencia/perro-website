import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // 301 desde las rutas del sitio anterior (ver public/sitemap.xml en el historial de git)
  async redirects() {
    return [
      { source: "/culture", destination: "/nosotros", statusCode: 301 },
      { source: "/services", destination: "/servicios", statusCode: 301 },
      { source: "/contact", destination: "/contacto", statusCode: 301 },
      { source: "/terms", destination: "/legal/politicas-de-privacidad", statusCode: 301 },
      {
        source: "/blog/blogFeed/que-es-el-sem",
        destination: "/blog/que-es-sem-y-para-que-sirve",
        statusCode: 301,
      },
      {
        source: "/blog/blogFeed/domina-el-seo",
        destination: "/blog/domina-el-seo-para-impulsar-tu-presencia-online",
        statusCode: 301,
      },
      {
        source: "/blog/blogFeed/sem-vs-seo",
        destination: "/blog/sem-vs-seo-y-sus-diferencias-clave",
        statusCode: 301,
      },
      {
        source: "/blog/blogFeed/maximiza-tu-alcance-con-reels",
        destination: "/blog/maximizando-tu-alcance-con-reels-y-contenidos-estaticos",
        statusCode: 301,
      },
      {
        source: "/blog/blogFeed/seleccionar-con-vision",
        destination: "/blog/agencias-de-marketing-digital-que-potencian-tu-inversion-como-elegir",
        statusCode: 301,
      },
      {
        source: "/blog/blogFeed/inteligencia-artificial-en-el-marketing-digital",
        destination: "/blog/inteligencia-artificial-en-el-marketing-digital-creando-campanas-efectivas-en-google-search",
        statusCode: 301,
      },
      { source: "/blog/blogFeed/:path*", destination: "/blog", statusCode: 301 },
    ]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://*.sanity.io",
              "style-src 'self' 'unsafe-inline' https://vercel.live",
              "img-src 'self' data: blob: https://cdn.sanity.io https://vercel.live",
              "font-src 'self' data:",
              "connect-src 'self' https://*.sanity.io https://vercel.live https://sanity.apicdn.io",
              "frame-src 'self' https://*.sanity.io https://vercel.live",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ]
  },
}

export default nextConfig
