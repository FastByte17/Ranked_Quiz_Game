import React from 'react';

const Loader = () => {
    const arr: number[] = Array.from({ length: 3 }, (_, i) => i);
    const colors: string[] = ['red', 'green', 'yellow']
    //[0,1,2]
    return (
        <div className="container">
            {arr.map((_, i) => {
                return (
                    <div
                        key={i}
                        style={{ '--i': i, background: colors[i] } as React.CSSProperties}
                        className="circle"
                    />
                );
            })}
        </div>
    );
};

export default Loader;