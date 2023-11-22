'use client'

import Link from 'next/link';
import React, { useRef, useState } from 'react'
import useSWR from 'swr';
import { getData } from '../getData';

type Props = {}

export default function page({ score, setScore }) {

    const [currentIndex, setCurrentIndex] = useState(1);
    const leftContainer = useRef(null);
    const rightContainer = useRef(null);
    const voteButtons = useRef(null);
    const rankView = useRef(null);
    const indicator = useRef(null);

    const { data: state, isLoading, error } = useSWR('/api/companies/', getData);

    const calculate = (answer) => {
        leftContainer.current.dataset.slide = 'show';
        rightContainer.current.dataset.slide = 'show';
        voteButtons.current.style.visibility = 'hidden';
        rankView.style.visibility = 'visible';

        if (answer === 'higher' && state[currentIndex - 1]?.rank > state[currentIndex]?.rank) {
            indicator.current.dataset.state = 'correct';
            indicator.current.innerText = '✔️';
        }
        else if (answer === 'lower' && state[currentIndex - 1]?.rank < state[currentIndex]?.rank) {
            indicator.current.dataset.state = 'correct';
            indicator.current.innerText = '✔️';
        }
        else {
            indicator.current.dataset.state = 'wrong';
            indicator.current.innerText = '❌';
        }

        setTimeout(() => {
            if (indicator.current.dataset.state === 'wrong') {
                return <Link href={'/'}></Link>;
            }
            leftContainer.current.dataset.slide = 'slide';
            rightContainer.current.dataset.slide = 'slide';
            rankView.current.style.visibility = 'hidden';
            setCurrentIndex((prev) => prev + 1);
            voteButtons.current.style.visibility = 'visible';
            indicator.current.dataset.state = 'pending';
            indicator.current.innerText = 'vs';
            setScore((prev) => prev + 1);
        }, 1500)
    }

    return (
        <div className='h-screen flex overflow-hidden bg-gray-700'>
            <div className='indicator' ref={indicator} data-state="pending">
                VS
            </div>
            <div id="left-side" data-slide="show" ref={leftContainer}
                className='bg-gray-700 h-full flex flex-col justify-center items-center basis-1/2 gap-2'>
                {state[currentIndex - 1]?.imageExists && (
                    <img
                        src={state[currentIndex - 1].image}
                        alt={state[currentIndex - 1].description}
                        className='flex'
                    />)}
                <h2>
                    {state[currentIndex - 1]?.rank}
                </h2>
                <div className=''>
                    {state[currentIndex - 1]?.organizationName}
                </div>
                <button className='rounded-md py-2 px-6 text-white text-xl font-semibold'>
                    Next</button>
            </div>
            <div id="right-side" data-slide="show" ref={rightContainer}
                className='bg-black h-full flex flex-col justify-center items-center basis-1/2 gap-2'>
                {state[currentIndex]?.imageExists && (
                    <img
                        src={state[currentIndex].image}
                        alt={state[currentIndex].description}
                        className='flex'
                    />
                )}
                <h2
                    ref={rankView}
                    className='text-2xl'
                >
                    {state[currentIndex]?.rank}
                </h2>
                <div className='text-xl'>
                    {state[currentIndex]?.organizationName}
                </div>
                <div ref={voteButtons} className='flex'>
                    <button className='bg-green-500/75 rounded-md py-2 px-6 text-white text-xl font-semibold'
                        onClick={() => calculate('higher')}>
                        Higher
                    </button>
                    <button className='bg-red-500/75 rounded-md py-2 px-6 text-white text-xl font-semibold'
                        onClick={() => calculate('lower')}>
                        Lower
                    </button>
                </div>
                <div>
                    Score: {score}
                </div>
            </div>
        </div>
    )
}