import Link from 'next/link'

const links = [{
  label: 'Home',
  route: '/'
}, {
  label: 'Cultura',
  route: '/cultura'
}, {
  label: 'Portfolio',
  route: '/portfolio'
}, {
  label: 'Contacto',
  route: '/contacto'
}]

export default function Nav() {
  return (
    <nav>
      <ul>
        {links.map(({label, route}) => (
          <li key={route}>
            <Link href={route}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
