import Link from 'next/link'
import Image from 'next/image'

import partnerToto from '../../public/partner-toto.svg'

export default function Home() {
  return (
    <div className='homeBody'>
      <header>
        <div>
          <Image src={partnerToto}
            alt="partner perro agency toto"
          />
        </div>

        <div>
          <h2>
            we make your company grooow
          </h2>

          <Link href='/contact' className='primary-button'>
          Contactanos
          </Link>
        </div>
      </header>
      
    </div>
  )
}
