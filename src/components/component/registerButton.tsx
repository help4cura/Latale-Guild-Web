import Link from 'next/link';
import { SVGProps } from 'react';

export default function RegisterButton() {
    return (
        <div className="fixed right-4 top-2 z-50">
            <Link href="/Register" className="flex items-center space-x-3 rounded-md px-3 py-2 hover:bg-gray-300">
                <UserInfoIcon className="mb-1 w-6 h-6" />
            </Link>
        </div>
    );
};

function UserInfoIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}

            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512">
            <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />

        </svg>
    );
}

