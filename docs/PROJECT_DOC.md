# PERRO Website — Documentación Funcional

## 1. Estado actual del proyecto

**Última actualización:** 2026-05-28

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
- Página de servicios (`/servicios`) con ServicesFullScreen — 4 secciones full-screen (100vh) con datos hardcodeados, títulos grandes (~250px), chips outline, descripción bottom-right en desktop
- Página "Nosotros" (`/nosotros`) con NosotrosContent + TeamCard — hero animado, grilla de 8 miembros con stagger, sección misión. Equipo hardcodeado (sin Sanity)
- Páginas legales: `/legal/terminos-y-condiciones` y `/legal/politicas-de-privacidad` — server components estáticos con título grande (clamp 2.5rem-6rem) y contenido en `<p>` único con `<br />`. Metadata SEO con buildMetadata.
- Página de portfolio rediseñada (`/portfolio`, `/portfolio/[slug]`): ProjectCard con gradient, logo, hoverImage, grow effect on hover. Schema simplificado (gradientFrom, gradientTo, logo, hoverImage, order). CaseStudyBody eliminado.
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
- **AnimateInView** (`components/AnimateInView.tsx`) — wrapper genérico "use client" para animaciones scroll-triggered con framer-motion whileInView
- **Banner** (`components/ui/Banner.tsx`) — banner reutilizable Server Component con AnimateInView + Button cta. Props: title, buttonText, buttonHref
- **TeamCard** (`components/ui/TeamCard.tsx`) — card de miembro con props tipadas (BgClass, TextColorClass como union types), Image fill object-cover, animación con framer-motion variants
- **brand-white actualizado** de `#f5f5f0` a `#ffffff` en tailwind.config.ts
- **Refactor global**: `text-white` → `text-brand-white` en todos los componentes (Button, Nav, Footer, sections, etc.)
- **Refactor de nomenclatura**: `text-md` → `text-base`, `font-regular` → `font-normal`, `max-w-8xl` → `max-w-7xl` — alineado con Tailwind v3
- **Sistema page-theme revertido**: se creó y eliminó `lib/page-theme.tsx`, `lib/page-themes.ts`, `components/PageThemeSetter.tsx`. Se restauraron Nav, Footer, layout a su estado original. Decisión: Nav/Footer único en todo el sitio.
- **Button con 4 esquemas de color** via prop `colorScheme` (`default`, `primary`, `accent`, `dark`). Cada esquema define colores de container, texto, arrow y sus hovers. Implementado con CSS variables + Tailwind arbitrary values.
- **Nav con props custom**: `logoSrc`, `logoHoverSrc` (crossfade 300ms), `linkColor`, `linkHoverColor`, `buttonColorScheme`. Cada página renderiza su propio `<Nav />` con props independientes.
- **Nav renderizado por página**: se removió `<Header />` del layout `(site)`. Cada una de las 10 páginas importa y renderiza `<Nav />` directamente.
- **fontBody unificado**: ahora incluye todos los pesos 100-900 con itálicas (como fontDisplay). Ambos usan la misma familia Helvetica Neue completa.
- **TeamCard extendido**: `BgClass` incluye `"bg-brand-black"`, el rol soporta `\n` via `whitespace-pre-line`.
- **NosotrosContent con fondo blanco**: secciones con `bg-brand-white` y textos `text-brand-black` para contraste.

### Features en progreso
- PortfolioGrid también pendiente de migración a datos hardcodeados

