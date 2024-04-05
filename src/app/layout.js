import { font } from './font.js'
import Link from 'next/link'
import Head from 'next/head'

import './styles/styles.scss'
import Nav from './components/nav'
import Footer from './components/footer'

export const metadata = {
  title: 'Perro Agency',
  description: 'We make your company grooow',
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <html lang="en" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WJMXBSP');
            `,
          }}
        />
      </Head>
      <body className={font.className}>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WJMXBSP"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <div id='top'></div>
        <Nav id="nav"/>
        {children}
        
        <Link href="#top">
          <svg className='backToTop' width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M71 36C71 16.67 55.33 0.999998 36 0.999998C16.67 0.999999 0.999998 16.67 0.999998 36C0.999999 55.33 16.67 71 36 71C55.33 71 71 55.33 71 36Z"  stroke-width="2"/>
            <path d="M35.5585 51.4634L35.5585 21.5261"stroke-width="2"/>
            <path d="M26.3075 30.1003C35.6486 30.1003 35.576 20.8319 35.576 20.8319C35.576 20.8319 35.6892 30.1003 44.8444 30.1003"  stroke-width="2" stroke-linejoin="round"/>
          </svg>
        </Link>
        
        <Footer />
      </body>
    </>
  )
}
