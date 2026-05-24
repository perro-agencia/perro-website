# PERRO Website — Documentación Funcional

## 1. Estado actual del proyecto

**Última actualización:** 2026-05-24

### Features completadas
- Homepage sections rediseñadas completamente (Hero, Clients, Services, Strategy, Portfolio, Team, ContactSection)
- HeroSection con animación palabra por palabra con stagger, GIF de fondo, itálicas animadas con framer-motion (sin setTimeout)
- ClientsSection con grilla de logos, animaciones whileInView, subtítulo "nuestra huella", hover con border-radius animado, scale y shadow
- ServicesSection con datos hardcodeados (sin Sanity), cards con colores brand, box-shadow hover con framer-motion
- StrategySection con imagen de equipo, título grande, chips flotantes con parallax scroll (useScroll + useTransform)
- ContactSection en homepage: grid 2 columnas, headline con palabras animadas, chips outline con keywords, formulario funcional con inputs animados al hacer scroll
- Componente Chip reusable con variantes primary/outline (cva) y hover glow en outline (texto/borde accent-02 + shadow framer-motion)
- Componente FooterLogo extraído como Client Component para logo animado
- Footer convertido a Server Component
- Página de servicios (`/servicios`)
- Página "Nosotros" con equipo (`/nosotros`)
- Página de portfolio con grid + detalle por proyecto (`/portfolio`, `/portfolio/[slug]`)
- Página de blog con listado + detalle por post (`/blog`, `/blog/[slug]`)
- Sanity Studio embebido en `/studio`
- Sitemap dinámico y robots.txt
- Draft mode y revalidación on-demand vía API routes
- Nav component con navegación principal: hamburger animado, menú mobile fullscreen con fade animation, scroll behavior con pill flotante glassmorphism
- Footer con sitemap, redes sociales, copyright dinámico
- Formulario de contacto funcional con Resend + rate limiting (`/contacto`)
- Botón CTA reutilizable con variantes (`components/ui/Button.tsx`) — arrow con animación diagonal hover (entra/sale por lados opuestos con overflow-hidden)
- Security headers (CSP, X-Frame-Options, etc.) en `next.config.ts`
- Componente AmbientBlob (`components/ui/AmbientBlob.tsx`) — glow animado que rebota con morph shape, configurable (color, tamaño, blur, velocidad)

### Features en progreso
- PortfolioGrid y TeamSection aún fetchan data de Sanity — posible migración a datos hardcodeados en el futuro

### Deuda técnica conocida
- Sin tests automatizados
- Las imágenes de Sanity no tienen sizes/priority optimizados en todos los casos
- No hay loading states / skeletons para las páginas que fetchan datos
- Rate limiting en memoria (no persiste entre reinicios del servidor/serverless)

---

## 2. Stack técnico

| Dependencia | Versión | Propósito |
|---|---|---|
| next | ^16.2.6 | Framework React con App Router |
| react / react-dom | ^19.2.5 | UI library |
| sanity | ^5.26.0 | CMS headless |
| next-sanity | ^13.0.3 | Bridge Next.js ↔ Sanity |
| @sanity/client | ^7.22.0 | Cliente GROQ de Sanity |
| @sanity/image-url | ^2.1.1 | URL builder para imágenes de Sanity |
| @sanity/vision | ^5.26.0 | GROQ visualizer para el Studio |
| @sanity/code-input | ^7.1.1 | Syntax highlighting para code blocks en Portable Text |
| @sanity/preview-url-secret | ^4.0.6 | Manejo de secrets para draft mode |
| @portabletext/react | ^3.2.1 | Renderizado de Portable Text |
| framer-motion | ^12.40.0 | Animaciones |
| lucide-react | ^1.16.0 | Iconos SVG |
| tailwindcss | ^3.4.17 | CSS utility-first |
| @tailwindcss/typography | ^0.5.16 | Estilos tipográficos prosa |
| class-variance-authority | ^0.7.1 | Variantes de componentes |
| clsx | ^2.1.1 | Condicionales de clases |
| tailwind-merge | ^3.2.0 | Merge de clases Tailwind |
| resend | ^6.12.3 | Envío de emails desde formulario de contacto |
| typescript | ^5.8.3 | Tipado estático |

