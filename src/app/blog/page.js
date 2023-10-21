import Link from 'next/link'
import Image from 'next/image'

import blogTest from '../../../public/blog-test.png'

export default function BlogPage() {
  return (
    <div className='blogBody'>
      <header>
        <p>decimos lo que pensamos</p>
        
        <h2>
          a otrro per<span> </span>ro <br/> con ese huueso
        </h2>
      </header>

      <main>
        <div className='blogContainer'>
          <div className="blogNav">
            
          </div>

          <div className='blogItems'>
            <div className='item'>
              <Image src={blogTest}
                alt="partner perro agency toto"
              />
              
              <div className='itemCopy'>
                <h5>¿Qué es SEM y para qué sirve?</h5>

                <div>
                  <p>Marketing</p>

                  <span>Nov 2023</span>
                </div>
              </div>
            </div>

            <div className='item'>
              <Image src={blogTest}
                alt="partner perro agency toto"
              />
              
              <div className='itemCopy'>
                <h5>¿Qué es SEM y para qué sirve? ¿Qué es SEM y para qué sirve?</h5>

                <div>
                  <p>Marketing</p>

                  <span>Nov 2023</span>
                </div>
              </div>
            </div>

            <div className='item'>
              <Image src={blogTest}
                alt="partner perro agency toto"
              />
              
              <div className='itemCopy'>
                <h5>¿Qué es SEM y para qué sirve?</h5>

                <div>
                  <p>Marketing</p>

                  <span>Nov 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}