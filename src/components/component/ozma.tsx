/**
 * @tsx react-jsx
 */
"use client";

//ozma.tsx

//Import
import { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import Sidebar from './sidebar';
import PopupImage from './popupImage';
import { SVGProps } from 'react';
import Image from 'next/image';

//Fonts
import { Afacad } from 'next/font/google';

const afacad = Afacad({
  subsets: ['latin']
});

//Component Start
export function _ozma() {

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  const showPopup = () => {
    setIsPopupVisible(true);
  };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPosition = window.scrollY + window.innerHeight;

    if (scrollPosition / scrollHeight > 0.01) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleScroll);

    // 팝업이 활성화되면 외부 스크롤을 비활성화
    const toggleBodyScroll = isVisible ? 'hidden' : 'auto';
    document.body.style.overflow = toggleBodyScroll;

    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거 및 스크롤 재활성화
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto';
    };
  }, [isVisible]);  // isVisible이 변경될 때마다 useEffect 실행

  return (
    <div className="flex min-h-screen bg-gray-200">
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
        <header className="py-12 z-50">
          <Link className="flex items-center justify-center" href="#">
            <ScaleIcon className="mb-1 w-1 h-10" />
            <span className="sr-only">Oryx</span>
          </Link>
        </header>




        {/*
        <Image src="/logo.png" alt="" width={128} height={128} />
        */}
        <main className="container px-4 md:px-6 flex flex-col items-center justify-center space-y-8 max-w-3xl">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative w-full max-w-[300px] h-[300px] overflow-auto rounded-xl shadow-lg z-50">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4c4cff] to-[#ff4c4c] opacity-50 rounded-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-6 text-gray-50 max-w-md">
                    <h2 className={`${afacad.className} text-3xl font-bold`}>Welcome!</h2>
                    <p className={`${afacad.className} text-lg`}>
                      We&apos;ve been waiting just for you.
                    </p>
                  </div>
                </div>
              </div>
              <Image
                alt="Poster"
                className="object-cover w-full h-full rounded-xl"
                height={300}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/300",
                  objectFit: "cover",
                }}
                width={300}
              />
            </div>
            <div className="z-50 space-y-2 text-center">
              <h1 className={`${afacad.className} text-3xl font-bold tracking-tighter text-gray-800 sm:text-4xl md:text-5xl`}>Join us!</h1>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
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