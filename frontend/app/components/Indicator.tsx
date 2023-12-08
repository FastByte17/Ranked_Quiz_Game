'use client'
import React, { MutableRefObject, useRef, useState, useEffect, useCallback } from 'react'
import { useScoreContext } from '../scoreProvider'
import { useRouter } from 'next/navigation'

type Props = {
    indicate: MutableRefObject<HTMLDivElement>
}

export default function Indicator({ indicate }: Props) {
    const [isCounting, setisCounting] = useState(true)
    const { isCorrect } = useScoreContext()
    const router = useRouter()
    const secondsLabel = useRef() as MutableRefObject<HTMLLabelElement>;
    const totalSeconds = useRef(4)



    const count = useCallback(() => {
        const id: NodeJS.Timeout = setInterval(() => {
            if (totalSeconds.current === 0) {
                setisCounting(false)
                console.log(isCorrect)
                if (!isCorrect) {
                    clearInterval(id);
                    return router.push('/');
                }
                return clearInterval(id);
            }
            totalSeconds.current -= 1;
            secondsLabel.current.innerHTML = totalSeconds.current.toString();

        }, 1000);

        return () => clearInterval(id);
    }, [isCounting]);

    useEffect(() => {
        const cleanup = count();
        // Cleanup the interval when the component unmounts or when isCounting changes
        return cleanup;
    }, [count]);

    return (
        <div>
            <div className='indicator' ref={indicate}>
                <div className="text-dark text-4xl">
                    <label ref={secondsLabel}>{totalSeconds.current}</label>
                </div>
            </div>
        </div>
    )
}