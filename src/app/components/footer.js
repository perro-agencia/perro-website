import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className='footerSocial'>
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

      <div className='footerContact'>
        <div>
          <p>
            buscanos en:
          </p>
          
          <Link href='mailto:queonda@perroagency.com' target="_blank" rel="noopener noreferrer">
            queonda@perroagency.com
          </Link>
        </div>

        <div>
          <p>
            actualmente en:
          </p>

          <h6>
            buenos aires - argentina
          </h6>
        </div>
      </div>

      <p className='footerPrivacy'>
        <strong>© PERRO Agency 2022.</strong> All rights reserved. Your access to the website is subject to our Terms of Use.
        <Link href='/terms'>
          Privacy policy.
        </Link>
      </p>
    </footer>
  )
}
