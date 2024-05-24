import React, { useState, useEffect } from 'react';
import { Afacad } from 'next/font/google';

const afacad = Afacad({
    subsets: ['latin']
});

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

export default CountdownTimer;
