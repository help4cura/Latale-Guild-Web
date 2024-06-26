import React, { useState, useEffect, useRef } from 'react';
import { storage, database } from '../firebaseConfig';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as databaseRef, get, set } from 'firebase/database';
import AutoFont from './Util/autofont';
import ProfileImage from './Util/profileImage';
import Image from 'next/image';

interface ProfileProps {
    onLogout: () => void;
}

export default function Profile({ onLogout }: ProfileProps) {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [nickname, setNickname] = useState<string>('');
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [adminLevel, setAdminLevel] = useState<number>(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
        if (storedUser.nickname) {
            setNickname(storedUser.nickname);
        }
        if (storedUser.admin) {
            setIsAdmin(true);
        }

        const cachedImageUrl = localStorage.getItem(`profileImageURL_${storedUser.username}`);
        if (cachedImageUrl) {
            setProfileImage(cachedImageUrl);
        }

        if (storedUser.username) {
            const usersRef = databaseRef(database, 'users');
            get(usersRef).then((snapshot) => {
                const users = snapshot.val() || {};
                for (const key in users) {
                    if (users[key].username === storedUser.username) {
                        setUserId(key);

                        const userRef = databaseRef(database, `users/${key}`);
                        get(userRef).then((snapshot) => {
                            const userData = snapshot.val();
                            if (userData) {
                                const { profileURL, adminLevel } = userData;
                                if (profileURL) {
                                    setProfileImage(profileURL);
                                    localStorage.setItem(`profileImageURL_${storedUser.username}`, profileURL);
                                }
                                if (adminLevel) {
                                    setAdminLevel(adminLevel);
                                }
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

            const storedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
            const storageReference = storageRef(storage, `profileImages/${userId}`);
            uploadBytes(storageReference, file).then(() => {
                console.log('File uploaded successfully');
                getDownloadURL(storageReference).then((url) => {
                    console.log('Download URL:', url);
                    setProfileImage(url);
                    localStorage.setItem(`profileImageURL_${storedUser.username}`, url);
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

    const handleProfileImageClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className=" bg-white p-4 rounded-lg shadow-md mx-auto z-10">
            <div className="flex flex-col items-center pb-4">
                <div onClick={handleProfileImageClick}>
                    <ProfileImage profileImage={profileImage} />
                </div>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                />
                <div className="relative inline-flex items-center mt-4 whitespace-nowrap">
                    <h3 className="text-2xl text-black font-semibold">
                        <AutoFont text="환영합니다," />
                    </h3>
                    <div className="relative inline-flex items-center">
                        {isAdmin && (
                            adminLevel >= 1 && adminLevel <= 3 && (
                                <Image
                                    src={`/admin/crown${adminLevel > 1 ? adminLevel : ''}.png`}
                                    alt="Super Admin"
                                    className="absolute -top-2 left-1/3"
                                    width="24"
                                    height="18"
                                    style={{ objectFit: "cover" }}
                                />
                            )
                        )}
                        <h3 className="text-2xl text-black font-semibold ml-2">
                            <AutoFont text={`${nickname}님!`} />
                        </h3>
                    </div>
                </div>
            </div>
            <div className="border-t pt-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-center">
                        <button
                            className="flex items-center justify-center px-2 py-2 border border-gray-300 text-black bg-white rounded-md hover:bg-gray-50"
                            onClick={onLogout}
                        >
                            <CircleArrowRightIcon className="mr-2 h-5 w-5" />
                            <AutoFont text="Log Out" />
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
