//register.tsx

import { useState, useEffect } from 'react';
import { Afacad } from 'next/font/google';
import { database } from '../firebaseConfig'; // Firebase 초기화 파일을 가져옴
import ToggleSlider from './toggleSlider';
import Profile from './profile';
import { ref as databaseRef, get, set, update, runTransaction } from 'firebase/database';

const afacad = Afacad({
    subsets: ['latin']
});

interface SignupFormData {
    username: string;
    password: string;
    email?: string;
    nickname: string;
    admin: boolean;
    adminLevel: number;
    isLogin: boolean;
    profileURL: string;
}

interface FormErrors {
    username?: string;
    password?: string;
    email?: string;
    nickname?: string;
}

export default function Register() {
    const [isSignUp, setIsSignUp] = useState(true);
    const [formData, setFormData] = useState<SignupFormData>({
        username: '',
        password: '',
        email: '',
        nickname: '',
        admin: false,
        adminLevel: 0,
        isLogin: false,
        profileURL: '',
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const koreanPattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

        setFormData({ ...formData, [name]: value });

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
        const usersRef = databaseRef(database, 'users');
        const snapshot = await get(usersRef);
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
            return;
        }

        if (isSignUp) {
            const isDuplicate = await checkDuplicates();
            if (isDuplicate) {
                alert('회원가입 오류 : 중복인 데이터가 있습니다.');
                return;
            }

            try {
                const accountIdRef = databaseRef(database, 'nextAccountId');
                const newAccountId = await runTransaction(accountIdRef, currentId => {
                    if (currentId === null) {
                        return 2;
                    } else {
                        return currentId + 1;
                    }
                });

                if (newAccountId.committed && newAccountId.snapshot) {
                    const newId = newAccountId.snapshot.val() - 1;
                    const userRef = databaseRef(database, `users/${newId}`);
                    await set(userRef, {
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
        } else {
            try {
                const usersRef = databaseRef(database, 'users');
                const snapshot = await get(usersRef);
                const users = snapshot.val() || {};

                let loginSuccessful = false;
                let userId = '';
                let user = null;

                for (const key in users) {
                    const currentUser = users[key];
                    if (currentUser.username === formData.username && currentUser.password === formData.password) {
                        loginSuccessful = true;
                        userId = key;
                        user = currentUser;
                        break;
                    }
                }

                if (loginSuccessful) {
                    await update(databaseRef(database, `users/${userId}`), { isLogin: true });
                    sessionStorage.setItem('user', JSON.stringify({
                        username: user.username,
                        nickname: user.nickname,
                        admin: user.admin,
                        isLogin: true
                    }));
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        isLogin: true
                    }));
                    alert('로그인 성공');
                } else {
                    alert('로그인 실패: 사용자 이름 또는 비밀번호가 잘못되었습니다.');
                }
            } catch (error) {
                console.error('Error logging in:', error);
                alert('로그인 오류');
            }
        }
    };

    const handleLogout = async () => {
        try {
            const storedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
            if (storedUser.username) {
                const usersRef = databaseRef(database, 'users');
                const snapshot = await get(usersRef);
                const users = snapshot.val() || {};

                let userId = '';
                for (const key in users) {
                    const currentUser = users[key];
                    if (currentUser.username === storedUser.username) {
                        userId = key;
                        break;
                    }
                }

                if (userId) {
                    await update(databaseRef(database, `users/${userId}`), { isLogin: false });
                    sessionStorage.removeItem('user');
                    setFormData({
                        username: '',
                        password: '',
                        email: '',
                        nickname: '',
                        admin: false,
                        adminLevel: 0,
                        isLogin: false,
                        profileURL: '',
                    });
                    alert('로그아웃 성공');
                } else {
                    console.error('User ID not found');
                    alert('로그아웃 오류: 사용자 정보를 찾을 수 없습니다.');
                }
            } else {
                console.error('No stored user found');
                alert('로그아웃 오류: 저장된 사용자 정보를 찾을 수 없습니다.');
            }
        } catch (error) {
            console.error('Error during logout:', error);
            alert('로그아웃 오류가 발생했습니다.');
        }
    };

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('user') || '{}');
        if (storedUser.isLogin) {
            setFormData(prevFormData => ({
                ...prevFormData,
                username: storedUser.username,
                nickname: storedUser.nickname,
                admin: storedUser.admin,
                isLogin: storedUser.isLogin
            }));
        }
    }, []);

    return (
        formData.isLogin ? (
            <Profile onLogout={handleLogout} />
        ) : (
            <div className="p-4 bg-white text-black rounded-md shadow-md w-96">
                <div className={`${afacad.className} text-sm font-medium`}>
                    <ToggleSlider isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
                </div>
                <form className="mt-4" onSubmit={handleSubmit}>
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

                    {isSignUp && (
                        <>
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
                                {formErrors.nickname && (
                                    <p className="mt-1 text-xs text-red-500">{formErrors.nickname}</p>
                                )}
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className={`${afacad.className} w-full rounded-md bg-blue-500 py-2 text-white shadow-sm hover:bg-blue-600`}
                    >
                        {isSignUp ? 'Create an Account' : 'Sign In'}
                    </button>
                </form>
            </div>
        )
    );
}
