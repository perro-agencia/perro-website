"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image'

import BlogCard from '../components/cards/blogCard';
import BlobDark from '../components/blobDark';

const blogCard1 = {
  id:'marketing',
  link:'/blog/blogFeed/que-es-el-sem',
  img:'/blog-test.png',
  alt:'Que es el sem',
  title:'¿Qué es SEM y para qué sirve?',
  tag:'Marketing',
  date:'Oct 2023',
};

const blogCard2 = {
  id:'marketing',
  link:'/blog/blogFeed/domina-el-seo',
  img:'/blog-test.png',
  alt:'Domina el seo',
  title:'Domina el SEO para impulsar tu Presencia online',
  tag:'Marketing',
  date:'Oct 2023',
};

const blogCard3 = {
  id:'marketing',
  link:'/blog/blogFeed/sem-vs-seo',
  img:'/blog-test.png',
  alt:'sem vs seo',
  title:'SEM vs SEO',
  tag:'Marketing',
  date:'Oct 2023',
};

const blogCard4 = {
  id:'marketing',
  link:'/blog/blogFeed/maximiza-tu-alcance-con-reels',
  img:'/blog-test.png',
  alt:'Maximizando tu Alcance con Reels y Contenidos Estáticos',
  title:'Maximizando tu Alcance con Reels y Contenidos Estáticos',
  tag:'Marketing',
  date:'Nov 2023',
};

const blogCard5 = {
  id:'marketing',
  link:'/blog/blogFeed/seleccionar-con-vision',
  img:'/blog-test.png',
  alt:'Seleccionar con Visión: Agencias de Marketing Digital que Potencian tu Inversión',
  title:'Seleccionar con Visión',
  tag:'Marketing',
  date:'Nov 2023',
};

const blogCard6 = {
  id:'marketing',
  link:'/blog/blogFeed/inteligencia-artificial-en-el-marketing-digital',
  img:'/blog-test.png',
  alt:'Inteligencia Artificial en el Marketing Digital',
  title:'Inteligencia Artificial en el Marketing Digital',
  tag:'Marketing',
  date:'Nov 2023',
};

export default function BlogPage() {
  const [filter, setFilter] = useState('all');
  const [activeButton, setActiveButton] = useState('all');

  useEffect(() => {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
      if (filter === 'all' || item.id === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }, [filter]);

  const handleFilter = (newFilter) => {
    if (newFilter === 'all') {
      setFilter('all');
    } else {
      setFilter(newFilter);
    }

    setActiveButton(newFilter);
  };

  return (
    <div className='blogBody'>
      <div className='blobOne'>
        <BlobDark />
      </div>
      
      <header>
        <p>decimos lo que pensamos</p>
        
        <h2>
          a otrro per<span> </span>ro <br/> con ese huueso
        </h2>
      </header>

      <main>
        <div className='blogContainer'>
          <div className='blogNav'>
            <button onClick={() => handleFilter('all')} data-filter="all" className={activeButton === 'all' ? 'active' : ''}>Todas</button>
            <button onClick={() => handleFilter('marketing')} data-filter="marketing" className={activeButton === 'marketing' ? 'active' : ''}>Marketing</button>
          </div>

          <div className='blogItems'>
            <BlogCard {...blogCard1} />
            <BlogCard {...blogCard2} />
            <BlogCard {...blogCard3} />
            <BlogCard {...blogCard4} />
            <BlogCard {...blogCard5} />
            <BlogCard {...blogCard6} />
          </div>
        </div>
      </main>
    </div>
  )
}