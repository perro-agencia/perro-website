"use client"; 
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head';
import ReCAPTCHA from 'react-google-recaptcha';

import partnerToto from '../../public/partner-toto.svg'
import serviceBranding from '../../public/service-branding.svg'
import serviceSemSeo from '../../public/service-sem&seo.svg'
import serviceSocial from '../../public/service-social.svg'
import serviceUxUi from '../../public/service-uxui.svg'
import clientArcadia from '../../public/client-arcadia.png'
import clientIntergya from '../../public/client-intergya.png'
import clientLatin from '../../public/client-latincloud.png'
import clientMelon from '../../public/client-melonHelp.png'
import clientTienda from '../../public/client-tiendanube.png'
import clientPrusia from '../../public/client-prusia.png'
import clientDevra from '../../public/client-devra.png'
import businessEnhancers from '../../public/businessEnhancers.png'
import gifServices from '../../public/gif-services.gif'
import BlobDark from './components/blobDark'

export default function Home() {
  const videoRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    // Observador de intersección
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // Cuando al menos el 50% del video esté visible
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    observerRef.current = observer;

    // Comienza a observar el elemento de video
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    // Limpia la observación cuando el componente se desmonta
    return () => {
      if (observerRef.current && videoRef.current) {
        observerRef.current.unobserve(videoRef.current);
      }
    };
  }, []);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Si el video está visible, comienza la reproducción
        videoRef.current.play();
      } else {
        // Si el video no está visible, pausa la reproducción
        videoRef.current.pause();
      }
    });
  };

  const [submitted, setSubmitted] = useState(false);
  const [recaptchaAccepted, setRecaptchaAccepted] = useState(false);

  const handleRecaptchaChange = (value) => {
    if (value) {
      setRecaptchaAccepted(true);
    } else {
      setRecaptchaAccepted(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recaptchaAccepted) {
      alert("Por favor, acepta el recaptcha.");
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSubmitted(true);
  };

  return (
    <>
    <Head>
      <title style={{ color: 'red' }}>Perro Agency</title>
    </Head>
    
    <div className='homeBody'>
      <div className='blobOne'>
        <BlobDark />
      </div>

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
          <Image src={gifServices}
            className='gifServices'
            alt="gif servicios perro"/>
          
          <div className='serviceTitle'>
            <p>nuestros servicios</p>
            <h3>per<span> </span>ro que ladra, <br /> mueerde</h3>
          </div>

          <div className='serviceBody'>
            <div className='service'>
              <Image src={serviceSocial}
                alt="servicio Social Media"/>
              
              <div>
                <h4>Social Media</h4>
                <p>Nuestra estrategia en redes va más allá de perfiles, incluye contenido personalizado y atención al cliente efectiva.</p>
              </div>
            </div>

            <div className='service'>
              <Image src={serviceSemSeo}
                alt="servicio SEM & SEO"/>
              
              <div>
                <h4>SEM & SEO</h4>
                <p>Gestionamos y moderamos los perfiles de tu marca en redes sociales a través de estrategias de contenido y atención al cliente.</p>
              </div>
            </div>

            <div className='service'>
              <Image src={serviceBranding}
                alt="servicio Branding & Diseño"/>
              
              <div>
                <h4>Branding & Diseño</h4>
                <p>Creamos marcas únicas, le damos identidad a tu negocio y su historia. También hacemos contenido para Social Media y pauta digital.</p>
              </div>
            </div>

            <div className='service'>
              <Image src={serviceUxUi}
                alt="servicio UX & UI"/>
              
              <div>
                <h4>UX/UI & Desarrollo</h4>
                <p>Hacemos que tu plataforma o website se convierta en una experiencia intuitiva y única que te permita conectar con tus clientes.</p>
              </div>
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

        <div className='homeBusiness'>
          <div className='blobTwo'>
            <BlobDark />
          </div>

          <div className='businessTitle'>
            <p>nosotros</p>
            <h3>businnes<span> </span>s<br/> enhancers</h3>

            <p>Diseñamos la imagen de tu marca, optimizamos las propuestas de valor de servicios y aplicamos las tácticas necesarias para incrementar el crecimiento de los negocios. </p>
          </div>

          <div className="videoContainer">
            <video loop autoPlay muted playsInline controls={false} ref={videoRef} className="videoPlayer">
              <source src="/weareperro_web2.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className='homeContact'>
          <div className="contactForm">
            {submitted ? (
              <div className="formSuccessMessage">
                <p>¡Gracias por enviar el formulario! Nos pondremos en contacto contigo pronto.</p>
              </div>
            ) : (
            <form action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSfcSsokLvG8u93NAJHvzh53xWiT6jWdglPVSCTO72ZZPS4iDA/formResponse"
              target="hidden_iframe"
              onSubmit={handleSubmit}>
              <div>
                <input className="primary-input" type="email" name="entry.646064401" placeholder="Email" />
                <input className="primary-input" type="text" name="entry.1702112212" placeholder="Nombre" />
              </div>

              <div>
                <input className="primary-input" type="text" name="entry.472651491" placeholder="Empresa" />
                <input className="primary-input" type="number" name="entry.406605562" placeholder="Teléfono" />
              </div>

              <div>
                <textarea className="primary-textarea" name="entry.1051704025" cols="30" rows="10" placeholder="Mensaje"></textarea>
              </div>

              <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={handleRecaptchaChange}/>
              <button className="primary-button" type="submit" disabled={!recaptchaAccepted}>Enviar</button>
            </form>
            )}
          </div>

          <div className='contactCopy'>
            <span>contacto</span>
            <h3>
              compartinos tus ideeas
            </h3>

            <p>
              Ponete en contacto con nosotros y preparate para que llevemos tus ideas al siguiente nivel.
            </p>
          </div>
        </div>
      </main>
    </div>
    </>
  )
}
