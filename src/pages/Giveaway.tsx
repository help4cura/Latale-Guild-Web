import { Afacad, Do_Hyeon } from 'next/font/google';
import AutoFont from '@/components/Util/autofont';
import { SVGProps } from 'react';
import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { database } from '@/firebaseConfig';
import { ref as databaseRef, get, set, onValue } from 'firebase/database';

import Image from 'next/image';
import Link from "next/link";
import Sidebar from '@/components/sidebar';
import PopupImage from '@/components/Util/popupImage';
import * as Tooltip from "@/components/tooltip";
import ProfileImage from '@/components/Util/profileImage';
import classNames from 'classnames';

import Confetti from '@/components/Util/confetti';

const afacad = Afacad({
    subsets: ['latin']
});

const do_Hyeon = Do_Hyeon({
    subsets: ['latin'],
    weight: ["400"],
    style: ['normal']
})

interface CountdownTimerProps {
    endTimeStr: string;
    onComplete: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endTimeStr, onComplete }) => {
    const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

    useEffect(() => {
        if (typeof window === "undefined" || !endTimeStr) {
            return;
        }

        const endTime = new Date(endTimeStr).getTime();
        let intervalId: number;

        const updateSeconds = () => {
            const now = Date.now();
            const newSecondsLeft = Math.max(Math.floor((endTime - now) / 1000), 0);
            setSecondsLeft(newSecondsLeft);

            if (newSecondsLeft === 0) {
                clearInterval(intervalId);
                onComplete();
            }
        };

        updateSeconds();
        intervalId = window.setInterval(updateSeconds, 1000) as unknown as number;

        return () => {
            window.clearInterval(intervalId);
        };
    }, [endTimeStr, onComplete]);

    if (secondsLeft === null) {
        return null;
    }

    const days = Math.floor(secondsLeft / (3600 * 24));
    const hours = Math.floor((secondsLeft % (3600 * 24)) / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;

    return (
        <div className="flex items-center space-x-6 text-5xl font-bold">
            <div className={`${afacad.className} flex flex-col items-center`}>
                <span>{days}</span>
                <span className={`${afacad.className} text-lg font-normal`}>Days</span>
            </div>
            <div className={`${afacad.className} flex flex-col items-center`}>
                <span>{hours}</span>
                <span className={`${afacad.className} text-lg font-normal`}>Hours</span>
            </div>
            <div className={`${afacad.className} flex flex-col items-center`}>
                <span>{minutes}</span>
                <span className={`${afacad.className} text-lg font-normal`}>Minutes</span>
            </div>
            <div className={`${afacad.className} flex flex-col items-center`}>
                <span>{seconds}</span>
                <span className={`${afacad.className} text-lg font-normal`}>Seconds</span>
            </div>
        </div>
    );
};

export default function Giveaway() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isTimerComplete, setIsTimerComplete] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);
    const [isItemVisible, setIsItemVisible] = useState(false);
    const [isHintVisible, setIsHintVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [totalParticipants, setTotalParticipants] = useState<number>(0);
    const [winnerProfileImage, setWinnerProfileImage] = useState<string | null>(null);
    const [endTimeStr, setEndTimeStr] = useState<string>("");
    const [prizeCount, setPrizeCount] = useState<number>(10); // 초기 개수 값
    const [nickname, setNickname] = useState<string>("Oryx"); // 초기 닉네임 값
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchEndDate = async () => {
        try {
            const endDateRef = databaseRef(database, 'endDate');
            const snapshot = await get(endDateRef);
            const endDate = snapshot.val();
            setEndTimeStr(endDate);
            setIsLoading(false);  // 데이터를 성공적으로 불러온 후 로딩 상태를 false로 설정
        } catch (error) {
            console.error('Error fetching endDate:', error);
            setIsLoading(false);  // 에러 발생 시에도 로딩 상태를 false로 설정
        }
    };

    useEffect(() => {
        fetchEndDate();

        const prizeCountRef = databaseRef(database, 'prizeCount');
        onValue(prizeCountRef, (snapshot) => {
            const prizeCount = snapshot.val();
            setPrizeCount(prizeCount);
        });

        const nicknameRef = databaseRef(database, 'nickname');
        onValue(nicknameRef, (snapshot) => {
            const nickname = snapshot.val();
            setNickname(nickname);
        });
    }, []);

    const handleTimerComplete = async () => {
        setIsTimerComplete(true);
        await fetchWinner();
        await selectRandomWinner();
    };

    const showPopup = () => {
        setIsPopupVisible(true);
    };

    const handlePopupClose = () => {
        setIsPopupVisible(false);
    };

    const handleMouseEnterItem = () => setIsItemVisible(true);
    const handleMouseLeaveItem = () => setIsItemVisible(false);
    const handleMouseEnterHint = () => setIsHintVisible(true);
    const handleMouseLeaveHint = () => setIsHintVisible(false);
    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
    };

    useEffect(() => {
        document.title = '🎉추첨 - 라테일 [평등] 길드';
        fetchWinner();
        getTotalParticipants();

        const participantsRef = databaseRef(database, 'participants');
        const unsubscribe = onValue(participantsRef, (snapshot) => {
            const participants = snapshot.val();
            setTotalParticipants(participants ? Object.keys(participants).length : 0);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const winRate = totalParticipants > 0 ? (1 / (totalParticipants + 1)) * 100 : 0;

    const handleEnterNow = async () => {
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        const accessKeyInput = (document.getElementById('access') as HTMLInputElement).value;

        if (!user.nickname) {
            alert('로그인이 필요한 컨텐츠입니다.');
            return;
        }

        if (!accessKeyInput) {
            alert('Access Key를 입력해 주세요.');
            return;
        }

        try {
            const accessKeyRef = databaseRef(database, 'AccessKey');
            const accessKeySnapshot = await get(accessKeyRef);
            const storedAccessKey = accessKeySnapshot.val();

            if (accessKeyInput !== storedAccessKey) {
                alert('잘못된 Access Key입니다.');
                return;
            }

            const participantsRef = databaseRef(database, 'participants');
            const snapshot = await get(participantsRef);
            const participants = snapshot.val() || {};

            for (const id in participants) {
                if (participants[id].nickname === user.nickname) {
                    alert('이미 참여한 기록이 있습니다.');
                    return;
                }
            }

            const newParticipantId = Object.keys(participants).length + 1;

            await set(databaseRef(database, `participants/${newParticipantId}`), {
                nickname: user.nickname
            });

            alert('참여 명단에 추가되었습니다.');
        } catch (error) {
            console.error('Error saving username:', error);
        }
    };

    const selectRandomWinner = async () => {
        try {
            const winnerRef = databaseRef(database, 'winner');
            const winnerSnapshot = await get(winnerRef);
            const existingWinner = winnerSnapshot.val();

            if (existingWinner) {
                setWinner(existingWinner.nickname);
                return;
            }

            const participantsRef = databaseRef(database, 'participants');
            const snapshot = await get(participantsRef);
            const participants = snapshot.val();

            if (!participants) {
                alert('참여자가 없습니다.');
                return;
            }

            const participantIds = Object.keys(participants);
            const randomIndex = Math.floor(Math.random() * participantIds.length);
            const winnerId = participantIds[randomIndex];

            const selectedWinner = participants[winnerId].nickname;
            await set(databaseRef(database, 'winner'), {
                nickname: selectedWinner
            });

            setWinner(selectedWinner);
        } catch (error) {
            console.error('Error selecting random winner:', error);
        }
    };

    const fetchWinner = async () => {
        try {
            const winnerRef = databaseRef(database, 'winner');
            const snapshot = await get(winnerRef);
            const winnerData = snapshot.val();

            if (winnerData) {
                setWinner(winnerData.nickname);

                // 승자의 프로필 이미지 URL 가져오기
                const usersRef = databaseRef(database, 'users');
                get(usersRef).then((snapshot) => {
                    const users = snapshot.val() || {};
                    for (const key in users) {
                        if (users[key].nickname === winnerData.nickname) {
                            setWinnerProfileImage(users[key].profileURL);
                            break;
                        }
                    }
                });
            }
        } catch (error) {
            console.error('Error fetching winner:', error);
        }
    };

    const getTotalParticipants = async () => {
        try {
            const participantsRef = databaseRef(database, 'participants');
            const snapshot = await get(participantsRef);
            const participants = snapshot.val();
            setTotalParticipants(participants ? Object.keys(participants).length : 0);
        } catch (error) {
            console.error('Error fetching total participants:', error);
        }
    };

    const commonStyle = 'bg-[#6B46C1] text-white p-8 flex flex-col items-center justify-center relative';

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
            <div className="flex flex-col flex-1 items-center justify-center">
                <PopupImage isVisible={isPopupVisible} onClose={handlePopupClose} />
            </div>
            <div
                key="1"
                className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-br from-orange-200 via-red-100 to-purple-200 py-12 md:py-24" >
                <div className="max-w-4xl px-4 md:px-6">
                    <h1 className={`${afacad.className} text-4xl md:text-6xl font-bold text-white mb-8 text-center`}>
                        <Link className="flex items-center justify-center" href="/">
                            <ScaleIcon className="mb-1 w-1 h-10" />
                            <span className="sr-only">Oryx</span>
                        </Link>
                    </h1>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {isLoading ? (
                                <div className={classNames(commonStyle)}>
                                    <div className={`${afacad.className} text-2xl font-bold`}>Loading...</div>
                                </div>
                            ) : (
                                <>
                                    <div className={classNames(commonStyle)} onMouseDown={(e) => e.preventDefault()}>
                                        {!isTimerComplete ? (
                                            <>
                                                <h2 className={`${afacad.className} text-2xl md:text-3xl font-bold mb-4`}>Time Remaining</h2>
                                                <CountdownTimer endTimeStr={endTimeStr} onComplete={handleTimerComplete} />
                                                <div className={`${afacad.className} mt-8 text-2xl font-bold`}>
                                                    <span>Participants: {totalParticipants}, Win Rate : {winRate.toFixed(2)}%</span>
                                                    <div className="flex flex-col text-sm items-center justify-center mt-4">
                                                        <AutoFont text='여러 계정으로 참여 사실이 있을 시, 무효 처리됩니다.'></AutoFont>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <Confetti />
                                                <h2 className={`${afacad.className} text-2xl md:text-3xl pointer-events-none user-select-none font-bold mb-4`}>Congratulations!</h2>
                                                <div className="flex flex-col items-center justify-center text-5xl font-bold">
                                                    <ProfileImage profileImage={winnerProfileImage} />
                                                    <div className="flex flex-col items-center justify-center pointer-events-none user-select-none mt-2">
                                                        <span>
                                                            <AutoFont text={`${winner}`} />
                                                        </span>
                                                        <span className={`${afacad.className} text-lg pointer-events-none user-select-none font-normal`}>Winner</span>
                                                    </div>
                                                </div>
                                                <div className={`${afacad.className} mt-8 text-2xl font-bold`}></div>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                            <div className="p-8 flex flex-col items-center justify-center">
                                <h2 className={`${afacad.className} text-black text-2xl md:text-3xl font-bold mb-4`}>{nickname}&apos;s Giveaway</h2> {/* 닉네임 */}
                                <div className="flex items-center mb-4 rounded-lg border bg-aurora-gradient border-gray-100 shadow-md p-4 animate-aurora">
                                    <div className="rounded-lg mr-4 w-16 h-16 overflow-hidden flex items-center justify-center border-2 border-white"
                                        onMouseEnter={handleMouseEnterItem}
                                        onMouseLeave={handleMouseLeaveItem}
                                        onMouseMove={handleMouseMove}
                                    >
                                        <Image alt="Prize" src="prize/prize002.png" width={40} height={40} style={{ objectFit: "contain" }} />
                                    </div>
                                    <div>
                                        <h3 className={`${afacad.className} text-xl font-bold text-white animate-bounce`}>
                                            <AutoFont text='로얄 상자'></AutoFont>
                                        </h3>
                                        <p className={`${afacad.className} text-white`}>x{prizeCount}</p> {/* 개수 */}
                                    </div>
                                    {isItemVisible && (
                                        <div
                                            style={{
                                                position: 'fixed',
                                                top: mousePosition.y + 10,
                                                left: mousePosition.x + 10,
                                                pointerEvents: 'none',
                                                zIndex: 1000,
                                            }}
                                        >
                                            <Tooltip.Item1 />
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-4 w-full">
                                    <div className="space-y-2">
                                        <label htmlFor="access" className={`${afacad.className} block text-sm font-medium text-gray-700`}>
                                            Access Key
                                        </label>
                                        <input
                                            id="access"
                                            className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                            placeholder="Access Key는 특수한 경로로 얻을 수 있습니다."
                                            style={{
                                                fontFamily: `${afacad.style.fontFamily}, ${do_Hyeon.style.fontFamily}`,
                                                pointerEvents: 'auto'  // pointer-events: none; 가 아닌 auto로 설정
                                            }}
                                        />
                                        <style jsx>{`
                                            .placeholder-custom::placeholder {
                                            font-family: ${afacad.style.fontFamily}, ${do_Hyeon.style.fontFamily};
                                            }
                                        `}</style>
                                    </div>
                                    <div className="flex space-x-8">
                                        <div
                                            onMouseEnter={handleMouseEnterHint}
                                            onMouseLeave={handleMouseLeaveHint}
                                            onMouseMove={handleMouseMove}
                                            className={`${afacad.className} text-center w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-700 hover:bg-purple-600 mx-auto`}
                                        >
                                            Hint?
                                        </div>
                                        {isHintVisible && (
                                            <div
                                                style={{
                                                    position: 'fixed',
                                                    top: mousePosition.y + 10,
                                                    left: mousePosition.x + 10,
                                                    pointerEvents: 'none',
                                                    zIndex: 1000,
                                                }}
                                            >
                                                <Tooltip.Giveaway_AccessKey01 />
                                            </div>
                                        )}
                                        <button
                                            onClick={handleEnterNow}
                                            className={`${afacad.className} w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-700 hover:bg-purple-600 mx-auto`}
                                        >
                                            Enter!
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ScaleIcon(props: SVGProps<SVGSVGElement>) {
    const gradientRef = useRef<SVGLinearGradientElement>(null);

    useEffect(() => {
        const gradient = gradientRef.current;
        let rotateAngle = 0;

        const animate = () => {
            rotateAngle = (rotateAngle + 1) % 360;
            if (gradient) {
                gradient.setAttribute('gradientTransform', `rotate(${rotateAngle}, 0.5, 0.5)`);
            }
            requestAnimationFrame(animate);
        };

        animate();
    }, []);

    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-20 h-20"
        >
            <defs>
                <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="0%" y2="100%" ref={gradientRef}>
                    <stop offset="0%" stopColor="#6a82fb" />
                    <stop offset="100%" stopColor="#b892ff" />
                </linearGradient>
            </defs>
            <g stroke="url(#animatedGradient)" strokeWidth={2}>
                <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2 M7 21h10 M12 3v18" />
            </g>
        </svg>
    );
}
