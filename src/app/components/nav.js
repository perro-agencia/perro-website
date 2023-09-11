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
  label: 'Portfolio',
  route: '/portfolio'
}, {
  label: 'Contact',
  route: '/contact'
}, {
  label: 'Services',
  route: '/services'
}]

export default function Nav() {
  return (
    <nav>
      <div className='navHeader'>
        <Image src={perroIsologo}
          alt="Picture of the author"
        />

        <p>
          cerrar
        </p>
      </div>

      <ul className='navBody'>
        {links.map(({label, route}) => (
          <li key={route}>
            <Link href={route}>
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
  )
}
