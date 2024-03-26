"use client";
import React, { useState, useEffect } from 'react';
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
            <div className='item item1'>
              <h4>sem & seo</h4>
              <p>Para potenciar la visibilidad en línea de tu negocio, gestionamos estratégicamente la publicidad SEM en diversas plataformas. Complementamos esta estrategia con sólidas tácticas de SEO, mejorando la posición de tu negocio en los resultados de búsqueda y aumentando la calidad del tráfico dirigido a tu sitio. Nuestra aproximación integral abarca desde la investigación de palabras clave hasta la optimización técnica, asegurando resultados duraderos.</p>
            </div>

            <div className='item item2'>
              <h4>social <br/> media</h4>
              <p>Nuestro enfoque en Social Media va más allá de la gestión de perfiles. Implementamos estrategias de contenido personalizado y ofrecemos una atención al cliente efectiva para construir y mantener relaciones sólidas con tu audiencia en las redes sociales.</p>
            </div>

            <div className='item item3'>
              <h4>Branding & Diseño</h4>
              <p>Nos especializamos en la creación de marcas que trascienden más allá de simples logos. Desarrollamos identidades que cuentan la historia única de tu negocio, generando conexiones emocionales con tu audiencia. Nuestro enfoque se centra en la esencia de tu marca, creando una identidad visual coherente y significativa. Además, creamos contenido cautivador para maximizar tu presencia en línea y optimizar estrategias para pautas digitales.</p>
            </div>
            
            <div className='item item4'>
              <h4>UX/UI & <br/> Desar<span> </span>rol<span> </span>lo</h4>
              <p>Nuestra metodología se centra en potenciar la experiencia del usuario y optimizar los tiempos de desarrollo. Encabezamos sesiones de trabajo colaborativas donde exploramos y refinamos conceptos para luego proceder a la creación de prototipos para validar nuestras ideas. Este enfoque nos permite no solo garantizar interfaces intuitivas, sino también asegurar una navegación fluida. Nuestro objetivo es fusionar el diseño de interfaz y el desarrollo de manera eficiente, priorizando siempre la experiencia del usuario en cada paso del proceso.</p>
            </div>

            <div className='item item5'>
              <h4>consultoría</h4>
              <p>Ofrecemos servicios de consultoría personalizada para adaptarnos a las necesidades específicas de tu proyecto. Puedes elegir cualquiera de nuestros servicios y obtener asesoramiento experto para maximizar el impacto de tu estrategia digital.</p>
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