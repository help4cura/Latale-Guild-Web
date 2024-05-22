import React, { useState, useEffect } from 'react';
import { database } from '@/firebaseConfig';
import { ref as databaseRef, get, set } from 'firebase/database';

const AdminUtil: React.FC = () => {
    const [endDate, setEndDate] = useState<string>("");
    const [newEndDate, setNewEndDate] = useState<string>("");
    const [prizeCount, setPrizeCount] = useState<number>(0);
    const [newPrizeCount, setNewPrizeCount] = useState<number>(0);
    const [nickname, setNickname] = useState<string>("");
    const [newNickname, setNewNickname] = useState<string>("");
    const [accessKey, setAccessKey] = useState<string>("");
    const [newAccessKey, setNewAccessKey] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const endDateRef = databaseRef(database, 'endDate');
                const endDateSnapshot = await get(endDateRef);
                const endDate = endDateSnapshot.val();
                setEndDate(endDate);

                const prizeCountRef = databaseRef(database, 'prizeCount');
                const prizeCountSnapshot = await get(prizeCountRef);
                const prizeCount = prizeCountSnapshot.val();
                setPrizeCount(prizeCount);

                const nicknameRef = databaseRef(database, 'nickname');
                const nicknameSnapshot = await get(nicknameRef);
                const nickname = nicknameSnapshot.val();
                setNickname(nickname);

                const accessKeyRef = databaseRef(database, 'AccessKey');
                const accessKeySnapshot = await get(accessKeyRef);
                const accessKey = accessKeySnapshot.val();
                setAccessKey(accessKey);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Admin</h1>
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Current End Date</label>
                    <input
                        type="text"
                        value={endDate}
                        disabled
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="newEndDate" className="block text-sm font-medium text-gray-700">New End Date</label>
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
                    <label className="block text-sm font-medium text-gray-700">Current Prize Count</label>
                    <input
                        type="number"
                        value={prizeCount}
                        disabled
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="newPrizeCount" className="block text-sm font-medium text-gray-700">New Prize Count</label>
                    <input
                        id="newPrizeCount"
                        type="number"
                        value={newPrizeCount === 0 ? '' : newPrizeCount} // 빈 값일 경우 placeholder 표시
                        onChange={handlePrizeCountChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder='0'
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Current Nickname</label>
                    <input
                        type="text"
                        value={nickname}
                        disabled
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="newNickname" className="block text-sm font-medium text-gray-700">New Nickname</label>
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
                    <label className="block text-sm font-medium text-gray-700">Current Access Key</label>
                    <input
                        type="text"
                        value={accessKey}
                        disabled
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="newAccessKey" className="block text-sm font-medium text-gray-700">New Access Key</label>
                    <input
                        id="newAccessKey"
                        type="text"
                        value={newAccessKey}
                        onChange={handleAccessKeyChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Access Key"
                    />
                </div>
                <button
                    onClick={handleSave}
                    className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default AdminUtil;
