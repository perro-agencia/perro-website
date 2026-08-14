# Dominio canónico y redirects — instrucciones para el dev

## Decisión
Dominio definitivo: **https://www.perroagency.com**
Dominio secundario a retirar de circulación: **perro.agency**

## Qué hay que hacer

1. **Redirect 301 permanente**: `perro.agency` (y `www.perro.agency` si existe) → `https://www.perroagency.com` en el mismo path (ej. `perro.agency/servicios` → `https://www.perroagency.com/servicios`, no todo a la home).
2. **Canonical tags**: en cada página del sitio nuevo, el `<link rel="canonical">` debe apuntar a la propia URL en `www.perroagency.com`, nunca a `perro.agency`. Ejemplo para la home:
   ```html
   <link rel="canonical" href="https://www.perroagency.com/" />
   ```
3. **Consistencia de `www`**: decidir si HTTP a secas (`perroagency.com`) también redirige a `www.perroagency.com` con 301 (recomendado, para no tener dos versiones sirviendo contenido).
4. **HTTPS forzado**: cualquier request a `http://` debe redirigir 301 a `https://`.
5. **Sitemap y robots.txt**: usar siempre `https://www.perroagency.com/...` como base (ver `sitemap.xml` y `robots.txt` adjuntos).
6. **Actualizar donde corresponda**: Google Search Console (agregar/verificar la propiedad `www.perroagency.com` si no está), Google Business Profile, redes sociales (bio de Instagram/LinkedIn), firmas de mail — todo lo que hoy linkee a `perro.agency` debería actualizarse a `perroagency.com` con el tiempo, aunque el redirect 301 cubre la funcionalidad mientras tanto.

## Por qué importa
Hoy las páginas declaran canonical hacia `perro.agency` mientras el sitio se sirve en `www.perroagency.com`. Esto divide la autoridad entre dos dominios y confunde tanto a buscadores como a los crawlers que alimentan a los modelos de IA sobre cuál es la fuente "real" de cada página.
