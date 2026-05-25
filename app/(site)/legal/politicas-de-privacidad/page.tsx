import { buildMetadata } from "@/lib/metadata"

export const metadata = buildMetadata({
  title: "Políticas de Privacidad",
  path: "/legal/politicas-de-privacidad",
})

export default function PrivacidadPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="font-display font-light text-center leading-[0.95] -tracking-[0.03em] text-[clamp(2.5rem,8vw,6rem)] text-brand-white mb-16">
          Políticas de Privacidad
        </h1>

        <p className="text-brand-white/80 text-lg leading-relaxed">
          En Perro Agency, nos tomamos muy en serio la privacidad de nuestros usuarios. Esta Política de Privacidad
          describe cómo recopilamos, utilizamos, compartimos y protegemos la información personal que usted nos
          proporciona cuando utiliza nuestro sitio web y nuestros servicios.
          <br /><br />
          <strong className="text-brand-white">Información que recopilamos</strong>
          <br />
          Podemos recopilar información personal que usted nos proporciona voluntariamente, incluyendo su nombre,
          dirección de correo electrónico, número de teléfono y cualquier otra información que decida compartir a
          través de nuestros formularios de contacto o de contratación de servicios.
          <br /><br />
          <strong className="text-brand-white">Cómo utilizamos su información</strong>
          <br />
          Utilizamos la información recopilada para responder a sus consultas, procesar solicitudes de servicio,
          mejorar nuestros productos y servicios, y enviar comunicaciones relacionadas con nuestros servicios
          cuando usted haya consentido recibirlas.
          <br /><br />
          <strong className="text-brand-white">Protección de datos</strong>
          <br />
          Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información
          personal contra el acceso no autorizado, la alteración, la divulgación o la destrucción. Sin embargo,
          ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro.
          <br /><br />
          <strong className="text-brand-white">Sus derechos</strong>
          <br />
          Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales
          en cualquier momento. Para ejercer estos derechos, puede contactarnos a través de
          queonda@perroagency.com.
          <br /><br />
          <strong className="text-brand-white">Cambios en esta política</strong>
          <br />
          Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Le
          recomendamos revisar esta página periódicamente para estar informado de cómo protegemos su información.
          <br /><br />
          <span className="text-brand-white/50 text-sm">Última actualización: mayo de 2026</span>
        </p>
      </div>
    </section>
  )
}
