import React from 'react';
import Image from 'next/image'

import BlogTemplate from '../../blogTemplate';
import notaSem from '../../../../../public/blog/nota-sem.png'

const projectData = {
  date: '06-11-2023',
  tag: 'Marketing',
  title: '¿Qué es SEM y para qué sirve? ',
  body: (
    <div>
      <p><strong>¿Qué es SEM?</strong><br /><br />
      La visibilidad en online es esencial para el éxito de cualquier empresa. Una herramienta poderosa para lograrlo es el Search Engine Marketing (SEM), y en Perro Agency estamos aquí para ayudarte a aprovechar al máximo esta estrategia. <br /><br />
      <strong>¿Qué es el SEM y cómo funciona?</strong><br /><br />
      El SEM, o Marketing en Motores de Búsqueda, es una estrategia que utiliza la publicidad online para aumentar la visibilidad de tu negocio en los resultados de búsqueda de Google y otros motores de búsqueda. Funciona mediante la creación de anuncios relevantes que se muestran a los usuarios cuando buscan palabras clave relacionadas con tu industria o negocio.</p>

      <Image src={notaSem}
        alt="..."
      />

      <p>Como pueden ver en la imágen 👆​ los anuncios que muestran por arriba del título de cada anuncio la palabra Sponsored, estos anuncios son los anuncios pagos a los que llamamos anuncios de SEM.<br /><br />
      <strong>Beneficios del SEM:</strong><br /><br />
      Visibilidad instantánea: Tu anuncio aparecerá de inmediato en la parte superior de los resultados de búsqueda, lo que aumenta las posibilidades de que los usuarios hagan clic en tu sitio web.<br /><br />
      <strong>Segmentación precisa:</strong><br /><br />
      Puedes dirigir tus anuncios a públicos específicos según ubicación geográfica, intereses y más.
      Control del presupuesto: Tienes el control total sobre cuánto gastas en publicidad y puedes ajustar tu presupuesto en cualquier momento.<br /><br />
      <strong>Nuestra Experiencia en SEM:</strong><br /><br />
      En Perro Agency, contamos con un equipo de expertos en SEM con años de experiencia en la creación y gestión de campañas exitosas. Hemos ayudado a numerosas empresas a aumentar su visibilidad online y atraer más clientes a sus sitios web.<br /><br />
      <strong>¿Listo para llevar tu presencia online al siguiente nivel?</strong><br /><br />
      Si estás listo para aprovechar al máximo el SEM y aumentar la visibilidad de tu negocio online, no dudes en ponerte en contacto con nosotros en www.perroagency.com . Estamos para diseñar estrategias personalizadas que se adapten a tus necesidades y objetivos.<br /><br />
      No dejes que tu competencia te supere en el mundo digital.</p>
    </div>
  ),
  img: '/partner-pista.svg',
  alt: 'partner pista',
  person: 'Sebastian Konig',
  jobTitle: 'Marketing Director',
};

export default function queEsElMarketing() {
  return (
    <BlogTemplate {...projectData} />
  );
}