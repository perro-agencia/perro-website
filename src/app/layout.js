import './globals.css'
import { Inter } from 'next/font/google'
import Nav from './components/nav'

const inter = Inter({ subsets: ['latin'] })

const links = [{
  label: 'Home',
  route: '/'
}, {
  label: 'Cultura',
  route: '/cultura'
}]

export const metadata = {
  title: 'Perro Agency',
  description: 'We make your company grooow',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        {children}
      </body>
    </html>
  )
}
