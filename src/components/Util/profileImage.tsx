import React from 'react';
import Image from 'next/image';

interface ProfileImageProps {
    profileImage: string | null;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ profileImage }) => {
    return (
        <div className="relative w-16 h-16 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center overflow-hidden">
            {profileImage ? (
                <div className="relative w-3/4 h-3/4">
                    <Image
                        src={profileImage || '/defaultProfileImage.png'}
                        alt="Profile"
                        className="object-cover rounded-full"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                </div>
            )}
        </div>
    );
};

export default ProfileImage;
