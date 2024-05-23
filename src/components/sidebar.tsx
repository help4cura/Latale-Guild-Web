import { Afacad } from 'next/font/google';
import { SVGProps } from 'react';
import Link from 'next/link';
import { useState } from 'react';

//sidebar.tsx

interface SidebarProps {
    isOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
    showPopup?: () => void;
}

const afacad = Afacad({
    subsets: ['latin']
});

export default function Sidebar({ isOpen, setIsSidebarOpen, showPopup }: SidebarProps) {
    const [isAnimating, setIsAnimating] = useState(true);

    const SideClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setIsSidebarOpen(false);
        }, 500);
    };

    return isOpen ? (
        <div
            className={`z-50 fixed inset-0 flex h-screen transition-transform duration-500 ${isAnimating ? 'animate-slideIn' : 'animate-slideOut'
                }`}
        >
            <div className="w-52 bg-gray-900 text-white relative">
                <button
                    onClick={SideClose}
                    className="absolute top-3 right-3 text-white text-3xl leading-none hover:text-gray-300 focus:outline-none"
                >
                    &times;
                </button>
                <aside className="w-52 bg-gray-900 text-white">
                    <div className="overflow-y-auto py-3 px-4 rounded">
                        <div className="mb-6">
                            <h3 className={`${afacad.className} text-2xl font-semibold`} >Menu</h3>
                        </div>
                        <ul className="space-y-4">
                            <li>
                                <a className="flex items-center space-x-3 rounded-md px-3 py-2 hover:bg-gray-800" href="#">
                                    <BellIcon className="h-6 w-6" />
                                    <span className={`${afacad.className} text-2xl`}>Notice</span>
                                </a>
                            </li>
                            <li>
                                <Link href="/Community" className="flex items-center space-x-3 rounded-md px-3 py-2 hover:bg-gray-800">
                                    <UsersIcon className="h-6 w-6" />
                                    <span className={`${afacad.className} text-2xl`}>Community</span>
                                </Link>
                            </li>
                            <li>
                                <a
                                    className="flex items-center space-x-3 rounded-md px-3 py-2 hover:bg-gray-800" href="#"
                                    onClick={showPopup}
                                >
                                    <MailOpenIcon className="h-6 w-6" />
                                    <span className={`${afacad.className} text-2xl`}>Recruit</span>
                                </a>
                            </li>
                            <li>
                                <Link href="/Giveaway" className="flex items-center space-x-3 rounded-md px-3 py-2 hover:bg-gray-800">
                                    <GiftIcon className="h-6 w-6" />
                                    <span className={`${afacad.className} text-2xl`}>Giveaway</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>
                <main className="flex-1" />
            </div>
        </div>
    ) : null;
}

function BellIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
    )
}


function MailOpenIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
            <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
        </svg>
    )
}

function UsersIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}

function GiftIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="20 12 20 22 4 22 4 12" />
            <rect width="20" height="5" x="2" y="7" />
            <line x1="12" x2="12" y1="22" y2="7" />
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
    )
}