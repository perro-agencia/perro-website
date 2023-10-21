import React from 'react';
import Link from 'next/link'

export default function BlogTemplate({ title, body, body2 }) {
  return (
    <div className="blogTemplateBody">
      <Link href='../../blog'>
        Volver
      </Link>
      <h1>{title}</h1>
      <p>{body}</p>
      <p>{body2}</p>
    </div>
  );
}