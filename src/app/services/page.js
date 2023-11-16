import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'

import BlobDark from '../components/blobDark'

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>Perro Agency || Servicios</title>
      </Head>

      <div className='servicesBody'>
        <div className='blobOne'>
          <BlobDark />
        </div>

        <header>
          <p>nuestros servicios</p>
          
          <h2>
            per<span> </span>ro que laadra, <br /> mueerde
          </h2>
        </header>

        <main>
          <div className='servicesItems'>
            <div className='item'>
              <h4>sem & seo</h4>
              <p>Gestionamos y moderamos los perfiles de tu marca en redes sociales a través de estrategias de contenido y atención al cliente.</p>
            </div>

            <div className='item'>
              <h4>social <br/> media</h4>
              <p>Podés elegir cualquiera de nuestros servicios y solicitar una consultoría personalizada según la necesidad de tu proyecto.</p>
            </div>

            <div className='item'>
              <h4>Branding & Diseño</h4>
              <p>Creamos marcas únicas, le damos identidad a tu negocio y su historia. También hacemos contenido para Social Media y pauta digital.</p>
            </div>
            
            <div className='item'>
              <h4>UX/UI & <br/> Desar<span> </span>rol<span> </span>lo</h4>
              <p>Diseñando flujos de navegación hacemos que tu plataforma/website se convierta en una experiencia intuitiva y única que te permita conectar con tus clientes.</p>
            </div>

            <div className='item'>
              <h4>consultoría</h4>
              <p>Podés elegir cualquiera de nuestros servicios y solicitar una consultoría personalizada según la necesidad de tu proyecto.</p>
            </div>
          </div>

          <div className='blobTwo'>
              <BlobDark />
            </div>
        </main>
      </div>
    </>
  )
}