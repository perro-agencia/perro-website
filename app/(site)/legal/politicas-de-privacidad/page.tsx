import { buildMetadata } from "@/lib/metadata"

export const metadata = buildMetadata({
  title: "Políticas de Privacidad",
  path: "/legal/politicas-de-privacidad",
})

export default function PrivacidadPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-center font-display font-light leading-[0.95] -tracking-[0.03em] text-[clamp(2.5rem,8vw,6rem)] text-brand-white mb-16">
          Políticas de Privacidad
        </h1>

        <div className="prose prose-invert prose-lg max-w-none text-brand-white space-y-6">
          <p>
            En Perro Agency, nos tomamos muy en serio la privacidad de nuestros usuarios. Esta Política de Privacidad
            describe cómo recopilamos, utilizamos, compartimos y protegemos la información personal que usted nos
            proporciona cuando utiliza nuestro sitio web y nuestros servicios.
          </p>

          <h2 className="font-display text-2xl text-brand-white mt-12 mb-4">
            Información que recopilamos
          </h2>
          <p>
            Podemos recopilar información personal que usted nos proporciona voluntariamente, incluyendo su nombre,
            dirección de correo electrónico, número de teléfono y cualquier otra información que decida compartir a
            través de nuestros formularios de contacto o de contratación de servicios.
          </p>

          <h2 className="font-display text-2xl text-brand-white mt-12 mb-4">
            Cómo utilizamos su información
          </h2>
          <p>
            Utilizamos la información recopilada para responder a sus consultas, procesar solicitudes de servicio,
            mejorar nuestros productos y servicios, y enviar comunicaciones relacionadas con nuestros servicios
            cuando usted haya consentido recibirlas.
          </p>

          <h2 className="font-display text-2xl text-brand-white mt-12 mb-4">
            Protección de datos
          </h2>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información
            personal contra el acceso no autorizado, la alteración, la divulgación o la destrucción. Sin embargo,
            ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro.
          </p>

          <h2 className="font-display text-2xl text-brand-white mt-12 mb-4">
            Sus derechos
          </h2>
          <p>
            Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales
            en cualquier momento. Para ejercer estos derechos, puede contactarnos a través de
            queonda@perroagency.com.
          </p>

          <h2 className="font-display text-2xl text-brand-white mt-12 mb-4">
            Cambios en esta política
          </h2>
          <p>
            Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Le
            recomendamos revisar esta página periódicamente para estar informado de cómo protegemos su información.
          </p>

          <p className="text-brand-white/50 text-sm pt-8">
            Última actualización: mayo de 2026
          </p>
        </div>
      </div>
    </section>
  )
}