### Decisiones técnicas (ADRs)

- **Next.js App Router** sobre Pages Router — mejor soporte para React Server Components y layouts anidados.
- **Sanity como headless CMS** — el equipo necesita que el contenido sea fácilmente editable por no-devs.
- **Tailwind CSS** sin componentes de UI externos — mínimo peso, control total del diseño, consistencia con el brand.
- **pnpm** como package manager por velocidad y eficiencia de disco.
- **RSC (Server Components)** para todas las secciones que obtienen data de Sanity — menos JS enviado al cliente.
- **Security headers** implementados vía `next.config.ts` — CSP restrictivo con excepciones para Sanity (cdn, apicdn, *.sanity.io) y Vercel (vercel.live). Incluye `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`.
- **Rate limiting en memoria** para el endpoint `/api/contact` — solución liviana (Map en memoria, sin dependencias externas). 5 requests por minuto por IP. Migrar a Vercel KV o Redis si el tráfico crece.
- **@sanity/code-input** registrado como plugin en `sanity.config.ts` — provee syntax highlighting para code blocks dentro del Portable Text del CMS.
- **Vision Tool condicional** — solo se habilita en `development` (`process.env.NODE_ENV === "development" ? [visionTool()] : []`) para evitar exposición de datos en producción.

---

## 3. Arquitectura de componentes

```
components/
├── blog/
│   ├── PostCard.tsx         — Card para listado de posts. Props: { post: Post }
│   └── PostBody.tsx         — Renderiza Portable Text del body de un post
├── portfolio/
│   ├── ProjectCard.tsx      — Card para grid de proyectos. Props: { project: Project }
│   └── CaseStudyBody.tsx    — Renderiza Portable Text del body de un proyecto
├── layout/
│   ├── Header.tsx           — Header simplificado que solo renderiza `<Nav />`
│   ├── Nav.tsx              — Nav component completo con logo inline SVG, links desktop, CTA + hamburger animado, menú mobile full overlay con Framer Motion AnimatePresence, y scroll behavior (pill flotante glassmorphism). "use client"
│   ├── Footer.tsx           — Server Component. Sitemap, redes sociales, copyright, contacto. Renderiza `<FooterLogo />` para la parte animada
│   └── FooterLogo.tsx       — "use client". Logo animado del Footer con framer-motion whileInView. Oculto en mobile (hidden md:block)
├── ui/
│   ├── AmbientBlob.tsx      — [SIN USO] Glow animado que rebota con morph shape. Configurable: color, size, blur, speed. Usa requestAnimationFrame
│   ├── BackgroundBlob.tsx   — [SIN USO] Wrapper de AmbientBlob para fondo de página con absolute inset-0
│   ├── Button.tsx           — Botón CTA reutilizable (Link de Next.js), 3 variantes: cta, primary, outline. Arrow con animación diagonal en hover
│   └── Chip.tsx             — "use client" con motion.span. Variantes primary / outline (cva). Outline: hover accent-02 + glow shadow
├── sections/
│   ├── HeroSection.tsx      — "use client". Hero animado: palabras con stagger, GIF de fondo, itálicas con framer-motion delay. Sin data de Sanity. overflow-hidden removido, se usa overflow-x-hidden en body
│   ├── ClientsSection.tsx   — "use client". Grilla de logos de clientes con animación whileInView stagger. 13 clientes hardcodeados. Subtítulo "nuestra huella". Hover: border-radius animado, scale, shadow blanco
│   ├── ServicesSection.tsx  — "use client". Grid de 4 servicios hardcodeados con colores brand, box-shadow hover con framer-motion. Sin fetch de Sanity
│   ├── StrategySection.tsx  — "use client". Imagen de equipo + título grande + chips flotantes con parallax (useScroll + useTransform). Usa `<Chip>`
│   ├── ContactSection.tsx   — "use client". Grid 2 cols (1 en mobile). Headline con palabras animadas + chips outline con keywords. Formulario funcional: Nombre, Compañía, Correo, Mensaje. Inputs con bg-black, border white rounded-full. Animación scroll con stagger por grupo
│   ├── PortfolioGrid.tsx    — Server Component. Grid de proyectos. Fetch: sanityFetch(projectsQuery)
│   └── TeamSection.tsx      — Server Component. Grid de miembros con foto. Fetch: sanityFetch(teamMembersQuery)
└── common/
    ├── AnimatedText.tsx     — [SIN USO] Texto con animación (Framer Motion). No importado en ninguna página
    └── TransitionWrapper.tsx — [SIN USO] Wrapper de animaciones de página. No importado en ninguna página
```

