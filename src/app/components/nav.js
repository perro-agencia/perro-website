import Link from 'next/link'

const links = [{
  label: 'Home',
  route: '/'
}, {
  label: 'Cultura',
  route: '/cultura'
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
