# PERRO Website — Documentación Funcional

## 1. Estado actual del proyecto

**Última actualización:** 2026-05-22

### Features completadas
- Homepage con Hero, Servicios, Portfolio y Team section (data desde Sanity)
- Página de servicios (`/servicios`)
- Página "Nosotros" con equipo (`/nosotros`)
- Página de portfolio con grid + detalle por proyecto (`/portfolio`, `/portfolio/[slug]`)
- Página de blog con listado + detalle por post (`/blog`, `/blog/[slug]`)
- Sanity Studio embebido en `/studio`
- Sitemap dinámico y robots.txt
- Draft mode y revalidación on-demand vía API routes
- Header con navegación principal (fixed, backdrop blur)
- Footer con copyright dinámico

### Features en progreso
- *Ninguna por el momento*

### Deuda técnica conocida
- Página de contacto (`/contacto`) sin formulario funcional — solo texto placeholder
- Sin tests automatizados
- Sin componentes de mobile navigation (menú hamburguesa)
- Las imágenes de Sanity no tienen sizes/priority optimizados en todos los casos
- No hay loading states / skeletons para las páginas que fetchan datos

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
| typescript | ^5.8.3 | Tipado estático |

### Decisiones técnicas (ADRs)

- **Next.js App Router** sobre Pages Router — mejor soporte para React Server Components y layouts anidados.
- **Sanity como headless CMS** — el equipo necesita que el contenido sea fácilmente editable por no-devs.
- **Tailwind CSS** sin componentes de UI externos — mínimo peso, control total del diseño, consistencia con el brand.
- **pnpm** como package manager por velocidad y eficiencia de disco.
- **RSC (Server Components)** para todas las secciones que obtienen data de Sanity — menos JS enviado al cliente.

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
│   ├── Header.tsx           — Header fixed con logo + Navigation
│   ├── Navigation.tsx       — Nav links con active state (usePathname). "use client"
│   └── Footer.tsx           — Footer simple con logo y copyright
├── sections/
│   ├── HeroSection.tsx      — Hero de homepage (estático, sin data de Sanity)
│   ├── ServicesSection.tsx  — Grid de servicios. Fetch: sanityFetch(servicesQuery)
│   ├── PortfolioGrid.tsx    — Grid de proyectos. Fetch: sanityFetch(projectsQuery)
│   └── TeamSection.tsx      — Grid de miembros con foto. Fetch: sanityFetch(teamMembersQuery)
└── common/
    ├── AnimatedText.tsx     — Texto con animación (Framer Motion)
    └── TransitionWrapper.tsx — Wrapper de animaciones de página
```

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
| servicesQuery | `*[_type == "service"] \| order(order asc)` | Services section |
| settingsQuery | `*[_type == "settings"][0]` | Configuración general |

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

⚠️ **Nota:** El `.env.example` aún lista `REVALIDATION_SECRET` (nombre antiguo). El nombre correcto usado en código es `SANITY_REVALIDATE_SECRET`. Pendiente actualizar `.env.example`.

---

## 6. Rutas del sitio

| Ruta | Tipo | Data | Archivo |
|---|---|---|---|
| `/` | Estática | Hero estático + fetch services, projects, team | `app/(site)/page.tsx` |
| `/servicios` | Estática | Fetch services | `app/(site)/servicios/page.tsx` |
| `/nosotros` | Estática | Fetch team members | `app/(site)/nosotros/page.tsx` |
| `/portfolio` | Estática | Fetch projects | `app/(site)/portfolio/page.tsx` |
| `/portfolio/[slug]` | Dinámica | Fetch project by slug | `app/(site)/portfolio/[slug]/page.tsx` |
| `/blog` | Estática | Fetch posts | `app/(site)/blog/page.tsx` |
| `/blog/[slug]` | Dinámica | Fetch post by slug | `app/(site)/blog/[slug]/page.tsx` |
| `/contacto` | Estática | Sin fetch (placeholder) | `app/(site)/contacto/page.tsx` |
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
| Token | Font | Tamaño |
|---|---|---|
| `font-display` | DM Sans | Para headings display |
| `font-body` | Inter | Para texto corriente |
| `font-mono` | var(--font-mono) | Para código |

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

---

## 8. Decisiones pendientes

- [ ] **Formulario de contacto**: definir servicio/API (EmailJS, Resend, Nodemailer, etc.)
- [ ] **Mobile navigation**: implementar menú hamburguesa para < md breakpoint
- [ ] **Blog comments**: ¿se habilita? ¿con qué servicio?
- [ ] **SEO**: definir estrategia de metadata dinámica (más allá del title/description básico)
- [ ] **Performance**: evaluar si conviene SSG + ISR o mantener SSR con revalidate
- [ ] **Analytics**: Vercel Analytics configurado pero sin verificar si se usa
- [ ] **Font Display no aplicado**: `lib/fonts.ts` exporta `fontDisplay` (DM Sans) pero `app/layout.tsx` solo aplica `fontBody.variable` en el `<html>`. La clase `font-display` usada en componentes referencia `var(--font-display)` que nunca se define. Decidir si se agrega al root layout.
- [ ] **Schema `settings` faltante**: `sanity/lib/queries.ts` exporta `settingsQuery` pero no existe schema `settings` en `sanity/schemas/`. Decidir si se crea o se elimina la query.
- [ ] **reCAPTCHA key sin uso**: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` está en `.env` pero no hay código que la referencie. Posible vestigio de un intento de formulario.
- [ ] **Componentes sin uso**: `AnimatedText` y `TransitionWrapper` existen en `components/common/` pero no se importan en ninguna página. Evaluar si se integran o se eliminan.
- [ ] **`.env.example` desactualizado**: lista `REVALIDATION_SECRET` pero el código usa `SANITY_REVALIDATE_SECRET`. Actualizar el ejemplo.

---

## 9. Historial de cambios relevantes

| Fecha | Cambio |
|---|---|
| 2026-05-22 | Creación del proyecto |
| 2026-05-22 | Documentación funcional inicial (PROJECT_DOC.md) |
| 2026-05-22 | Creación del agente `analyst` para mantenimiento de doc |
| 2026-05-22 | Auditoría de documentación: 7 discrepancias encontradas y corregidas (stack, env vars, schemas, decisiones pendientes) |
