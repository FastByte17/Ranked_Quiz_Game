'use client'
import React, { MutableRefObject, useRef, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
    indicate: MutableRefObject<HTMLDivElement>
}

export default function Indicator({ indicate }: Props) {
    const [isCounting, setisCounting] = useState(true)
    const secondsLabel = useRef() as MutableRefObject<HTMLLabelElement>;
    const totalSeconds = useRef(10)
    const router = useRouter()



    const count = useCallback(() => {
        const id: NodeJS.Timeout = setInterval(() => {
            if (totalSeconds.current === 0 || indicate.current.dataset.state === 'wrong') {
                setisCounting(false)
                if (!indicate.current.dataset.state || indicate.current.dataset.state === 'pending') {
                    clearInterval(id)
                    return router.push('/');
                }
                return clearInterval(id)

            } else if (indicate.current.dataset.state === 'correct') {
                return totalSeconds.current = 10
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
                {indicate.current?.dataset?.state === 'correct' ? '👍' :
                    indicate.current?.dataset?.state === 'wrong' ? '👎' :
                        (
                            <div className="text-dark text-4xl">
                                <label ref={secondsLabel}>{totalSeconds.current}</label>
                            </div>
                        )}
            </div>
        </div>
    )
}