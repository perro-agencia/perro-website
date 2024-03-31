"use client"; 
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Head from 'next/head';

import BlobDark from "../components/blobDark"

export default function ContactPage() {
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
        <title>Perro Agency || Contacto</title>
      </Head>

      <div className='contactBody'>
        <div className='blobOne'>
          <BlobDark />
        </div>
        
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

        <div className="contactCopy">
          <h2>
            contannos tus ideeas
          </h2>

          <p>
            Ponete en contacto con nosotros y preparate para que llevemos tus ideas al siguiente nivel.
          </p>
        </div>
      </div>
    </>
  )
}