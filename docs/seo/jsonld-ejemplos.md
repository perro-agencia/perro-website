# Datos estructurados (JSON-LD) — para insertar en el `<head>`

Cada bloque va dentro de una etiqueta `<script type="application/ld+json">`. Los campos marcados `// COMPLETAR` los tiene que llenar el dev con el dato real antes de subir.

---

## 1. Organization — va en el `<head>` de TODAS las páginas (o al menos en el home)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "PERRO Agency",
  "url": "https://www.perroagency.com/",
  "logo": "https://www.perroagency.com/logo.png",
  "description": "Agencia de marketing digital y diseño especializada en branding, sitios web y performance marketing (Google Ads, Meta, TikTok, LinkedIn).",
  "email": "// COMPLETAR (el mail de contacto público)",
  "sameAs": [
    "https://www.instagram.com/perroagency/",
    "https://www.linkedin.com/company/perroagency/"
  ]
}
</script>
```

---

## 2. Service — para `/brand-website`

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Diseño y desarrollo de sitios web",
  "provider": {
    "@type": "Organization",
    "name": "PERRO Agency",
    "url": "https://www.perroagency.com/"
  },
  "areaServed": "AR",
  "url": "https://www.perroagency.com/brand-website",
  "description": "Diseño y desarrollo de sitios web a medida, con proceso de diagnóstico, diseño/desarrollo y lanzamiento."
}
</script>
```

## 2b. Service — para `/performance-ads`

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Performance Marketing / Publicidad paga",
  "provider": {
    "@type": "Organization",
    "name": "PERRO Agency",
    "url": "https://www.perroagency.com/"
  },
  "areaServed": "AR",
  "url": "https://www.perroagency.com/performance-ads",
  "description": "Gestión y optimización de campañas de publicidad paga en Google Ads, Meta, TikTok y LinkedIn, con foco en ROAS y CAC/LTV. Más de USD 112M gestionados en inversión publicitaria."
}
</script>
```

---

## 3. Article — para CADA post del blog (adaptar título/fechas/autor por post)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "// COMPLETAR (título exacto del post)",
  "datePublished": "// COMPLETAR (fecha real, formato AAAA-MM-DD)",
  "dateModified": "// COMPLETAR",
  "author": {
    "@type": "Person",
    "name": "// COMPLETAR (nombre del autor — hoy los posts no muestran autor, hay que sumarlo)"
  },
  "publisher": {
    "@type": "Organization",
    "name": "PERRO Agency",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.perroagency.com/logo.png"
    }
  },
  "mainEntityOfPage": "// COMPLETAR (URL del post)"
}
</script>
```

Nota: el blog hoy no muestra autor ni fecha visible en ningún post. Además de este JSON-LD, conviene sumar esa info visible en el HTML de cada post (mejora confianza y es contenido que un LLM puede citar con atribución).

---

## 4. LocalBusiness — OPCIONAL, solo si atienden clientes de forma presencial en Buenos Aires

Si PERRO tiene oficina física donde reciben clientes, sumar este bloque (si no, omitir — no forzar una dirección genérica solo por sumar schema):

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "PERRO Agency",
  "url": "https://www.perroagency.com/",
  "telephone": "// COMPLETAR",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "// COMPLETAR",
    "addressLocality": "Buenos Aires",
    "addressCountry": "AR"
  }
}
</script>
```
