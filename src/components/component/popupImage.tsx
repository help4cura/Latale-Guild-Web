// PopupImage.tsx
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface PopupImageProps {
    isVisible: boolean;
    onClose: () => void;
}

export default function PopupImage({ isVisible, onClose }: PopupImageProps) {
    const [isButtonVisible, setButtonVisible] = useState(false);
    const popupRef = useRef(null);
    const [animating, setAnimating] = useState(false);

    const checkScrollBottom = () => {
        if (popupRef.current) {
            const { scrollHeight, scrollTop, clientHeight } = popupRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 3) {
                setButtonVisible(true);
            } else {
                setButtonVisible(false);
            }
        }
    };

    const closePopup = () => {
        setAnimating(true);
        setTimeout(() => {
            onClose();
            setAnimating(false);
        }, 500);
    };

    useEffect(() => {
        const toggleBodyScroll = isVisible ? 'hidden' : 'auto';
        document.body.style.overflow = toggleBodyScroll;

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isVisible]);

    return isVisible ? (
        <div
            className={`fixed inset-0 flex flex-col items-center justify-center z-[9999] bg-black bg-opacity-50 overflow-auto ${animating ? 'animate-fadeOut' : 'animate-fadeIn'
                }`}
        >
            <div
                className="relative w-full max-w-[600px] max-h-[30vh] overflow-y-auto"
                ref={popupRef}
                onScroll={checkScrollBottom}
            >
                <button
                    onClick={closePopup}
                    className="fixed top-3 right-3 text-white text-3xl leading-none hover:text-gray-300 focus:outline-none"
                >
                    &times;
                </button>
                <Image unoptimized
                    src="/test.gif"
                    alt="test"
                    layout="responsive"
                    width={600}
                    height={900}
                    className="object-contain"
                />
            </div>
            {isButtonVisible && (
                <a
                    href="https://www.google.com"
                    className="mt-4 inline-block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded shadow-lg transform transition-colors duration-300 ease-in-out"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    길드 지원하기
                </a>
            )}
        </div>
    ) : null;
}
