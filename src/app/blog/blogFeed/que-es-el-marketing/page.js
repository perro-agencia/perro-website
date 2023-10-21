import React from 'react';
import BlogTemplate from '../../blogTemplate';

const projectData = {
  title: '¿Qué es SEM y para qué sirve? ',
  body: '¿Qué es SEM? La visibilidad en online es esencial para el éxito de cualquier empresa. Una herramienta poderosa para lograrlo es el Search Engine Marketing (SEM), y en Perro Agency estamos aquí para ayudarte a aprovechar al máximo esta estrategia. ¿Qué es el SEM y cómo funciona? El SEM, o Marketing en Motores de Búsqueda, es una estrategia que utiliza la publicidad online para aumentar la visibilidad de tu negocio en los resultados de búsqueda de Google y otros motores de búsqueda. Funciona mediante la creación de anuncios relevantes que se muestran a los usuarios cuando buscan palabras clave relacionadas con tu industria o negocio.',
};

export default function queEsElMarketing() {
  return (
    <BlogTemplate {...projectData} />
  );
}