### `Nav` (`components/layout/Nav.tsx`)
Componente `"use client"` que centraliza toda la navegación del sitio. Estructura de 3 contenedores:
1. **Logo** — SVG inline con `currentColor` (altura 8 en mobile), texto alternativo "Ir al inicio". Hover: `text-brand-primary-main`.
2. **Links desktop** — 4 links (Nosotros, Servicios, Proyectos, Blog) en `text-lg uppercase text-brand-white`, hover `underline decoration-brand-accent-02`, active link `text-brand-accent-02`. Ocultos en mobile (`hidden md:flex`).
3. **CTA + Hamburger** — Botón `Button` con variante `cta` hacia `/contacto` (solo desktop), y `HamburgerButton` (solo mobile).

**Mobile menu:**
- `HamburgerButton`: 3 spans CSS que se transforman en X (rotación 45°, fade out del span central, rotación -45°).
- Overlay: `fixed inset-0 z-40 bg-brand-black`, columna centrada con los mismos links + CTA.
- Animación: `AnimatePresence` de Framer Motion con fade in/out del overlay y entrada escalonada de links (delay `i * 0.05`).
- Scroll lock: `document.body.style.overflow = "hidden"` cuando el menú está abierto.
- Cierre automático al cambiar de ruta (via `usePathname`).

**Scroll behavior:**
- `useEffect` con evento `scroll` (passive) detecta `window.scrollY > 50`.
- En reposo: nav con `bg-brand-black/80 backdrop-blur-md` y borde transparente.
- Al scrollear: se transforma en una pill flotante: `mx-auto mt-4 max-w-[90vw] md:max-w-[1000px] bg-brand-black/70 backdrop-blur-xl border border-brand-white/10 shadow-xl rounded-full px-6`. Transición suave CSS `transition-all duration-300 ease-in-out`.

**Animaciones de entrada:**
- Logo, links desktop y CTA tienen entrada escalonada con `motion.div` (`opacity: 0, y: -10` → `opacity: 1, y: 0`) con delays progresivos (`0.05`, `0.1 + i * 0.08`).

### `Button` (`components/ui/Button.tsx`)
Componente `"use client"` que renderiza un Link estilizado con 3 variantes usando CVA:
- **cta** (default): pill blanco con icono `ArrowRight`, hover invierte colores (fondo oscuro, texto blanco). Usado en Header como CTA de contacto.
- **primary**: botón relleno con `bg-brand-primary-main`.
- **outline**: botón con borde semitransparente.

**Props:** `{ href: Route; children: React.ReactNode; variant?: ButtonVariant; className?: string; showIcon?: boolean }`

**Animación hover del arrow:** El contenedor del icono tiene `overflow-hidden`. Al hover: el SVG arrow se desplaza en diagonal (keyframes x/y 16px) — sale hacia arriba-derecha y reaparece desde abajo-izquierda con framer-motion. El contenedor además tiene un leve `translate-x` de bounce.

