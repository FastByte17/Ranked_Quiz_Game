'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react';
import { useScoreContext } from './scoreProvider'

export default function Home() {
  const { score, setScore } = useScoreContext()
  const { current } = useRef('ranked');
  const hasPlayed = score > 0;
  return (
    <div className="flex flex-col items-center gap-24 w-screen h-screen px-4 pt-[5%]">
      <div className='text-center px-2 space-y-4'>
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
      <button type="button" className='capitalize py-2.5 px-5 mr-2 mb-2 text-2xl font-bold
       tracking-wide text-white focus:outline-none bg-transparent rounded-lg border border-gray-200
        hover:bg-blue-500 focus:z-10 focus:ring-1 focus:ring-gray-200'>
        <Link href={'/top_company'} onClick={() => setScore(0)}>
          {hasPlayed ? 'PLAY AGAIN' : 'PLAY'}
        </Link>
      </button>
      <div>
        {hasPlayed && (<div>Total Points: {score}</div>)}
      </div>
    </div>
  )
}
