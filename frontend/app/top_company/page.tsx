import React from 'react'

type Props = {}

export default function page({ }: Props) {


    return (
        <div className='h-screen flex overflow-hidden bg-gray-700'>
            <div className='indicator'>
                VS
            </div>
            <div id="left-side"
                className='bg-gray-700 h-full flex flex-col justify-center items-center basis-1/2 gap-2'>
                <img /* company-logo */ />
                <h2>
                    {/* RANK */}
                </h2>
                <button className='rounded-md py-2 px-6 text-white text-xl font-semibold'>
                    next</button>
            </div>
            <div id="right-side"
                className='bg-black h-full flex flex-col justify-center items-center basis-1/2 gap-2'>
                <h2>
                    {/* rank */}
                </h2>
                <div>
                    {/* organization name */}
                </div>
                <div>
                    <button className='bg-green-500/75 rounded-md py-2 px-6 text-white text-xl font-semibold'>
                        Higher
                    </button>
                    <button className='bg-red-500/75 rounded-md py-2 px-6 text-white text-xl font-semibold'>
                        Lower
                    </button>
                </div>
                <div>
                    Score:
                </div>
            </div>
        </div>
    )
}