### Convenciones
- Componentes async cuando fetchan data de Sanity (Server Components)
- Solo se marca "use client" cuando es estrictamente necesario (eventos, hooks de Next/navigation)
- Props tipadas con interfaces del archivo `types/sanity.ts`

---

## 4. Schemas de Sanity

### Project (`sanity/schemas/project.ts`)
| Campo | Tipo | Descripción |
|---|---|---|
| title | string | Requerido |
| slug | slug | source: title, requerido |
| client | string | Nombre del cliente |
| services | array of reference → service | Servicios relacionados |
| coverImage | image | Con hotspot |
| images | array of image | Galería, con hotspot |
| summary | text | Resumen breve |
| body | blockContent | Contenido rich text |
| year | number | Año del proyecto |
| featured | boolean | Para destacar (default: false) |
| tags | array of string | Tags |

### Post (`sanity/schemas/post.ts`)
| Campo | Tipo | Descripción |
|---|---|---|
| title | string | Requerido |
| slug | slug | source: title, requerido |
| author | reference → teamMember | Autor del post |
| publishedAt | datetime | Fecha de publicación |
| coverImage | image | Con hotspot |
| excerpt | text | Extracto/resumen |
| body | blockContent | Contenido rich text |
| tags | array of string | Tags |
| seoTitle | string | Título para SEO |
| seoDescription | text | Descripción para SEO |

### Team Member (`sanity/schemas/teamMember.ts`)
| Campo | Tipo | Descripción |
|---|---|---|
| name | string | Requerido |
| role | string | Cargo |
| photo | image | Con hotspot |
| bio | text | Biografía |
| order | number | Orden de aparición (default: 0) |

### Service (`sanity/schemas/service.ts`)
| Campo | Tipo | Descripción |
|---|---|---|
| title | string | Requerido |
| description | text | Descripción del servicio |
| icon | string | Nombre del ícono Lucide |
| order | number | Orden de aparición (default: 0) |

### Block Content (`sanity/schemas/blockContent.ts`)
Tipo de bloque rich text con soporte para:
- Estilos: normal, h2, h3, h4, blockquote
- Decoradores: bold (strong), italic (em)
- Anotaciones: link con URL
- Imágenes embebidas (con hotspot)
- Code blocks (plugin `@sanity/code-input`)

⚠️ **Nota:** La query `settingsQuery` está definida en `sanity/lib/queries.ts` pero **no existe un schema `settings`** en `sanity/schemas/index.ts`. La query devolverá `undefined` a menos que se cree el schema y el documento correspondiente.

### Queries GROQ existentes (`sanity/lib/queries.ts`)

| Query | GROQ | Uso |
|---|---|---|
| projectsQuery | `*[_type == "project"] \| order(year desc)` | Portfolio grid |
| projectBySlugQuery | `*[_type == "project" && slug.current == $slug][0]` con services expandidos | Detalle de proyecto |
| postsQuery | `*[_type == "post"] \| order(publishedAt desc)` con author expandido | Blog list |
| postBySlugQuery | `*[_type == "post" && slug.current == $slug][0]` | Detalle de post |
| teamMembersQuery | `*[_type == "teamMember"] \| order(order asc)` | Team grid |
| servicesQuery | `*[_type == "service"] \| order(order asc)` | ⚠️ **HUÉRFANA — ServicesSection ya no usa Sanity.** La query existe en `sanity/lib/queries.ts` pero no tiene consumidores. Pendiente decidir si se elimina o se mantiene para uso futuro |
| settingsQuery | `*[_type == "settings"][0]` | Configuración general (⚠️ no existe schema settings en `sanity/schemas/index.ts`) |

---

## 5. Variables de entorno

