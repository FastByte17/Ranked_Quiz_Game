import React from 'react';

export default function LoadingCircle() {
    const ar = Array.from({ length: 3 }, (_, i) => i);
    return (
        <div role='status'>
            <div className='container'>
                {ar.map((_, i) => {
                    return (
                        <div
                            key={i}
                            style={{ '--i': `${i}` } as React.CSSProperties}
                            className='spinner'
                        />
                    );
                })}
            </div>
            <span className=''>Loading...</span>
        </div>
    );
}