### Deuda técnica conocida
- Sin tests automatizados
- Las imágenes de Sanity no tienen sizes/priority optimizados en todos los casos
- TeamCard usa `fill` sin prop `sizes` — puede generar imágenes más grandes de lo necesario
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
├── AnimateInView.tsx          — Generic "use client" wrapper para animaciones scroll-triggered con framer-motion.
│                                Props: { children, className?, as?: "section" | "div", delay?: number }
│                                Por defecto: opacity: 0, y:30 → opacity:1, y:0 con duration 0.6, viewport once amount:0.3
├── blog/
│   ├── PostCard.tsx           — Card para listado de posts. Props: { post: Post }
│   └── PostBody.tsx           — Renderiza Portable Text del body de un post
├── portfolio/
│   └── ProjectCard.tsx        — "use client". Card para grid de proyectos con gradient, logo y hoverImage.
│                                Props: { project: Project, className?, index? }
│                                Comportamiento: gradient inline con gradientFrom/gradientTo (opacity 0 en hover),
│                                logo centrado con Image fill, hoverImage con scale 100→105, animación de entrada
│                                con framer-motion whileInView (stagger según index). Sin shadow. Efecto grow via
│                                clases del padre (flex-[2] en hover).
├── layout/
│   ├── Header.tsx             — Header simplificado que solo renderiza `<Nav />`
│   ├── Nav.tsx                — "use client". Nav component con logo via Image (logoSrc default /brand/isologotipo-white.svg),
│                                links desktop con linkColor/linkHoverColor customizables, CTA + hamburger animado,
│                                menú mobile full overlay con Framer Motion AnimatePresence, scroll behavior (pill flotante),
│                                soporte logoHoverSrc para crossfade en hover.
│                                Props: { logoSrc?, logoHoverSrc?, linkColor?, linkHoverColor?, buttonColorScheme? }
│   ├── Footer.tsx             — Server Component. Sitemap, redes sociales, copyright, contacto. Renderiza `<FooterLogo />`
│                                Props: { logoSrc? }
│   └── FooterLogo.tsx         — "use client". Logo animado del Footer con framer-motion whileInView. Oculto en mobile
│                                Props: { logoSrc? } (default: "/miscelaneous/perro-logo-cut-white.svg")
├── ui/
│   ├── AmbientBlob.tsx        — [SIN USO] Glow animado que rebota con morph shape
│   ├── BackgroundBlob.tsx     — [SIN USO] Wrapper de AmbientBlob
│   ├── Banner.tsx             — Reusable banner (NO "use client"). Props: { title, buttonText, buttonHref: Route }
│                                Renderiza: AnimateInView as="section" > div flex > h2 + Button variant="cta"
│                                Estilos: rounded-[32px] bg-brand-primary-main, text-6xl, flex-col md:flex-row
│   ├── Button.tsx             — "use client". Botón CTA reutilizable (Link de Next.js), 3 variantes: cta, primary, outline.
│                                Arrow con animación diagonal en hover. Variante cta acepta prop `colorScheme` con 4 esquemas:
│                                default (blanco), primary (púrpura), accent (verde lima), dark (negro).
│                                Colores via CSS variables + Tailwind arbitrary values.
│                                Tabla de esquemas:
│                                default:   bg #fff border #fff text #000 arrowBg #000 arrowText #fff
│                                           hoverBg #000 hoverText #fff hoverArrowText #000
│                                primary:   bg #885de3 border #885de3 text #fff arrowBg #fff arrowText #885de3
│                                           hoverBg #6b3fc9 hoverText #fff hoverArrowText #6b3fc9
│                                accent:    bg #c4f875 border #c4f875 text #0a0a0a arrowBg #0a0a0a arrowText #c4f875
│                                           hoverBg #a8e05a hoverText #0a0a0a hoverArrowText #a8e05a
│                                dark:      bg #0a0a0a border #0a0a0a text #fff arrowBg #fff arrowText #0a0a0a
│                                           hoverBg #1a1a1a hoverText #fff hoverArrowText #1a1a1a
│   ├── Chip.tsx               — "use client" con motion.span. Variantes primary / outline (cva).
│                                Outline: hover accent-02 + glow shadow. Retiene text-[13px]
│   └── TeamCard.tsx           — "use client". Card de miembro con framer-motion cardVariants.
│                                BgClass incluye "bg-brand-black". Rol con whitespace-pre-line para \n.
│                                Props tipadas con union types: BgClass, TextColorClass
│                                rounded-3xl, Image fill object-cover (sin sizes)
├── sections/
│   ├── NosotrosContent.tsx    — "use client". Contiene todas las secciones animadas de /nosotros:
│   │                            - Hero con título "Un equipo. Una manada." (clamp 2.5rem-250px), bg-brand-white
│   │                            - Team grid 4 cols con 8 miembros hardcodeados y staggerChildren 0.08
│   │                            - Mission section con heading animado, texto brand-black sobre bg-brand-white
│   │                            Renderiza TeamCard para cada miembro
│   ├── HeroSection.tsx        — "use client". Hero animado: palabras con stagger, GIF de fondo,
│                                itálicas con framer-motion delay. Sin data de Sanity.
│                                overflow-hidden removido, overflow-x-hidden en body
│   ├── ClientsSection.tsx     — "use client". Grilla de logos de clientes con animación whileInView stagger.
│                                13 clientes hardcodeados. Subtítulo "nuestra huella".
│                                Hover: border-radius animado, scale, shadow blanco
│   ├── ServicesSection.tsx    — "use client". Grid de 4 servicios hardcodeados con colores brand,
│                                box-shadow hover con framer-motion
│   ├── ServicesFullScreen.tsx — "use client". 4 secciones full-screen (100vh) para /servicios.
│                                ServiceConfig tipado con union types ServiceBg/ServiceTextColor/ServiceDescColor
│                                Títulos: motion.h3, clamp(5rem,12vw,250px), font-display font-normal
│                                Chips: outline con Chip component, personalizables por servicio
│                                Descripción: bottom-right en desktop
│   ├── StrategySection.tsx    — "use client". Imagen de equipo + título grande + chips flotantes con parallax
│                                (useScroll + useTransform). Velocidad configurable por chip.
│   ├── ContactSection.tsx     — "use client". Grid 2 cols. Headline con palabras animadas + chips outline.
│                                Formulario funcional: Nombre, Compañía, Correo, Mensaje.
│                                Inputs con bg-black, border white rounded-full. Animación scroll con stagger
│   ├── PortfolioGrid.tsx      — Server Component. Grid de proyectos con flex-wrap (no CSS Grid) para permitir
│                                grow effect. Fetch: sanityFetch(projectsQuery) con tags: ["project"].
│                                Lógica de clases responsive: 1 col en mobile, 2 columnas alternadas en md,
│                                3 columnas alternadas en lg. Cada card tiene w-[%] + grow + hover:grow que
│                                empuja a las cards hermanas.
└── common/
    ├── AnimatedText.tsx       — [SIN USO] Texto con animación (Framer Motion)
    └── TransitionWrapper.tsx  — [SIN USO] Wrapper de animaciones de página