| Variable | Pública | Descripción | Dónde se usa |
|---|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅ Pública | ID del proyecto en Sanity | `sanity.config.ts`, `sanity.cli.ts`, `sanity/lib/client.ts` |
| `NEXT_PUBLIC_SANITY_DATASET` | ✅ Pública | Nombre del dataset (ej: "production") | `sanity.config.ts`, `sanity.cli.ts`, `sanity/lib/client.ts` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | ✅ Pública | Versión de la API de Sanity | `sanity/lib/client.ts` |
| `SANITY_API_TOKEN` | ❌ Servidor | Token de API para write client y draft mode | `sanity/lib/client.ts` (writeClient), `app/api/draft/route.ts` |
| `SANITY_REVALIDATE_SECRET` | ❌ Servidor | Secret para webhook de revalidación on-demand | `app/api/revalidate/route.ts` |
| `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` | ✅ Pública | ID de Vercel Analytics | - |
| `NEXT_PUBLIC_BASE_URL` | ✅ Pública | URL base del sitio para metadata/OG images | `lib/metadata.ts` |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | ✅ Pública | Site key de Google reCAPTCHA (sin uso activo aún) | `.env` presente, sin referencia en código actual |
| `RESEND_API_KEY` | ❌ Servidor | API key de Resend para envío de emails | `lib/email.ts` |
| `CONTACT_EMAIL_TO` | ❌ Servidor | Dirección de email donde llegan los mensajes del formulario de contacto | `lib/email.ts` (default: `hola@perro.agency`) |

⚠️ **Nota:** El `.env.example` aún lista `REVALIDATION_SECRET` (nombre antiguo). El nombre correcto usado en código es `SANITY_REVALIDATE_SECRET`. Pendiente actualizar `.env.example`.

---

## 6. Rutas del sitio

| Ruta | Tipo | Data | Archivo |
|---|---|---|---|
| `/` | Estática | Hero → Clients → Services → Strategy → PortfolioGrid → TeamSection. Sin fetch directo en page.tsx (PortfolioGrid y TeamSection fetchan internamente) | `app/(site)/page.tsx` |
| `/servicios` | Estática | Fetch services | `app/(site)/servicios/page.tsx` |
| `/nosotros` | Estática | Fetch team members | `app/(site)/nosotros/page.tsx` |
| `/portfolio` | Estática | Fetch projects | `app/(site)/portfolio/page.tsx` |
| `/portfolio/[slug]` | Dinámica | Fetch project by slug | `app/(site)/portfolio/[slug]/page.tsx` |
| `/blog` | Estática | Fetch posts | `app/(site)/blog/page.tsx` |
| `/blog/[slug]` | Dinámica | Fetch post by slug | `app/(site)/blog/[slug]/page.tsx` |
| `/contacto` | Estática | Formulario funcional con Resend + rate limiting (5 req/min por IP, POST a `/api/contact`) | `app/(site)/contacto/page.tsx` |
| `/studio` | Estática | Sanity Studio embedido | `app/studio/[[...tool]]/page.tsx` |

Todas las rutas bajo `(site)` comparten el layout con Header + Footer.
Las fetch calls usan `sanityFetch()` con revalidate: 60 y tags para ISR on-demand.

---

## 7. Design System tokens

### Colores (`tailwind.config.ts`)
```ts
brand: {
  black: "#0a0a0a",
  white: "#f5f5f0",
  "primary-main": "#885de3",     // Púrpura
  "accent-01": "#de4a27",        // Rojo
  "accent-02": "#c4f875",        // Verde lima
}
```

### Tipografía
| Token | Font | Pesos | Uso |
|---|---|---|---|
| `font-display` | Helvetica Neue (local) | 100, 200, 300, 400, 500, 700, 800, 900 + itálicas | Para headings display |
| `font-body` | Helvetica Neue (local) | 400, 500, 700 + itálicas | Para texto corriente |
| `font-mono` | var(--font-mono) | — | Para código |

**Nota:** Los pesos `thin(100)`, `ultralight(200)` y `light(300)` se agregaron a `fontDisplay` en la sesión 2026-05-24 para soportar el diseño de headings grandes con `font-light` en StrategySection y ServicesSection.

