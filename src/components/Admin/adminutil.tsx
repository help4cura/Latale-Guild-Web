import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { database } from '@/firebaseConfig';
import { ref as databaseRef, get, set } from 'firebase/database';
import AutoFont from '../Util/autofont';

const AdminUtil: React.FC = () => {
    const [endDate, setEndDate] = useState<string>("");
    const [newEndDate, setNewEndDate] = useState<string>("");
    const [prizeCount, setPrizeCount] = useState<number>(0);
    const [newPrizeCount, setNewPrizeCount] = useState<number>(0);
    const [nickname, setNickname] = useState<string>("");
    const [newNickname, setNewNickname] = useState<string>("");
    const [accessKey, setAccessKey] = useState<string>("");
    const [newAccessKey, setNewAccessKey] = useState<string>("");
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [participants, setParticipants] = useState<string[]>([]);

    const router = useRouter();

    useEffect(() => {
        const checkAdminAccess = async () => {
            try {
                const user = JSON.parse(sessionStorage.getItem('user') || '{}');
                if (!user.admin) {
                    alert('접속할 수 있는 권한이 없습니다.');
                    router.push('/');  // replace '/login' with the appropriate path
                    return;
                }

                setIsAuthorized(true);

                const endDateRef = databaseRef(database, 'endDate');
                const endDateSnapshot = await get(endDateRef);
                setEndDate(endDateSnapshot.val());

                const prizeCountRef = databaseRef(database, 'prizeCount');
                const prizeCountSnapshot = await get(prizeCountRef);
                setPrizeCount(prizeCountSnapshot.val());

                const nicknameRef = databaseRef(database, 'nickname');
                const nicknameSnapshot = await get(nicknameRef);
                setNickname(nicknameSnapshot.val());

                const accessKeyRef = databaseRef(database, 'AccessKey');
                const accessKeySnapshot = await get(accessKeyRef);
                setAccessKey(accessKeySnapshot.val());

                const participantsRef = databaseRef(database, 'participants');
                const participantsSnapshot = await get(participantsRef);
                const participantsData = participantsSnapshot.val();
                setParticipants(Object.keys(participantsData).map(key => participantsData[key].nickname));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        checkAdminAccess();
    }, [router]);

    if (!isAuthorized) {
        return null; // 빈 화면을 표시
    }

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEndDate(e.target.value);
    };

    const handlePrizeCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === '' ? 0 : Number(e.target.value);
        setNewPrizeCount(value);
    };

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewNickname(e.target.value);
    };

    const handleAccessKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewAccessKey(e.target.value);
    };

    const handleSave = async () => {
        try {
            if (newEndDate !== "") {
                const endDateRef = databaseRef(database, 'endDate');
                await set(endDateRef, newEndDate);
                setEndDate(newEndDate);
            }

            if (newPrizeCount !== 0) {
                const prizeCountRef = databaseRef(database, 'prizeCount');
                await set(prizeCountRef, newPrizeCount);
                setPrizeCount(newPrizeCount);
            }

            if (newNickname !== "") {
                const nicknameRef = databaseRef(database, 'nickname');
                await set(nicknameRef, newNickname);
                setNickname(newNickname);
            }

            let EmptyAccessKey = newAccessKey;

            if (newAccessKey !== "") {
                if (newAccessKey === "''") {
                    EmptyAccessKey = "";
                }
                const AccessKeyRef = databaseRef(database, 'AccessKey');
                await set(AccessKeyRef, EmptyAccessKey);
                setAccessKey(EmptyAccessKey);
            }

            alert('Data updated successfully!');
        } catch (error) {
            console.error('Error updating data:', error);
            alert('Failed to update data. Please try again.');
        }
    };

    return (
        <div className="flex items-start justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-6 rounded-lg shadow-md w-96 mr-6">
                <h1 className="text-3xl font-bold mb-6">
                    <AutoFont text='Giveaway Settings' ></AutoFont>
                </h1>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        <AutoFont text='Current End Date'></AutoFont>
                    </label>
                    <input
                        type="text"
                        value={endDate}
                        disabled
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="newEndDate" className="block text-sm font-medium text-gray-700">
                        <AutoFont text='New End Date'></AutoFont>
                    </label>
                    <input
                        id="newEndDate"
                        type="text"
                        value={newEndDate}
                        onChange={handleEndDateChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="YYYY-MM-DD HH:mm:ss"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        <AutoFont text='Current Prize Count'></AutoFont>
                    </label>
                    <input
                        type="number"
                        value={prizeCount}
                        disabled
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="newPrizeCount" className="block text-sm font-medium text-gray-700">
                        <AutoFont text='New Prize Count'></AutoFont>
                    </label>
                    <input
                        id="newPrizeCount"
                        type="number"
                        value={newPrizeCount === 0 ? '' : newPrizeCount}
                        onChange={handlePrizeCountChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder='0'
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        <AutoFont text='Current Nickname'></AutoFont>
                    </label>
                    <input
                        type="text"
                        value={nickname}
                        disabled
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="newNickname" className="block text-sm font-medium text-gray-700">
                        <AutoFont text='New Nickname'></AutoFont>
                    </label>
                    <input
                        id="newNickname"
                        type="text"
                        value={newNickname}
                        onChange={handleNicknameChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Nickname"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        <AutoFont text='Current Access Key'></AutoFont>
                    </label>
                    <input
                        type="text"
                        value={accessKey}
                        disabled
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="newAccessKey" className="block text-sm font-medium text-gray-700">
                        <AutoFont text='New Access Key'></AutoFont>
                    </label>
                    <input
                        id="newAccessKey"
                        type="text"
                        value={newAccessKey}
                        onChange={handleAccessKeyChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="'' is none"
                    />
                </div>
                <button
                    onClick={handleSave}
                    className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <AutoFont text='Save Changes'></AutoFont>
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-3xl font-bold mb-4">
                    <AutoFont text={`Participants : ${participants.length}`}></AutoFont>
                </h2>
                <ul className="list-inside">
                    {participants.map((participant, index) => (
                        <li key={index}>
                            <AutoFont text={`${participant}`} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminUtil;
