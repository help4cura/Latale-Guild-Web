import { useState } from 'react';
import { SVGProps } from 'react';
import Register from '@/components/component/register';

export default function RegisterButton() {
    const [isOpen, setOpen] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    const handleButtonClick = () => {
        if (isOpen) {
            setIsFadingOut(true);
            setTimeout(() => {
                setIsFadingOut(false);
                setOpen(false);
            }, 500); // 애니메이션 지속 시간과 일치하도록 조정 (0.5s)
        } else {
            setOpen(true);
        }
    };

    return (
        <div className="fixed right-4 top-3 z-50">
            <div className="relative inline-block">
                <button
                    onClick={handleButtonClick}
                    className="flex items-center space-x-3 rounded-md px-3 py-2 hover:bg-gray-300 focus:outline-none"
                    style={{ all: 'unset', cursor: 'pointer' }}
                >
                    <UserInfoIcon className="mb-1 w-6 h-6" />
                </button>
                {(isOpen || isFadingOut) && (
                    <div className={`absolute mt-2 right-0 ${isFadingOut ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
                        <Register />
                    </div>
                )}
            </div>
        </div>
    );
}

function UserInfoIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="black"
            className="w-8 h-8"
        >
            <path d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zM6.145 17.812A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
    );
}
