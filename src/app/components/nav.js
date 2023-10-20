"use client"; 
import { useState, useEffect } from "react";

import Link from 'next/link'
import Image from 'next/image'

import perroIsologo from '../../../public/perroIsologo.svg'

const links = [{
  label: 'Home',
  route: '/'
}, {
  label: 'Culture',
  route: '/culture'
}, {
  label: 'Services',
  route: '/services'
  
}, {
  label: 'Portfolio',
  route: '/portfolio'
}, {
  label: 'Blog',
  route: '/blog'
}, {
  label: 'Contact',
  route: '/contact'
}]

export default function Nav() {
  const [isNavVisible, setNavVisible] = useState(false);

  useEffect(() => {
    if (isNavVisible) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }

    return () => {
      document.documentElement.style.overflow = 'auto';
    };
  }, [isNavVisible]);

  const toggleNavVisibility = () => {
    setNavVisible(!isNavVisible);
  };

  const hideNavOnClick = () => {
    setNavVisible(false);
  };
  
  return (
    <div className="navContainer">
      <nav style={{ display: isNavVisible ? 'flex' : 'none' }}>
        <div className='navHeader'>
          <Image className='perrologo' src={perroIsologo}
            alt="isologo perro agency"
          />

          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={toggleNavVisibility}>
            <rect x="1.35849" width="32.0198" height="1.92119" transform="rotate(45 1.35849 0)" fill="#F08200"/>
            <rect y="22.6415" width="32.0198" height="1.92119" transform="rotate(-45 0 22.6415)" fill="#F08200"/>
          </svg>
        </div>

        <ul className='navBody'>
          {links.map(({label, route}) => (
            <li key={route}>
              <Link href={route} onClick={hideNavOnClick}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className='navFooter'>
          <p>
            Buscanos en:
          </p>
          
          <ul>
            <li>
              <Link href='https://www.instagram.com/perroagency/'  target="_blank" rel="noopener noreferrer">
                instagram
              </Link>
            </li>

            <li>
              -
            </li>

            <li>
              <Link href='https://www.instagram.com/perroagency/'  target="_blank" rel="noopener noreferrer">
                twitter
              </Link>
            </li>

            <li>
              -
            </li>
            
            <li>
              <Link href='https://www.linkedin.com/company/perroagency' target="_blank" rel="noopener noreferrer">
                linkedin
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className='navbar'>
        <Link href='/'>
          <Image src={perroIsologo}
                alt="Picture of the author"
            />
        </Link>

        <svg viewBox="0 0 48 29" fill="none" onClick={toggleNavVisibility}>
          <rect width="31" height="3" fill="#5E00FA"/>
          <rect y="13" width="48" height="3" fill="#5E00FA"/>
          <rect y="26" width="48" height="3" fill="#5E00FA"/>
        </svg>
      </div>
    </div>
  )
}