### Tamaños de texto display
| Clase | Tamaño | Line-height |
|---|---|---|
| `text-display-xl` | `clamp(3rem, 8vw, 7rem)` | 1 |
| `text-display-lg` | `clamp(2rem, 5vw, 4rem)` | 1.1 |
| `text-display-md` | `clamp(1.5rem, 3vw, 2.5rem)` | 1.2 |

### Convenciones de clases
- Uso intensivo de `container mx-auto px-4` para layouts centrados
- Textos secundarios usan `text-brand-white/60` o `text-brand-white/70`
- Bordes de cards/separadores: `border-brand-white/10`
- Cards: `border border-brand-white/10 p-8 rounded-lg`
- Botones/link hover: `hover:text-brand-primary-main`

### Layout
- Header: `fixed top-0 left-0 right-0 z-50 bg-brand-black/80 backdrop-blur-md`
- Secciones de página: `py-24`
- Separación entre cards: `gap-8`
- Grids responsivos: `grid gap-8 md:grid-cols-2 lg:grid-cols-3`
- Sin sidebar — layouts de una sola columna con max-width controlado

### Botones (`components/ui/Button.tsx`)
Componente wrapper de `next/link` con 3 variantes:

| Variante | Clase visual | Uso típico |
|---|---|---|
| `cta` (default) | `bg-brand-white` texto oscuro, `rounded-full`, icono `ArrowRight` con animación de hover | CTA principal en Header, llamados a la acción destacados |
| `primary` | `bg-brand-primary-main` texto blanco, `rounded-lg` | Botones primarios en secciones |
| `outline` | `border border-brand-white/20` texto blanco, `rounded-lg` | Botones secundarios / alternativos |

**Props:** `href: Route` (Next.js Route), `children`, `variant?`, `className?`, `showIcon?` (default: true).
El icono solo se muestra en variante `cta` por defecto (el componente siempre recibe `showIcon` pero los estilos de circle icon son parte de la variante cta).

### Chip (`components/ui/Chip.tsx`)
Componente `"use client"` con `motion.span` y `class-variance-authority` (cva). Dos variantes:

| Variante | Clase visual | Uso típico |
|---|---|---|---|
| `primary` (default) | `bg-brand-primary-main text-black rounded-full`, padding `py-1 px-8 md:py-3 md:px-24` | Chips destacados en StrategySection |
| `outline` | `border border-brand-white text-brand-white rounded-full`, padding `py-3 px-8`. Hover: texto/borde → `brand-accent-02` + box-shadow glow verde vía framer-motion `whileHover` | Chips secundarios, keywords en ContactSection |

**Props:** `{ children: React.ReactNode; variant?: "primary" | "outline"; className?: string }`

---

## 8. Decisiones pendientes

