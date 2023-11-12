import Link from 'next/link'
import Image from 'next/image'

import imgSabuesos from '../../../public/img-sabuesos.jpg'
import usSebas from '../../../public/us-sebas.jpg'
import usLau from '../../../public/us-lau.jpg'
import usFede from '../../../public/us-fede.jpg'
import usMaga from '../../../public/us-maga.jpg'
import clientArcadia from '../../../public/client-arcadia.png'
import clientIntergya from '../../../public/client-intergya.png'
import clientLatin from '../../../public/client-latincloud.png'
import clientMelon from '../../../public/client-melonHelp.png'
import clientTienda from '../../../public/client-tiendanube.png'
import BlobDark from '../components/blobDark'

export default function CulturePage() {
  return (
    <div className='cultureBody'>
      <div className='blobOne'>
        <BlobDark />
      </div>

      <header>
        <h2>
          sabbuesos del munndo digitaal
        </h2>

        <Image src={imgSabuesos}
          alt="partner perro agency toto"
        />
      </header>

      <main>
        <div className='cultureCrew'>
          <div className='crewTitle'>
            <p>nosotros</p>
            <h3>per<span> </span>ro creew</h3>
            <p className='crewDescrip'>Somos un equipo de jóvenes profesionales con conocimiento nativo del entorno digital. A través de la experiencia adquirida en Marketing y Branding en empresas reales, logramos alinear exitosamente las estrategias necesarias para sumar valor a los negocios.</p>
          </div>
          
          <div className='crewItems'>
            <div className='item'>
              <Image src={usSebas}
                alt="partner perro agency toto"
              />
              <h4>Sebastian Konig</h4>
              <p>marketing director <br/> paid media specialist</p>
            </div>

            <div className='item'>
              <Image src={usLau}
                alt="partner perro agency toto"
              />
              <h4>Laura Rovira</h4>
              <p>art design <br/> director</p>
            </div>

            <div className='item'>
              <Image src={usFede}
                alt="partner perro agency toto"
              />
              <h4>Federico Gilles</h4>
              <p>product design <br/> director</p>
            </div>

            <div className='item'>
              <Image src={usMaga}
                alt="partner perro agency toto"
              />
              <h4>Magali Cuartas</h4>
              <p>content creator lead</p>
            </div>
          </div>

          <div className='clients'>

            <div className='clientsTitle'>
              <p>nuestros clientes</p>
              <h3>confían en <br/> nosootros</h3>
            </div>
            
            <div className='clientsCarousel'>
              <div className='carouselTrack'>
                <Image src={clientArcadia}
                  alt="cliente"/>

                <Image src={clientIntergya}
                  alt="cliente"/>

                <Image src={clientLatin}
                  alt="cliente"/>

                <Image src={clientMelon}
                  alt="cliente"/>

                <Image src={clientTienda}
                  alt="cliente"/>
              </div>

              <div className='carouselTrack'>
                <Image src={clientArcadia}
                  alt="cliente"/>

                <Image src={clientIntergya}
                  alt="cliente"/>

                <Image src={clientLatin}
                  alt="cliente"/>

                <Image src={clientMelon}
                  alt="cliente"/>

                <Image src={clientTienda}
                  alt="cliente"/>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}