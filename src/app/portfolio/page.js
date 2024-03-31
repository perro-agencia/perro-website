import Link from 'next/link'
import Image from 'next/image'

import portfolioTest from '../../../public/portfolio-test.png'

export default function PortfolioPage() {
  return (
    <div className='portfolioBody'>
      <header>
        <p>portfolio</p>
        
        <h2>
          dejaamos <br/> nueestra huel<span> </span>la
        </h2>
      </header>

      <main>
        <div className='portfolioItems'>
          <div className='item'>
            <Image src={portfolioTest}
              alt="..."
            />
            
            <div className='itemCopy'>
              <h5>tiendanube</h5>
              <div>
                <p>Social media</p>
                <span>2023</span>
              </div>
            </div>
          </div>

          <div className='item'>
            <Image src={portfolioTest}
              alt="..."
            />
            
            <div className='itemCopy'>
              <h5>tiendanube</h5>
              <div>
                <p>Social media</p>
                <span>2023</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}