import React from 'react';
import Link from 'next/link'

export default function blogCard({ id, link, img, alt, title, tag, date }) {
  return (
    <div className='blogCard' id={id}>
      <Link href={link}>
        <div className='itemImage'>
          <Image src={img}
            alt={alt}
          />
        </div>
        
        <div className='itemCopy'>
          <h5>{title}</h5>

          <div>
            <p>{tag}</p>

            <span>{date}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}
