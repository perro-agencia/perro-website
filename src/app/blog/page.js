"use client"; 
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image'

import blogTest from '../../../public/blog-test.png'

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

    setActiveButton(newFilter); // Establece el botón activo al hacer clic
  };

  return (
    <div className='blogBody'>
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
            <button onClick={() => handleFilter('cultura')} data-filter="cultura" className={activeButton === 'cultura' ? 'active' : ''}>Cultura</button>   
          </div>

          <div className='blogItems'>
            <div className='item' id="marketing">
              <Link href='/blog/blogFeed/que-es-el-sem'>
                <div className='itemImage'>
                  <Image src={blogTest}
                    alt="partner perro agency toto"
                  />
                </div>
                
                <div className='itemCopy'>
                  <h5>¿Qué es SEM y para qué sirve?</h5>

                  <div>
                    <p>Marketing</p>

                    <span>Oct 2023</span>
                  </div>
                </div>
              </Link>
            </div>

            <div className='item' id="marketing">
              <Link href='/blog/blogFeed/domina-el-seo'>
                <div className='itemImage'>
                  <Image src={blogTest}
                    alt="partner perro agency toto"
                  />
                </div>
                
                <div className='itemCopy'>
                  <h5>Domina el SEO para impulsar tu Presencia online</h5>

                  <div>
                    <p>Marketing</p>

                    <span>Oct 2023</span>
                  </div>
                </div>
              </Link>
            </div>

            <div className='item' id="marketing">
              <Link href='/blog/blogFeed/sem-vs-seo'>
                <div className='itemImage'>
                  <Image src={blogTest}
                    alt="partner perro agency toto"
                  />
                </div>
                
                <div className='itemCopy'>
                  <h5>SEM vs SEO</h5>

                  <div>
                    <p>Marketing</p>

                    <span>Nov 2023</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}