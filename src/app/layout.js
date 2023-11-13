import { font } from './font.js'
import Link from 'next/link'

import './styles/styles.scss'
import Nav from './components/nav'
import Footer from './components/footer'

export const metadata = {
  title: 'Perro Agency',
  description: 'We make your company grooow',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Nav id="nav"/>
        {children}
        
        <Link href="#nav">
          <svg className='backToTop' width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M71 36C71 16.67 55.33 0.999998 36 0.999998C16.67 0.999999 0.999998 16.67 0.999998 36C0.999999 55.33 16.67 71 36 71C55.33 71 71 55.33 71 36Z" stroke="#6000FF" stroke-width="2"/>
            <path d="M35.5585 51.4634L35.5585 21.5261" stroke="#6000FF" stroke-width="2"/>
            <path d="M26.3075 30.1003C35.6486 30.1003 35.576 20.8319 35.576 20.8319C35.576 20.8319 35.6892 30.1003 44.8444 30.1003" stroke="#6000FF" stroke-width="2" stroke-linejoin="round"/>
          </svg>
        </Link>
        
        <Footer />
      </body>
    </html>
  )
}
