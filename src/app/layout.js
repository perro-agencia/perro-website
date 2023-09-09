import './globals.scss'
import './styles/styles.scss'
import { font } from './font.js'
import Nav from './components/nav'

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
      </body>
    </html>
  )
}
