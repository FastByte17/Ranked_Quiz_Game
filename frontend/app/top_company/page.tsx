'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { MutableRefObject, useRef, useState } from 'react'
import useSWR from 'swr';
import { fetcher } from '../fetcher';
import { useScoreContext } from '../scoreProvider'
import LoadingCircle from '../components/LoadingCircle';
import Alert from '../components/Alert';
//import Loader from '../components/Loader';
import CountUp from 'react-countup';
import Indicator from '../components/Indicator';
import ImageDescription from '../components/ImageDescription';

export default function TopCompany() {
    const { data: state, isLoading, error } = useSWR(process.env.NEXT_PUBLIC_BASE_URL, fetcher, {
        revalidateOnFocus: false
    });
    const { score, setScore, highScore, setHighScore } = useScoreContext()
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isVisible, setIsVisible] = useState(false);
    const [modalOpenArray, setModalOpenArray] = useState<boolean[]>(Array(state?.length || 0).fill(false));
    const leftContainer = useRef() as MutableRefObject<HTMLDivElement>;
    const rightContainer = useRef() as MutableRefObject<HTMLDivElement>;
    const voteButtons = useRef() as MutableRefObject<HTMLDivElement>;
    const indicator = useRef() as MutableRefObject<HTMLDivElement>;
    const scoreStyle = useRef() as MutableRefObject<HTMLDivElement>;
    const router = useRouter()
    const searchParams = useSearchParams()
    const clockMode = searchParams.get('name')

    const toggleModal = (index: number) => {
        setModalOpenArray((prev) => {
            const newArray = [...prev];
            newArray[index] = !newArray[index];
            return newArray;
        });
    };



    if (isLoading) {
        return <LoadingCircle />;
    }

    if (error) {
        return <Alert />
    }

    const calculate = (answer: string) => {
        if (!state) return;

        leftContainer.current.dataset.slide = 'show';
        rightContainer.current.dataset.slide = 'show';
        voteButtons.current.style.visibility = 'hidden';
        setIsVisible(true);


        if (answer === 'higher' && state[currentIndex - 1]?.rank > state[currentIndex]?.rank) {
            indicator.current.dataset.state = 'correct';
            if (!clockMode) indicator.current.innerText = '👍';
        }
        else if (answer === 'lower' && state[currentIndex - 1]?.rank < state[currentIndex]?.rank) {
            indicator.current.dataset.state = 'correct';
            if (!clockMode) indicator.current.innerText = '👍';
        }
        else {
            indicator.current.dataset.state = 'wrong';
            if (!clockMode) indicator.current.innerText = '👎';
        }

        setTimeout(() => {

            if (indicator.current.dataset.state === 'wrong') {
                return router.push('/')
            }
            leftContainer.current.dataset.slide = 'slide';
            rightContainer.current.dataset.slide = 'slide';
            setIsVisible(false);
            setCurrentIndex((prev) => prev + 1);
            voteButtons.current.style.visibility = 'visible';
            indicator.current.dataset.state = 'pending';
            if (!clockMode) indicator.current.innerText = 'vs';

            setScore((prev) => {
                const value = prev + 1
                if (value > highScore) {
                    localStorage.setItem('highScore', value.toString());
                    setHighScore(value)
                }
                return value
            });

            scoreStyle.current.dataset.score = 'scale';

            setTimeout(() => {
                scoreStyle.current.dataset.score = 'null';
            }, 1000)

        }, 1500)


    }


    if (!state) return null;


    return (
        <div className='h-screen flex overflow-hidden bg-gray-700'>
            {clockMode ? (
                <Indicator indicate={indicator} />
            ) :
                (<div className='indicator' ref={indicator} >
                    VS
                </div>)
            }
            <div id="left-side" data-slide="show" ref={leftContainer}
                className='bg-gray-700 h-full flex flex-col justify-center items-center basis-1/2 gap-2'
            >
                {state[currentIndex - 1]?.imageExists && (
                    <img
                        src={state[currentIndex - 1].image}
                        alt={state[currentIndex - 1].description}
                        className='flex mt-1'
                        onClick={() => toggleModal(currentIndex - 1)}
                    />)}
                <h2 className='font-bold text-white text-2xl'>
                    {state[currentIndex - 1]?.rank}
                </h2>
                <div className='font-bold text-white text-xl'>
                    {state[currentIndex - 1]?.organizationName}
                </div>
                <button className='rounded-md py-2 px-6 text-white text-xl font-semibold invisible'>
                    Next</button>
            </div>

            <ImageDescription isOpen={modalOpenArray[currentIndex - 1]} onClose={() => toggleModal(currentIndex - 1)}>
                <h1 className='text-2xl'>{state[currentIndex - 1]?.organizationName}</h1>
                <p>{state[currentIndex - 1].description}</p>
            </ImageDescription>

            <div id="right-side" data-slide="show" ref={rightContainer}
                className='bg-black h-full flex flex-col justify-center items-center basis-1/2 gap-2'
            >
                {state[currentIndex]?.imageExists && (
                    <img
                        src={state[currentIndex].image}
                        alt={state[currentIndex].description}
                        className='flex mt-14'
                        onClick={() => toggleModal(currentIndex)}
                    />
                )}

                <div
                    className={`text-2xl text-white font-bold ${!isVisible && 'pt-8'}`}
                >
                    {isVisible && <CountUp
                        end={state[currentIndex]?.rank} // end value (dynamic based on your data)
                        duration={.6} // animation duration in seconds
                    />}
                </div>
                <div className='text-xl text-white font-bold'>
                    {state[currentIndex]?.organizationName}
                </div>
                <div ref={voteButtons} className='flex flex-col gap-2'>
                    <button className='bg-green-500/75 rounded-md py-2 px-6 text-white text-xl font-semibold'
                        onClick={() => calculate('higher')}>
                        Higher
                    </button>
                    <button className='bg-red-500/75 rounded-md py-2 px-6 text-white text-xl font-semibold'
                        onClick={() => calculate('lower')}>
                        Lower
                    </button>
                </div>
                <div className='absolute right-[2%] bottom-[5%] text-xl tracking-wide font-bold text-white'
                    ref={scoreStyle}>
                    Score: {score}
                </div>
            </div>

            <ImageDescription isOpen={modalOpenArray[currentIndex]} onClose={() => toggleModal(currentIndex)}>
                <h1 className='text-2xl'>{state[currentIndex]?.organizationName}</h1>
                <p>{state[currentIndex]?.description}</p>
            </ImageDescription>

        </div >
    )
}