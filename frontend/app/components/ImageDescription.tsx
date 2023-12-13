import React from 'react'

type Props = {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode
}

export default function ImageDescription({ isOpen, onClose, children }: Props) {

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-md">
                {children}
                <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}