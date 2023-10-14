import Link from 'next/link'
import Image from 'next/image'

import partnerToto from '../../public/partner-toto.svg'
import serviceBranding from '../../public/service-branding.svg'

export default function Home() {
  return (
    <div className='homeBody'>
      <header>
        <div>
          <Image src={partnerToto}
            alt="partner perro agency toto"
          />
        </div>

        <div>
          <h2>
            we make your company grooow
          </h2>

          <Link href='/contact' className='primary-button'>
          Contactanos
          </Link>
        </div>
      </header>

      <main>
        <div className='homeServices'>
          <div className='serviceTitle'>
            <p>nuestros servicios</p>
            <h3>per<span> </span>ro que ladra, <br /> mueerde</h3>
          </div>

          <div className='serviceBody'>
            <div className='service'>
              <Image src={serviceBranding}
                alt="servicio Branding & Diseño"/>
              
              <div>
                <h4>Branding & Diseño</h4>
                <p>No hacemos logos, creamos marcas únicas. Le damos identidad a tu negocio y su propia historia. También creamos contenido para Social Media y pauta digital.</p>
              </div>
            </div>

            <div className='service'>
              <Image src={serviceBranding}
                alt="servicio Branding & Diseño"/>
              
              <div>
                <h4>Branding & Diseño</h4>
                <p>No hacemos logos, creamos marcas únicas. Le damos identidad a tu negocio y su propia historia. También creamos contenido para Social Media y pauta digital.</p>
              </div>
            </div>

            <div className='service'>
              <Image src={serviceBranding}
                alt="servicio Branding & Diseño"/>
              
              <div>
                <h4>Branding & Diseño</h4>
                <p>No hacemos logos, creamos marcas únicas. Le damos identidad a tu negocio y su propia historia. También creamos contenido para Social Media y pauta digital.</p>
              </div>
            </div>

            <div className='service'>
              <Image src={serviceBranding}
                alt="servicio Branding & Diseño"/>
              
              <div>
                <h4>Branding & Diseño</h4>
                <p>No hacemos logos, creamos marcas únicas. Le damos identidad a tu negocio y su propia historia. También creamos contenido para Social Media y pauta digital.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
