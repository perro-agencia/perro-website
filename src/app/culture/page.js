import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'

import imgSabuesos from '../../../public/partner-pista.svg'
import usSebas from '../../../public/us-sebas.jpg'
import usFede from '../../../public/us-fede.jpg'
import usSebaLugo from '../../../public/us-sebalugo.jpg'
import usAbi from '../../../public/us-abi.jpg'
import usEmi from '../../../public/us-emi.jpg'
import clientArcadia from '../../../public/client-arcadia.png'
import clientIntergya from '../../../public/client-intergya.png'
import clientLatin from '../../../public/client-latincloud.png'
import clientMelon from '../../../public/client-melonHelp.png'
import clientTienda from '../../../public/client-tiendanube.png'
import clientPrusia from '../../../public/client-prusia.png'
import clientDevra from '../../../public/client-devra.png'
import gifContact from '../../../public/gif-contact.gif'
import BlobDark from '../components/blobDark'

export default function CulturePage() {
  return (
    <>
      <Head>
        <title>Perro Agency || Cultura</title>
      </Head>

      <div className='cultureBody'>
        <div className='blobOne'>
          <BlobDark />
        </div>

        <header>
          <h2 className='h-mobile'>
            sabuesos del mundo digital
          </h2>

          <h2 className='h-desktop'>
            sabbuesos del mundo digitaal
          </h2>

          <Image src={imgSabuesos}
            alt="partner perro agency toto"
          />
        </header>

        <main>
          <div className='cultureCrew'>
            <Image src={gifContact}
              alt='gif happy clients'
              className='gifContact'/>

            <div className='crewTitle'>
              <p>nosotros</p>
              <h3>per<span> </span>ro creew</h3>
              <p className='crewDescrip'>Somos un equipo de jóvenes profesionales con conocimiento nativo del entorno digital. A través de la experiencia adquirida en Marketing y Branding en empresas reales, logramos alinear exitosamente las estrategias necesarias para sumar valor a los negocios.</p>
            </div>
            
            <div className='crewItems'>
              <div className='item'>
                <Image src={usSebas}
                  alt="partner Sebastian Konig"
                />
                <h4>Sebastian Konig</h4>
                <p>CEO - Founder <br/> marketing director <br/> paid media specialist</p>
              </div>

              <div className='item'>
                <Image src={usFede}
                  alt="partner Federico Gilles"
                />
                <h4>Federico Gilles</h4>
                <p>Founder <br/> product design <br/> director</p>
              </div>

              <div className='item'>
                <Image src={usSebaLugo}
                  alt="partner Magali Cuartas"
                />
                <h4>Sebastián Lugo</h4>
                <p>Head of Paid Media</p>
              </div>

              <div className='item'>
                <Image src={usAbi}
                  alt="partner Abraham Villa"
                />
                <h4>Abraham Villa</h4>
                <p>SEO strategist</p>
              </div>

              <div className='item'>
                <Image src={usEmi}
                  alt="partner Emiliano Mario Elias"
                />
                <h4>Emiliano Mario Elias</h4>
                <p>Motion Designer</p>
              </div>
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

                  <Image src={clientLatin}
                    alt="cliente"/>

                  <Image src={clientMelon}
                    alt="cliente"/>

                  <Image src={clientTienda}
                    alt="cliente"/>
                  
                  <Image src={clientPrusia}
                    alt="cliente"/>

                  <Image src={clientDevra}
                    alt="cliente"/>
                </div>

                <div className='carouselTrack'>
                  <Image src={clientArcadia}
                    alt="cliente"/>

                  <Image src={clientLatin}
                    alt="cliente"/>

                  <Image src={clientMelon}
                    alt="cliente"/>

                  <Image src={clientTienda}
                    alt="cliente"/>

                  <Image src={clientPrusia}
                    alt="cliente"/>

                  <Image src={clientDevra}
                    alt="cliente"/>
                </div>
              </div>
            </div>
        </main>
      </div>
    </>
  )
}