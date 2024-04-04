import React from 'react';
import Link from 'next/link'
import Image from 'next/image'

export default function BlogCard({ id, link, img, alt, title, tag, date }) {
  return (
    <div className='blogCard' id={id}>
      <Link href={link}>
        <div className='itemImage'>
          <Image src={img}
            alt={alt}
            width={100}
            height={100}
            quality={100}
            unoptimized={true}
            priority
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
  );
}
