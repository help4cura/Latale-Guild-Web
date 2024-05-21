import { SVGProps } from 'react';
import { useState } from 'react';

export default function Profile() {
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target?.result as string);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md max-w-80 mx-auto">
            <div className="flex flex-col items-center pb-4">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center overflow-hidden">
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : null}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </div>
                <h3 className="text-2xl font-semibold mt-4">환영합니다, User님.</h3>
            </div>
            <div className="border-t pt-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-center">
                        <button
                            className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50"
                            onClick={() => console.log('로그아웃')}
                        >
                            <CircleArrowRightIcon className="mr-2 h-5 w-5" />
                            로그아웃
                        </button>
                    </div>
                </div>
                <div className="text-center text-sm text-muted-foreground mt-8" />
            </div>
        </div>
    );
}

function CircleArrowRightIcon(props: SVGProps<SVGSVGElement>) {
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
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
            <path d="m12 16 4-4-4-4" />
        </svg>
    )
}