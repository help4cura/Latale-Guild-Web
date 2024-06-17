import { Afacad } from 'next/font/google';

import { SVGProps } from 'react';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react'; // React를 명시적으로 임포트
import Link from "next/link";
import Sidebar from '@/components/sidebar';
import PopupImage from '@/components/Util/popupImage';

//community.tsx

const afacad = Afacad({
    subsets: ['latin']
});

export default function Community() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const showPopup = () => {
        setIsPopupVisible(true);
    };

    const handlePopupClose = () => {
        setIsPopupVisible(false);
    };

    useEffect(() => {
        document.title = '🤝커뮤니티 - 라테일 [평등] 길드';
    }, []);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200">
            {!isSidebarOpen && (
                <button
                    className="fixed top-0 left-0 p-4"
                    aria-label="Toggle menu"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <div className="space-y-2">
                        <span className="block w-10 h-1 bg-black"></span>
                        <span className="block w-10 h-1 bg-black"></span>
                        <span className="block w-10 h-1 bg-black"></span>
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
            <PopupImage isVisible={isPopupVisible} onClose={handlePopupClose} />
            <div className="flex flex-col flex-1 items-center justify-center" style={{ zoom: "120%" }}> {/* 나머지 페이지 내용 */}

                <div className="w-full max-w-4xl -mt-20 py-2">
                    <div className="container text-black mx-auto flex flex-col items-center gap-4 px-4 md:px-6">
                        <div className="grid gap-2 text-center">
                            <div className="flex flex-col flex-1 items-center justify-center">
                                <header className="py-10">
                                    <Link className="flex items-center justify-center" href="/">
                                        <ScaleIcon className="mb-1 w-1 h-10" />
                                        <span className="sr-only">Oryx</span>
                                    </Link>
                                </header>
                                <h1 className={`${afacad.className} mb-8 text-4xl font-bold tracking-tighter`}>
                                    Contact Us!
                                </h1>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ zoom: "120%" }}>
                            <a
                                href="https://discord.gg/jKhWV42r5z"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md transition-colors duration-300 ease-in-out hover:from-purple-500 hover:to-indigo-500 focus:outline-none"
                            >
                                <div className="bg-white rounded-lg p-2">
                                    <Image
                                        alt="Discord"
                                        className="rounded-lg"
                                        height="64"
                                        src="/discord-color.svg"
                                        style={{ aspectRatio: "1/1", objectFit: "cover" }}
                                        width="64"
                                    />
                                </div>
                                <div className="space-y-1 text-white">
                                    <h1 className={`${afacad.className} text-xl font-bold`}>Discord</h1>
                                    <p className={`${afacad.className} text-sm`}>Join Discord</p>
                                </div>
                            </a>
                            <a
                                href="https://open.kakao.com/o/gYEYha4f"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-400 shadow-md transition-colors duration-300 ease-in-out hover:from-orange-400 hover:to-yellow-400 focus:outline-none"
                            >
                                <div className="bg-white rounded-lg p-2">
                                    <Image
                                        alt="KakaoTalk"
                                        className="rounded-lg"
                                        height="64"
                                        src="/kakaotalk-color.svg"
                                        style={{ aspectRatio: "1/1", objectFit: "cover" }}
                                        width="64"
                                    />
                                </div>
                                <div className="space-y-1 text-white">
                                    <h1 className={`${afacad.className} text-xl font-bold`}>KakaoTalk</h1>
                                    <p className={`${afacad.className} text-sm`}>Join KakaoTalk</p>
                                </div>
                            </a>
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
            className="w-24 h-24"
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


