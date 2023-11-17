'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react';

export default function Home({ score, setScore }) {
  const { current } = useRef('ranked');
  const hasPlayed = score > 0;
  return (
    <div className="flex flex-col items-center gap-24 w-screen h-screen px-4 pt-[5%]">
      <div>
        <div id="label">
          {current.split('').map((letter, index) => (
            <span
              key={letter + index}
              className="text-7xl capitalize font-Catamaran font-bold tracking-wider"
            >
              {letter}
            </span>
          ))}

        </div>
        <h1 className='text-xl font-Catamaran'>Guess the highest market value!</h1>
      </div>
      <button type="button">
        <Link href={''} onClick={() => setScore(0)}>
          {hasPlayed ? 'PLAY AGAIN' : 'PLAY'}
        </Link>
      </button>
      {hasPlayed && (<div>Total Points: {score}</div>)}
    </div>
  )
}
