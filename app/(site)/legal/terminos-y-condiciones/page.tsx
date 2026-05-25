import { buildMetadata } from "@/lib/metadata"

export const metadata = buildMetadata({
  title: "Términos y Condiciones",
  path: "/legal/terminos-y-condiciones",
})

export default function TerminosPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="font-display font-light text-center leading-[0.95] -tracking-[0.03em] text-[clamp(2.5rem,8vw,6rem)] text-brand-white mb-16">
          Términos & Condiciones
        </h1>

        <div className="prose prose-invert prose-lg max-w-none text-brand-white space-y-6">
          <p>
            La presente Política de Privacidad establece los términos en los que Perro Agency utiliza y protege la
            información que es proporcionada por sus usuarios al momento de utilizar su sitio web. Esta empresa está
            comprometida con la seguridad de los datos de sus usuarios. Cuando le solicitamos completar campos de
            información personal mediante los cuales pueda ser identificado, lo hacemos asegurando que dicha información
            solo se empleará de acuerdo con los términos de este documento. No obstante, esta Política de Privacidad
            puede cambiar con el tiempo o ser actualizada, por lo que recomendamos y enfatizamos revisar continuamente
            esta página para asegurarse de estar de acuerdo con dichos cambios.
          </p>

          <h2 className="font-display text-2xl text-brand-white mt-12 mb-4">Información recopilada</h2>
          <p>
            Nuestro sitio web puede recopilar información personal como nombre, información de contacto —por ejemplo,
            dirección de correo electrónico— y datos demográficos. Asimismo, podrá ser requerida información específica
            cuando sea necesario para procesar un pedido o realizar una entrega o facturación.
          </p>

          <h2 className="font-display text-2xl text-brand-white mt-12 mb-4">Uso de la información recopilada</h2>
          <p>
            Nuestro sitio web utiliza la información con el fin de brindar el mejor servicio posible, en particular
            para mantener un registro de usuarios, gestionar pedidos cuando corresponda y mejorar nuestros productos y
            servicios. Es posible que se envíen correos electrónicos periódicos a través de nuestro sitio web con
            ofertas especiales, nuevos productos u otra información promocional que consideremos relevante o beneficiosa
            para usted. Estos correos serán enviados a la dirección que usted proporcione y podrá darse de baja en
            cualquier momento.
          </p>
          <p>
            Perro Agency está altamente comprometida con el cumplimiento de su obligación de mantener su información
            segura. Utilizamos los sistemas más avanzados y los actualizamos constantemente para asegurar que no exista
            ningún acceso no autorizado.
          </p>

          <h2 className="font-display text-2xl text-brand-white mt-12 mb-4">Cookies</h2>
          <p>
            Una cookie se refiere a un archivo que se envía con el propósito de solicitar permiso para almacenarse en
            su computadora. Al aceptar dicho permiso, el archivo se crea y la cookie sirve para recopilar información
            sobre el tráfico web y facilitar futuras visitas a un sitio recurrente. Otra función de las cookies es que
            permiten a los sitios web reconocerlo individualmente y, por lo tanto, brindarle un servicio más
            personalizado.
          </p>
          <p>
            Nuestro sitio web utiliza cookies para identificar las páginas que se visitan y la frecuencia con la que se
            hace. Esta información se utiliza únicamente con fines estadísticos y luego es eliminada de forma
            permanente. Usted puede eliminar las cookies en cualquier momento desde su computadora. Sin embargo, las
            cookies ayudan a proporcionar un mejor servicio de los sitios web; no otorgan acceso a información de su
            computadora ni a información personal, a menos que usted decida proporcionarla directamente. Usted puede
            aceptar o rechazar el uso de cookies; sin embargo, la mayoría de los navegadores aceptan cookies
            automáticamente, ya que ayudan a ofrecer una mejor experiencia web. También puede modificar la
            configuración de su computadora para rechazar las cookies. Si decide rechazarlas, es posible que no pueda
            utilizar algunos de nuestros servicios.
          </p>

          <h2 className="font-display text-2xl text-brand-white mt-12 mb-4">Enlaces a terceros</h2>
          <p>
            Este sitio web puede contener enlaces a otros sitios que pueden ser de su interés. Una vez que usted hace
            clic en estos enlaces y abandona nuestro sitio, ya no tenemos control sobre el sitio al que es redirigido
            y, por lo tanto, no somos responsables de los términos, la privacidad ni la protección de sus datos en
            dichos sitios de terceros. Estos sitios están sujetos a sus propias políticas de privacidad, por lo que se
            recomienda consultarlas para confirmar que está de acuerdo con ellas.
          </p>

          <h2 className="font-display text-2xl text-brand-white mt-12 mb-4">
            Control de su información personal
          </h2>
          <p>
            En cualquier momento, usted puede restringir la recopilación o el uso de la información personal
            proporcionada a nuestro sitio web. Cada vez que se le solicite completar un formulario, como un formulario
            de registro de usuario, puede marcar o desmarcar la opción para recibir información por correo electrónico.
            En caso de haber optado por recibir nuestro boletín o materiales promocionales, puede cancelarlos en
            cualquier momento.
          </p>
          <p>
            Esta empresa no venderá, cederá ni distribuirá la información personal recopilada sin su consentimiento,
            salvo que sea requerido por un juez mediante una orden judicial.
          </p>
          <p>
            Perro Agency se reserva el derecho de modificar los términos de la presente Política de Privacidad en
            cualquier momento.
          </p>
        </div>
      </div>
    </section>
  )
}