```

### AnimateInView (`components/AnimateInView.tsx`)
Componente `"use client"` que abstrae la lógica de animación scroll-triggered de framer-motion.

**Props:**
| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| children | ReactNode | — | Contenido a animar |
| className | string | undefined | Clases adicionales |
| as | "section" \| "div" | "div" | Elemento HTML a renderizar |
| delay | number | 0 | Delay de la animación |

**Comportamiento:** `initial: opacity 0, y:30` → `whileInView: opacity 1, y:0`, viewport `once: true, amount: 0.3`, transition `duration: 0.6, ease: "easeOut"`.

### Banner (`components/ui/Banner.tsx`)
Server Component (NO `"use client"`). Usa `AnimateInView` para la animación, manteniéndose como RSC.

**Props:** `{ title: string; buttonText: string; buttonHref: Route }`

**Estructura:** AnimateInView as="section" > flex container > h2 + Button variant="cta".

### TeamCard (`components/ui/TeamCard.tsx`)
Componente `"use client"` con props tipadas mediante union types.

```
type BgClass = "bg-brand-primary-main" | "bg-brand-accent-01" | "bg-brand-accent-02" | "bg-brand-white" | "bg-brand-black"
type TextColorClass = "text-brand-white" | "text-brand-black"

**Rol:** el `<p>` del rol usa `whitespace-pre-line` para renderizar saltos de línea con `\n`.
```

**Comportamiento:** motion.div con cardVariants (hidden → visible), Image fill object-cover, contenedor `aspect-[4/5]`.

### ServicesFullScreen (`components/sections/ServicesFullScreen.tsx`)
ServiceConfig tipado con union types:
```
type ServiceBg = "bg-brand-primary-main" | "bg-brand-accent-01" | "bg-brand-accent-02" | "bg-brand-white"
type ServiceTextColor = "text-brand-white" | "text-brand-black"
type ServiceDescColor = "text-brand-white" | "text-brand-white/80" | "text-brand-black" | "text-brand-black/70"
```

**Servicios:** Paid Media & SEO (bg-primary-main), Producto (bg-accent-01), Design (bg-accent-02), Social Content (bg-brand-white).

**Animación:** motion.section con sectionVariants (opacity), whileInView, viewport margin "-100px". Títulos motion.h3, chips staggered, descripción con delay.

### Convenciones
- Componentes async cuando fetchan data de Sanity (Server Components)
- Solo se marca "use client" cuando es estrictamente necesario (eventos, hooks, framer-motion)
- Props tipadas con interfaces o union types inline
- Componentes nuevos (Banner) evitan "use client" delegando animaciones a AnimateInView

---

## 4. Schemas de Sanity

### Project (`sanity/schemas/project.ts`)
| Campo | Tipo | Descripción |
|---|---|---|
| title | string | Requerido |
| slug | slug | source: title, requerido |
| client | string | Nombre del cliente |
| logo | image | Logo del cliente para la card |
| gradientFrom | string | Color inicial del gradient (ej: #885de3) |
| gradientTo | string | Color final del gradient (ej: #0a0a0a) |
| order | number | Orden de aparición en la grilla |
| hoverImage | image | Imagen que aparece al hacer hover sobre la card |

**Preview:** `select: { title: "title", subtitle: "client", media: "logo" }`

### Post (`sanity/schemas/post.ts`)
| Campo | Tipo | Descripción |
|---|---|---|
| title | string | Requerido |
| slug | slug | source: title, requerido |
| author | string | Autor del post (texto plano) |
| publishedAt | datetime | Fecha de publicación |
| coverImage | image | Con hotspot |
| excerpt | text | Extracto/resumen |
| body | blockContent | Contenido rich text |
| tags | array of string | Tags |
| seoTitle | string | Título para SEO |
| seoDescription | text | Descripción para SEO |

### Block Content (`sanity/schemas/blockContent.ts`)
Tipo de bloque rich text con soporte para:
- Estilos: normal, h2, h3, h4, blockquote
- Decoradores: bold (strong), italic (em)
- Anotaciones: link con URL
- Imágenes embebidas (con hotspot)
- Code blocks (plugin `@sanity/code-input`)

### Queries GROQ existentes (`sanity/lib/queries.ts`)

| Query | GROQ | Uso |
|---|---|---|
| projectsQuery | `*[_type == "project"] \| order(order asc, title asc)` — solo campos: _id, title, slug, client, logo, gradientFrom, gradientTo, order, hoverImage | Portfolio grid |
| projectBySlugQuery | `*[_type == "project" && slug.current == $slug][0]` — mismos campos que projectsQuery | Detalle de proyecto |
| postsQuery | `*[_type == "post"] \| order(publishedAt desc)` — campos: _id, title, slug, author, publishedAt, coverImage, excerpt, tags | Blog list |
| postBySlugQuery | `*[_type == "post" && slug.current == $slug][0]` — mismos campos + body, seoTitle, seoDescription | Detalle de post |

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
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | ✅ Pública | Site key de Google reCAPTCHA (sin uso activo) | `.env` presente, sin referencia en código |
| `RESEND_API_KEY` | ❌ Servidor | API key de Resend para envío de emails | `lib/email.ts` |
| `CONTACT_EMAIL_TO` | ❌ Servidor | Destino de mensajes del formulario de contacto | `lib/email.ts` (default: `hola@perro.agency`) |

⚠️ **Nota:** El `.env.example` aún lista `REVALIDATION_SECRET` (nombre antiguo). El nombre correcto es `SANITY_REVALIDATE_SECRET`.

---

## 6. Rutas del sitio

| Ruta | Tipo | Data | Archivo |
|---|---|---|---|
| `/` | Estática | Hero → Clients → Services → Strategy → ContactSection | `app/(site)/page.tsx` |
| `/servicios` | Estática | ServicesFullScreen con 4 servicios hardcodeados. Sin Sanity. | `app/(site)/servicios/page.tsx` |
| `/nosotros` | Estática | NosotrosContent (hero, team grid, mission) + Banner. Equipo hardcodeado. | `app/(site)/nosotros/page.tsx` |
| `/portfolio` | Estática | PortfolioHeader + PortfolioGrid (fetch projects con tags: ["project"]) | `app/(site)/portfolio/page.tsx` |
| `/portfolio/[slug]` | Dinámica | Fetch project by slug con tags: ["project"]. Muestra solo título (text-display-xl) y cliente. Sin urlFor, sin body, sin year. | `app/(site)/portfolio/[slug]/page.tsx` |
| `/blog` | Estática | Fetch posts | `app/(site)/blog/page.tsx` |
| `/blog/[slug]` | Dinámica | Fetch post by slug | `app/(site)/blog/[slug]/page.tsx` |
| `/contacto` | Estática | Formulario con Resend + rate limiting | `app/(site)/contacto/page.tsx` |
| `/legal/terminos-y-condiciones` | Estática | Server component, `<p>` único con `<br />`. Sin "use client", sin fetch. | `app/(site)/legal/terminos-y-condiciones/page.tsx` |
| `/legal/politicas-de-privacidad` | Estática | Server component, misma estructura. Sin "use client", sin fetch. | `app/(site)/legal/politicas-de-privacidad/page.tsx` |
| `/studio` | Estática | Sanity Studio embebido | `app/studio/[[...tool]]/page.tsx` |

Cada página renderiza su propio `<Nav />` directamente (no hay Header en el layout). `Footer` se mantiene en el layout compartido.
Fetch calls usan `sanityFetch()` con revalidate: 60 y tags para ISR on-demand.

---

## 7. Design System tokens

### Colores (`tailwind.config.ts`)
```ts
brand: {
  black: "#0a0a0a",
  white: "#ffffff",           // Actualizado de "#f5f5f0" el 2026-05-25
  "primary-main": "#885de3",  // Púrpura
  "accent-01": "#de4a27",     // Rojo
  "accent-02": "#c4f875",     // Verde lima
}
```

**Nota:** Con brand-white = #ffffff, las clases `bg-white` y `bg-brand-white` son equivalentes. Se mantiene `text-brand-white` (no `text-white`) para consistencia.

### Tipografía
| Token | Font | Pesos | Uso |
|---|---|---|---|
| `font-display` | Helvetica Neue (local) | 100, 200, 300, 400, 500, 700, 800, 900 + itálicas | Headings display |
| `font-body` | Helvetica Neue (local) | 100-900 + itálicas (unificado con fontDisplay) | Texto corriente |
| `font-mono` | var(--font-mono) | — | Código |

### Tamaños de texto display
| Clase | Tamaño | Line-height |
|---|---|---|
| `text-display-xl` | `clamp(3rem, 8vw, 7rem)` | 1 |
| `text-display-lg` | `clamp(2rem, 5vw, 4rem)` | 1.1 |
| `text-display-md` | `clamp(1.5rem, 3vw, 2.5rem)` | 1.2 |

### Convenciones de clases
- Uso intensivo de `container mx-auto px-6` para layouts centrados
- Textos secundarios: `text-brand-white/60` o `text-brand-white/70`
- Bordes/separadores: `border-brand-white/10`
- Cards: `border border-brand-white/10 p-8 rounded-lg`
- Botones/link hover: `hover:text-brand-primary-main`

### Layout
- Header: `fixed top-0 left-0 right-0 z-50 bg-brand-black/80 backdrop-blur-md`
- Secciones de página: `py-24`
- Separación entre cards: `gap-8`
- Grids responsivos: `grid gap-8 md:grid-cols-2 lg:grid-cols-3`
- Sin sidebar — layouts de una sola columna con max-width controlado

---

## 8. Decisiones pendientes

- [x] **Formulario de contacto**: definido — se usa Resend (`lib/email.ts`)
- [x] **Mobile navigation**: implementar menú hamburguesa para < md breakpoint
- [x] **Font Display aplicado**: `app/layout.tsx` ahora incluye `fontDisplay.variable` en className del `<html>`
- [x] **Per-page theme system**: se creó y revertió completamente. Decisión final: Nav/Footer único, sin personalización por página.
- [x] **brand-white actualizado**: de `#f5f5f0` a `#ffffff`. `text-white` reemplazado por `text-brand-white` globalmente.
- [x] **Nomenclatura Tailwind**: `text-md` → `text-base`, `font-regular` → `font-normal`, `max-w-8xl` → `max-w-7xl`.
- [x] **Páginas legales**: contenido en un solo `<p>` con `<br />`. Sin "use client".
- [x] **Nav renderizado por página**: se removió `<Header />` del layout. Cada página importa su propio `<Nav />` con props independientes.
- [x] **Button color schemes**: 4 esquemas via prop `colorScheme` con CSS variables.
- [ ] **Blog comments**: ¿se habilita? ¿con qué servicio?
- [ ] **SEO**: definir estrategia de metadata dinámica (más allá del title/description básico)
- [ ] **Performance**: evaluar si conviene SSG + ISR o mantener SSR con revalidate
- [ ] **Analytics**: Vercel Analytics configurado pero sin verificar si se usa
- [x] **`servicesQuery` huérfana**: eliminada junto con los schemas `teamMember` y `service`.
- [x] **Schema `settings` faltante**: eliminado — la query `settingsQuery` también fue eliminada.
- [ ] **reCAPTCHA key sin uso**: en `.env` pero sin código que la referencie.
- [ ] **Componentes sin uso**: `AnimatedText` y `TransitionWrapper` no se importan en ninguna página.
- [ ] **`.env.example` desactualizado**: lista `REVALIDATION_SECRET` en vez de `SANITY_REVALIDATE_SECRET`.
- [ ] **Rate limiting en memoria**: no persiste entre reinicios y no escala horizontalmente.
- [ ] **TeamCard sin `sizes`**: imágenes con `fill` sin `sizes` — evaluar optimización.
- [x] **Sanity features sin uso**: servicios y team migrados a hardcodeado. Schemas `teamMember` y `service` eliminados de Sanity.

