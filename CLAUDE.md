# CLAUDE.md — PERRO Website

Sitio institucional de **PERRO Agency** (agencia creativa: branding, UX/UI, web, performance). Dominio canónico `https://www.perroagency.com`. Contenido y comunicación en **español rioplatense**.

> **Fuente de verdad funcional:** [`docs/CONTEXT.md`](docs/CONTEXT.md). Leelo antes de tocar algo no trivial (arquitectura de componentes, props, schemas, rutas, tokens, decisiones pendientes). No hay PRD en este repo.

## Comandos

```bash
pnpm dev        # next dev
pnpm build      # next build
pnpm lint       # eslint --max-warnings 0
pnpm typegen    # sanity typegen generate
npx tsc --noEmit
```

- Package manager: **pnpm** (no npm/yarn). Node 22.x.
- No hay tests automatizados. Verificar con `tsc`, `pnpm build` y probando en el navegador.
- `pnpm lint` tiene errores preexistentes (FloatingLogos.tsx, StrategySection.tsx) — no confundirlos con regresiones.

## Stack

Next.js 16 (App Router, RSC) · React 19 · TypeScript · Tailwind CSS v3 (+ typography) · framer-motion · Sanity v5 (Studio embebido en `/studio`, `next-sanity`) · Resend (formularios) · three + @react-three/fiber v9 (solo `/invite`) · Vercel (Analytics + Speed Insights).

## Estructura

```
app/(site)/          páginas públicas (/, servicios, nosotros, portfolio, blog, contacto, performance-ads, legal/*)
app/invite/[slug]/   landing 3D de invitación NFC (layout propio, sin Nav/Footer, noindex)
app/api/             contact (Resend + rate limit en memoria), draft, revalidate
app/studio/          Sanity Studio
components/          sections/, ui/, layout/, blog/, portfolio/, forms/, landing/, invite/
hooks/               useDeviceOrientation (giroscopio de la card 3D)
lib/                 site.ts (config), metadata.ts (buildMetadata), email.ts, fonts.ts, invitations.ts, utils.ts
sanity/              schemas (post, project, blockContent), lib (client, fetch, queries, image)
docs/                CONTEXT.md + docs/seo/
```

## Convenciones

- **Server Components por defecto.** `"use client"` solo cuando hace falta (eventos, hooks, framer-motion). Para animar un RSC, envolverlo en `AnimateInView` en vez de convertirlo a client.
- Fetch de Sanity con `sanityFetch()` (revalidate 60 + `tags` para ISR on-demand vía `/api/revalidate`).
- Contenido **hardcodeado** (no Sanity) para: servicios, equipo/nosotros, clientes, invitaciones. Sanity solo para `post` y `project`.
- **Nav se renderiza en cada página** (no en el layout) con sus props (`logoSrc`, `linkColor`, `buttonColorScheme`, …). Footer sí está en el layout de `(site)`.
- Colores siempre con tokens `brand-*` (`text-brand-white`, nunca `text-white`): `black #0a0a0a`, `white #fff`, `primary-main #885de3`, `accent-01 #de4a27`, `accent-02 #c4f875`.
- Tipografía: `font-display` / `font-body` (Helvetica Neue local, 100–900). Tamaños `text-display-{xl,lg,md}`.
- Componentes reutilizables existentes antes de crear nuevos: `Button` (variants + `colorScheme`), `Chip` (primary/outline/outline-dark), `Banner`, `ContactForm`, `PerformanceContactForm`, `ServiceCard`, `TeamCard`.
- Props tipadas con interfaces o union types (ej. `BgClass`, `ServiceBg`); variantes con `cva`; clases con `cn()` (clsx + tailwind-merge).
- Metadata de páginas con `buildMetadata` de `lib/metadata.ts`.
- Security headers / CSP en `next.config.ts`: si se agrega un dominio externo (scripts, imágenes, fetch), actualizar la CSP.
- `/invite`: sin `@react-three/drei` (decisión de bundle); `InviteCard3D` se carga con `next/dynamic` `ssr:false`. Slugs desconocidos caen a card default, nunca 404.

## Git

- Ramas: `main` (producción), `dev` (trabajo diario), ramas de feature (`perroCamp-cards`, etc.).
- Commits cortos en español/inglés informal (ver `git log`). No commitear ni pushear sin que se pida.
- Variables de entorno en `.env.local` (ignorado por git). Referencia de variables en `.env.example`.

## Documentación

Al cerrar una feature, componente nuevo, cambio de schema, nueva dependencia o decisión técnica, **proponer la actualización de `docs/CONTEXT.md`** (estado, arquitectura, rutas, decisiones pendientes y una línea en el historial con la fecha). Pedir aprobación antes de escribirlo.
