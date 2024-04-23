import { Afacad } from 'next/font/google';

import { SVGProps } from 'react';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react'; // React를 명시적으로 임포트
import Link from "next/link";
import Sidebar from '@/components/component/sidebar';
import PopupImage from '@/components/component/popupImage';


//community.tsx

const afacad = Afacad({
    subsets: ['latin']
});

export default function Giveaway() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const showPopup = () => {
        setIsPopupVisible(true);
    };

    const handlePopupClose = () => {
        setIsPopupVisible(false);
    };

    useEffect(() => {
        document.title = '🎉추첨 - 라테일 [평등] 길드';
    }, []);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200">
            {!isSidebarOpen && (
                <button
                    className="fixed top-0 left-0 p-4 z-50"
                    aria-label="Toggle menu"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <div className="space-y-2">
                        <span className="block w-8 h-0.5 bg-black"></span>
                        <span className="block w-8 h-0.5 bg-black"></span>
                        <span className="block w-8 h-0.5 bg-black"></span>
                    </div>
                </button>
            )}
            {isSidebarOpen && (
                <Sidebar
                    isOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    showPopup={showPopup}
                />
            )}
            <div className="flex flex-col flex-1 items-center justify-center"> {/* 나머지 페이지 내용 */}
                <PopupImage isVisible={isPopupVisible} onClose={handlePopupClose} />
            </div>
            <div
                key="1"
                className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-br from-orange-200 via-red-100 to-purple-200 py-12 md:py-24" >
                <div className="max-w-4xl px-4 md:px-6">
                    <h1 className={`${afacad.className} text-4xl md:text-6xl font-bold text-white mb-8 text-center`}>
                        <Link className="flex items-center justify-center" href="/">
                            <ScaleIcon className="mb-1 w-1 h-10" />
                            <span className="sr-only">Oryx</span>
                        </Link>
                    </h1>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="bg-[#6B46C1] text-white p-8 flex flex-col items-center justify-center">
                                <h2 className={`${afacad.className} text-2xl md:text-3xl font-bold mb-4`}>Time Remaining</h2>
                                <div className="flex items-center space-x-6 text-5xl font-bold">
                                    <div className={`${afacad.className} flex flex-col items-center`}>
                                        <span id="days">99</span>
                                        <span className={`${afacad.className} text-lg font-normal`}>Days</span>
                                    </div>
                                    <div className={`${afacad.className} flex flex-col items-center`}>
                                        <span id="hours">23</span>
                                        <span className={`${afacad.className} text-lg font-normal`}>Hours</span>
                                    </div>
                                    <div className={`${afacad.className} flex flex-col items-center`}>
                                        <span id="minutes">59</span>
                                        <span className={`${afacad.className} text-lg font-normal`}>Minutes</span>
                                    </div>
                                    <div className={`${afacad.className} flex flex-col items-center`}>
                                        <span id="seconds">59</span>
                                        <span className={`${afacad.className} text-lg font-normal`}>Seconds</span>
                                    </div>
                                </div>
                                <div className={`${afacad.className} mt-8 text-2xl font-bold`}>
                                    <span>0 Joined</span>
                                </div>
                            </div>
                            <div className="p-8 flex flex-col items-center justify-center">
                                <h2 className={`${afacad.className} text-2xl md:text-3xl font-bold mb-4`}>Prize</h2>
                                <div className="flex items-center mb-4">
                                    <Image
                                        alt="Prize"
                                        className="rounded-full mr-4"
                                        height={100}
                                        src="tile_11_11.png"
                                        style={{
                                            aspectRatio: "100/100",
                                            objectFit: "cover",
                                        }}
                                        width={100}
                                    />
                                    <div>
                                        <h3 className={`${afacad.className} text-xl font-bold`}>로얄 상자</h3>
                                        <p className={`${afacad.className} text-gray-500`}>x30</p>
                                    </div>
                                </div>
                                <div className="space-y-4 w-full">
                                    <div className="space-y-2">
                                        <label htmlFor="nickname" className={`${afacad.className} block text-sm font-medium text-gray-700`}>
                                            Nickname
                                        </label>
                                        <input
                                            id="nickname"
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            placeholder="Enter your nickname"
                                        />
                                    </div>
                                    <button
                                        className={`${afacad.className}w-30 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-700 hover:bg-purple-600 mx-auto`}>
                                        Enter Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ScaleIcon(props: SVGProps<SVGSVGElement>) {
    const gradientRef = useRef<SVGLinearGradientElement>(null);

    useEffect(() => {
        const gradient = gradientRef.current;
        let rotateAngle = 0;

        const animate = () => {
            rotateAngle = (rotateAngle + 1) % 360;
            if (gradient) {
                gradient.setAttribute('gradientTransform', `rotate(${rotateAngle}, 0.5, 0.5)`);
            }
            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-20 h-20"
        >
            <defs>
                <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="0%" y2="100%" ref={gradientRef}>
                    <stop offset="0%" stopColor="#6a82fb" />
                    <stop offset="100%" stopColor="#b892ff" />
                </linearGradient>
            </defs>
            <g stroke="url(#animatedGradient)" strokeWidth={2}>
                <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2 M7 21h10 M12 3v18" />
            </g>
        </svg>
    );
};
