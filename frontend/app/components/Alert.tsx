import React from 'react'

interface AlertProps {
    error?: {
        message: string;
    };
}

export default function Alert({ error }: AlertProps) {
    return (
        <div
            role='alert'
        >
            <div>
                {error?.message ? error.message : 'Something went wrong...'}
            </div>
        </div>
    )
}