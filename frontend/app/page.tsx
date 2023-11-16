'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <div>
        <div>

        </div>
        <h1>Guess the highest market value</h1>
      </div>
      <button type="button">Play!
        <Link href={''}>
        </Link>
      </button>
      <div>Total Points:</div>
    </div>
  )
}
