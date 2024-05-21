import React, { useState, useEffect } from 'react';
import { storage, database } from '../../firebaseConfig'; // Firebase 초기화 파일을 가져옴
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as databaseRef, get, set } from 'firebase/database';

interface ProfileProps {
    onLogout: () => void;
}

export default function Profile({ onLogout }: ProfileProps) {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [nickname, setNickname] = useState<string>('');
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
        if (storedUser.nickname) {
            setNickname(storedUser.nickname);
        }
        if (storedUser.admin) {
            setIsAdmin(true);
        }

        const cachedImageUrl = localStorage.getItem('profileImageURL');
        if (cachedImageUrl) {
            setProfileImage(cachedImageUrl);
        }

        if (storedUser.username) {
            // 사용자 ID를 찾기 위한 추가 데이터베이스 조회
            const usersRef = databaseRef(database, 'users');
            get(usersRef).then((snapshot) => {
                const users = snapshot.val() || {};
                for (const key in users) {
                    if (users[key].username === storedUser.username) {
                        setUserId(key);
                        const profileImageRef = databaseRef(database, `users/${key}/profileURL`);
                        get(profileImageRef).then((snapshot) => {
                            const imageUrl = snapshot.val();
                            if (imageUrl) {
                                setProfileImage(imageUrl);
                                localStorage.setItem('profileImageURL', imageUrl);
                            }
                        });
                        break;
                    }
                }
            });
        }
    }, []);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0] && userId) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);

            const storageReference = storageRef(storage, `profileImages/${userId}`);
            uploadBytes(storageReference, file).then(() => {
                console.log('File uploaded successfully');
                getDownloadURL(storageReference).then((url) => {
                    console.log('Download URL:', url);
                    setProfileImage(url);
                    localStorage.setItem('profileImageURL', url);
                    const profileImageRef = databaseRef(database, `users/${userId}/profileURL`);
                    set(profileImageRef, url).then(() => {
                        console.log('Profile image URL saved to database');
                    }).catch((error) => {
                        console.error('Error saving profile image URL to database:', error);
                    });
                }).catch((error) => {
                    console.error('Error getting download URL:', error);
                });
            }).catch((error) => {
                console.error('Error uploading file:', error);
            });
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mx-auto">
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
                <div className="relative inline-flex items-center mt-4 whitespace-nowrap">
                    <h3 className="text-2xl text-black font-semibold">환영합니다, </h3>
                    <div className="relative inline-flex items-center">
                        {isAdmin && (
                            <img src="/superadmin.png" alt="Super Admin" className="absolute -top-4 left-1/3" />
                        )}
                        <h3 className="text-2xl text-black font-semibold ml-2">{nickname}님.</h3>
                    </div>
                </div>
            </div>
            <div className="border-t pt-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-center">
                        <button
                            className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50"
                            onClick={onLogout}
                        >
                            <CircleArrowRightIcon className="mr-2 h-5 w-5" /> 로그아웃
                        </button>
                    </div>
                </div>
                <div className="text-center text-sm text-muted-foreground mt-8" />
            </div>
        </div>
    );
}

function CircleArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
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
    );
}
