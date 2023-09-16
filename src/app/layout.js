import './styles/styles.scss'
import { font } from './font.js'
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
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