---

## 9. Historial de cambios relevantes

| Fecha | Cambio |
|---|---|
| 2026-05-22 | Creación del proyecto |
| 2026-05-22 | Documentación funcional inicial (PROJECT_DOC.md) |
| 2026-05-22 | Creación del agente `analyst` para mantenimiento de doc |
| 2026-05-22 | Auditoría de documentación: 7 discrepancias encontradas y corregidas |
| 2026-05-22 | Integración de Resend para formulario de contacto |
| 2026-05-22 | Creación de `components/ui/Button.tsx` y directorio `components/ui/` |
| 2026-05-22 | Security headers en `next.config.ts` y rate limiting en API de contacto |
| 2026-05-22 | Registro de plugin `codeInput` y Vision Tool condicional en `sanity.config.ts` |
| 2026-05-23 | Migración de Header + Navigation a nuevo Nav component con mobile menu |
| 2026-05-24 | Homepage rediseñada: Hero → Clients → Services → Strategy → PortfolioGrid → TeamSection |
| 2026-05-24 | Nuevos componentes: `ClientsSection.tsx`, `StrategySection.tsx`, `ui/Chip.tsx`, `layout/FooterLogo.tsx` |
| 2026-05-24 | `HeroSection.tsx` convertido a "use client": animación palabra por palabra con stagger |
| 2026-05-24 | `ServicesSection.tsx` convertido a "use client" con datos hardcodeados (sin Sanity) |
| 2026-05-24 | `Footer.tsx` convertido a Server Component — parte animada extraída a `FooterLogo.tsx` |
| 2026-05-24 | `lib/fonts.ts`: pesos thin(100), ultralight(200), light(300) agregados a fontDisplay |
| 2026-05-24 | Fixes varios: shadowColor, rAF loop → useScroll+useTransform, Chip cva, etc. |
| 2026-05-24 | Font Display aplicado en layout.tsx |
| 2026-05-24 | ContactSection creada: grid 2 cols con headline animado, chips outline, formulario funcional |
| 2026-05-24 | Chip outline: hover con border/text accent-02 + glow shadow via framer-motion |
| 2026-05-24 | HeroSection: overflow-hidden removido, overflow-x-hidden en body |
| 2026-05-24 | AmbientBlob + BackgroundBlob: componente de glow animado con morph shape (sin uso) |
| 2026-05-24 | ClientsSection: hover con border-radius animado, scale y shadow blanco |
| 2026-05-24 | Button: arrow animado con desplazamiento diagonal + contenedor con translate-x bounce |
| **2026-05-25** | **brand-white cambiado de `#f5f5f0` a `#ffffff`; `text-white` → `text-brand-white` globalmente** |
| **2026-05-25** | **Nuevos componentes: `AnimateInView`, `Banner`, `TeamCard`, `NosotrosContent`, `ServicesFullScreen`** |
| **2026-05-25** | **Páginas legales: `/legal/terminos-y-condiciones` y `/legal/politicas-de-privacidad`** |
| **2026-05-25** | **`/servicios` rediseñado con ServicesFullScreen (datos hardcodeados, sin Sanity)** |
| **2026-05-25** | **`/nosotros` migrado a hardcodeado — nuevo NosotrosContent + TeamCard** |
| **2026-05-25** | **Per-page theme system creado y revertido — Nav/Footer único en todo el sitio** |
| **2026-05-25** | **Refactor global: `text-md`→`text-base`, `font-regular`→`font-normal`, `max-w-8xl`→`max-w-7xl`** |
| **2026-05-25** | **Union types en TeamCardProps y ServiceConfig** |
| **2026-05-25** | **Button con 4 esquemas de color (`default`, `primary`, `accent`, `dark`) via prop `colorScheme` + CSS variables** |
| **2026-05-25** | **Nav con props custom: `logoSrc`, `logoHoverSrc`, `linkColor`, `linkHoverColor`, `buttonColorScheme`** |
| **2026-05-25** | **Nav renderizado directamente en cada página (Header removido del layout)** |
| **2026-05-25** | **fontBody unificado con todos los pesos 100-900 (igual que fontDisplay)** |
| **2026-05-25** | **TeamCard: BgClass extendido con `bg-brand-black`, rol con `whitespace-pre-line`** |
| **2026-05-25** | **FooterLogo y Footer con nueva prop `logoSrc`** |
| **2026-05-28** | **Portfolio rediseñado: schema project.ts simplificado (logo, gradientFrom/To, hoverImage, order); ProjectCard reescrito "use client" con gradient, logo centrado, hoverImage; PortfolioGrid migrado de grid a flex-wrap con grow effect; CaseStudyBody eliminado; [slug] simplificado (solo título + cliente). Queries simplificadas y ordenadas por order asc, title asc.** |
| **2026-05-28** | **Schemas `teamMember` y `service` eliminados de Sanity. `TeamSection.tsx` eliminado (homepage sin team grid). Equipo migrado a hardcode dentro de `NosotrosContent.tsx` con fotos locales `/team/`. Queries `teamMembersQuery`, `servicesQuery`, `settingsQuery` eliminadas. `Post.author` cambiado de reference a `string`. Interfaces `TeamMember` y `Service` eliminadas de types. Nota de `settingsQuery` eliminada de doc.** |