- [x] **Formulario de contacto**: definido — se usa Resend (`lib/email.ts`)
- [x] **Mobile navigation**: implementar menú hamburguesa para < md breakpoint
- [ ] **Blog comments**: ¿se habilita? ¿con qué servicio?
- [ ] **SEO**: definir estrategia de metadata dinámica (más allá del title/description básico)
- [ ] **Performance**: evaluar si conviene SSG + ISR o mantener SSR con revalidate
- [ ] **Analytics**: Vercel Analytics configurado pero sin verificar si se usa
- [x] **Font Display aplicado**: `app/layout.tsx` ahora incluye `fontDisplay.variable` en la className del `<html>` junto con `fontBody.variable`. La clase `font-display` ya resuelve correctamente a `var(--font-display)`.
- [ ] **`servicesQuery` huérfana**: `sanity/lib/queries.ts` exporta `servicesQuery` pero ningún componente la importa (ServicesSection ahora usa datos hardcodeados). Decidir si se elimina o se mantiene para uso futuro.
- [ ] **Schema `settings` faltante**: `sanity/lib/queries.ts` exporta `settingsQuery` pero no existe schema `settings` en `sanity/schemas/`. Decidir si se crea o se elimina la query.
- [ ] **reCAPTCHA key sin uso**: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` está en `.env` pero no hay código que la referencie. Posible vestigio de un intento de formulario.
- [ ] **Componentes sin uso**: `AnimatedText` y `TransitionWrapper` existen en `components/common/` pero no se importan en ninguna página. Evaluar si se integran o se eliminan.
- [ ] **`.env.example` desactualizado**: lista `REVALIDATION_SECRET` pero el código usa `SANITY_REVALIDATE_SECRET`. Actualizar el ejemplo.
- [ ] **Rate limiting en memoria**: el endpoint `/api/contact` usa un `Map` en memoria para rate limiting. No persiste entre reinicios del servidor y no escala horizontalmente. Evaluar migrar a Vercel KV o Redis si el tráfico crece.
 
---

## 9. Historial de cambios relevantes

| Fecha | Cambio |
|---|---|
| 2026-05-22 | Creación del proyecto |
| 2026-05-22 | Documentación funcional inicial (PROJECT_DOC.md) |
| 2026-05-22 | Creación del agente `analyst` para mantenimiento de doc |
| 2026-05-22 | Auditoría de documentación: 7 discrepancias encontradas y corregidas (stack, env vars, schemas, decisiones pendientes) |
| 2026-05-22 | Integración de Resend para formulario de contacto (`lib/email.ts`, `app/api/contact/route.ts`, `components/forms/ContactForm.tsx`) |
| 2026-05-22 | Creación de `components/ui/Button.tsx` y directorio `components/ui/` |
| 2026-05-22 | Security headers en `next.config.ts` y rate limiting en API de contacto |
| 2026-05-22 | Registro de plugin `codeInput` y Vision Tool condicional en `sanity.config.ts` |
| 2026-05-23 | Migración de Header + Navigation a nuevo Nav component con mobile menu (`components/layout/Nav.tsx`, `Header.tsx` simplificado) |
| 2026-05-24 | Homepage rediseñada: nuevo orden Hero → Clients → Services → Strategy → PortfolioGrid → TeamSection |
| 2026-05-24 | Nuevos componentes: `ClientsSection.tsx`, `StrategySection.tsx`, `ui/Chip.tsx`, `layout/FooterLogo.tsx` |
| 2026-05-24 | `HeroSection.tsx` convertido a "use client": animación palabra por palabra con stagger, GIF de fondo, itálicas con framer-motion delay |
| 2026-05-24 | `ServicesSection.tsx` convertido a "use client" con datos hardcodeados (ya no fetch de Sanity), colores brand centralizados, framer-motion hover |
| 2026-05-24 | `Footer.tsx` convertido a Server Component — parte animada extraída a `FooterLogo.tsx` |
| 2026-05-24 | `lib/fonts.ts`: pesos thin(100), ultralight(200), light(300) agregados a fontDisplay |
| 2026-05-24 | Fixes: shadowColor desde brandColors, rAF loop → useScroll+useTransform en StrategySection, right-[-200]→-right-200, -rotate-[-9deg]→-rotate-9, Chip migrado a cva, subtítulos h2 semántico |
| 2026-05-24 | Font Display aplicado en layout.tsx (decisión pendiente resuelta) |
| 2026-05-24 | servicesQuery marcada como huérfana (sin consumidores en el código) |
| 2026-05-24 | ContactSection creada: grid 2 cols con headline animado, chips outline, formulario funcional (company agregado a API y email) |
| 2026-05-24 | Chip outline: hover con border/text accent-02 + glow shadow via framer-motion. Chip convertido a "use client" |
| 2026-05-24 | HeroSection: overflow-hidden removido, overflow-x-hidden agregado a body en globals.css |
| 2026-05-24 | AmbientBlob + BackgroundBlob: componente de glow animado con morph shape (sin uso en layout) |
| 2026-05-24 | ClientsSection: hover con border-radius animado (transition-all), scale y shadow blanco |
| 2026-05-24 | Button: arrow animado con desplazamiento diagonal (entra/sale por lados opuestos) + contenedor con translate-x bounce |
