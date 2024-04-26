import { useState } from 'react';
import { Afacad } from 'next/font/google';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

import Sidebar from '@/components/component/sidebar';
import PopupImage from '@/components/component/popupImage';

const afacad = Afacad({
    subsets: ['latin']
});

const firebaseConfig = {
    projectId: 'latale-1d43a',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

interface SignupFormData {
    username: string;
    password: string;
    email?: string;
    nickname: string;
    admin: string;
}

interface FormErrors {
    username?: string;
    password?: string;
    email?: string;
    nickname?: string;
}

export default function Register() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const showPopup = () => {
        setIsPopupVisible(true);
    };

    const handlePopupClose = () => {
        setIsPopupVisible(false);
    };

    const [formData, setFormData] = useState<SignupFormData>({
        username: '',
        password: '',
        email: '',
        nickname: '',
        admin: 'false',
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const koreanPattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

        setFormData({ ...formData, [name]: value }); // 먼저 입력값을 formData에 반영

        if (name === 'username' || name === 'email') {
            if (koreanPattern.test(value)) {
                setFormErrors({ ...formErrors, [name]: '영어로만 입력 가능합니다.' });
            } else {
                setFormErrors({ ...formErrors, [name]: undefined });
            }
        } else {
            setFormErrors({ ...formErrors, [name]: undefined });
        }
    };

    const checkDuplicates = async () => {
        const usersRef = firebase.database().ref('users');
        const snapshot = await usersRef.once('value');
        const users = snapshot.val() || {};

        for (const key in users) {
            const user = users[key];
            if (user.username === formData.username) {
                console.log("Duplicate username found");
                return true;
            }
            if (user.nickname === formData.nickname) {
                console.log("Duplicate nickname found");
                return true;
            }
            if (formData.email && user.email === formData.email) {
                console.log("Duplicate email found");
                return true;
            }
        }
        return false;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const koreanPattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        if (koreanPattern.test(formData.username)) {
            alert('회원가입 오류 : 한글은 입력 할 수 없습니다.');
            return; // 한글이 입력된 경우 여기서 함수를 바로 종료
        }

        const isDuplicate = await checkDuplicates();
        if (isDuplicate) {
            alert('회원가입 오류 : 중복인 데이터가 있습니다.');
            return; // 한글이 입력된 경우 여기서 함수를 바로 종료
        }

        try {
            const accountIdRef = firebase.database().ref('nextAccountId');
            const newAccountId = await accountIdRef.transaction(currentId => {
                if (currentId === null) {
                    return 2;  // 첫 번째 사용자의 경우, nextAccountId를 2로 설정합니다.
                } else {
                    return currentId + 1;  // 이후 사용자의 경우, nextAccountId를 현재 값 + 1로 업데이트합니다.
                }
            });

            if (newAccountId.committed && newAccountId.snapshot) {
                const newId = newAccountId.snapshot.val() - 1;
                const userRef = firebase.database().ref(`users/${newId}`);
                await userRef.set({
                    ...formData,
                    accountId: newId
                });
                alert('회원가입 완료되었습니다.');
            } else {
                throw new Error('Failed to generate account ID');
            }
        } catch (error) {
            console.error('Error saving data:', error);
            alert('회원가입 오류');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200">
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
            </div>
            <div className="flex min-h-screen items-center justify-center w-screen">
                <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
                    <h1 className={`${afacad.className} text-2xl font-bold text-center`}>Register</h1>
                    <form className="space-y-6">
                        <div className="mb-4">
                            <label htmlFor="username" className={`${afacad.className} text-sm font-medium block`}>
                                <span className="text-red-500">*</span> Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                required
                                onChange={handleChange}
                                className={`${afacad.className} pl-2 mt-1 w-full rounded-md border-2 border-gray-300 shadow-md`}
                            />
                            {formErrors.username && (
                                <p className="mt-1 text-xs text-red-500">{formErrors.username}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className={`${afacad.className} text-sm font-medium block`}>
                                <span className="text-red-500">*</span> Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                onChange={handleChange}
                                className={`${afacad.className} pl-2 mt-1 w-full rounded-md border-2 border-gray-300 shadow-md`}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className={`${afacad.className} text-sm font-medium block`}>
                                Email (Optional)
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                onChange={handleChange}
                                className={`${afacad.className} pl-2 mt-1 w-full rounded-md border-2 border-gray-300 shadow-md`}
                            />
                            {formErrors.email && (
                                <p className="mt-1 text-xs text-red-500">{formErrors.email}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="nickname" className={`${afacad.className} text-sm font-medium block`}>
                                <span className="text-red-500">*</span> Nickname
                            </label>
                            <input
                                type="text"
                                id="nickname"
                                name="nickname"
                                required
                                onChange={handleChange}
                                className={`${afacad.className} pl-2 mt-1 w-full rounded-md border-2 border-gray-300 shadow-md`}
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            className={`${afacad.className} w-full rounded-md bg-blue-500 py-2 text-white shadow-sm hover:bg-blue-600`}
                        >
                            Create an Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}