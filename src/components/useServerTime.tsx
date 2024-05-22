import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface UseServerTimeResult {
    message: string;
    serverTime: Date | null;
}

const useServerTime = (targetDate: Date): UseServerTimeResult => {
    const initialMessage = new Date() >= targetDate ? 'Access Key : Good Luck!' : '2024-05-22 16:30에 공개 됩니다.';
    const [message, setMessage] = useState(initialMessage);
    const [serverTime, setServerTime] = useState<Date | null>(null);

    const parseServerTime = (serverTimeString: string): Date | null => {
        try {
            //console.log(`Raw server time string: "${serverTimeString}"`);
            if (!serverTimeString) {
                throw new Error('Server time string is undefined');
            }

            // "2024. 5. 22. 오후 12:24:30" 형식을 처리
            const isPM = serverTimeString.includes('오후');
            const dateTimeString = serverTimeString.replace('오전 ', '').replace('오후 ', '');
            //console.log(`Processed dateTimeString: "${dateTimeString}"`);

            const datePattern = /(\d{4})\. (\d{1,2})\. (\d{1,2})\./;
            const timePattern = /(\d{1,2}):(\d{2}):(\d{2})/;

            const dateMatch = dateTimeString.match(datePattern);
            const timeMatch = dateTimeString.match(timePattern);

            if (!dateMatch || !timeMatch) {
                throw new Error('Date or time format is incorrect');
            }

            const year = Number(dateMatch[1]);
            const month = Number(dateMatch[2]);
            const day = Number(dateMatch[3]);
            const hour = Number(timeMatch[1]);
            const minute = Number(timeMatch[2]);
            const second = Number(timeMatch[3]);

            //console.log(`Parsed date - Year: ${year}, Month: ${month}, Day: ${day}`);
            //console.log(`Parsed time - Hour: ${hour}, Minute: ${minute}, Second: ${second}`);

            let adjustedHour = hour;
            if (isPM && hour !== 12) {
                adjustedHour += 12;
            } else if (!isPM && hour === 12) {
                adjustedHour = 0;
            }
            //console.log(`Adjusted hour: ${adjustedHour}`);

            const parsedDate = new Date(year, month - 1, day, adjustedHour, minute, second);
            //console.log(`Parsed Date object: ${parsedDate.toString()}`);
            return parsedDate;
        } catch (error) {
            //console.error('Error parsing server time:', error);
            return null;
        }
    };

    const checkDate = useCallback((currentServerTime: Date) => {
        //console.log("checkDate function called");
        if (currentServerTime) {
            const now = currentServerTime;
            //console.log(`Current server time: ${now.toString()}`);
            //console.log(`Target time: ${targetDate.toString()}`);
            //console.log(`Current server time >= Target time: ${now >= targetDate}`);
            if (now >= targetDate) {
                //console.log("Setting message to 'Good Luck!'");
                setMessage('Access Key : Good Luck!');
            } else {
                setMessage('2024-05-22 16:30에 공개 됩니다.');
            }
        } else {
            //console.log("Server time is null");
        }
    }, [targetDate]);

    useEffect(() => {
        const fetchServerTime = async () => {
            try {
                const response = await axios.get<{ serverTime: string }>('https://us-central1-latale-1d43a.cloudfunctions.net/getServerTime');
                //console.log('Server response:', response.data);
                const serverTimeString = response.data.serverTime;
                const serverDate = parseServerTime(serverTimeString);
                //console.log(`Fetched server time: ${serverDate?.toString()}`);
                setServerTime(serverDate);

                if (serverDate) {
                    checkDate(serverDate);
                }
            } catch (error) {
                console.error("Error fetching server time: ", error);
                console.error("Error details:", error);
                console.error("Error response:", error);
            }
        };

        fetchServerTime();
        const interval = setInterval(fetchServerTime, 60000);

        return () => {
            clearInterval(interval);
        };
    }, [checkDate]);

    useEffect(() => {
        if (serverTime) {
            checkDate(serverTime)
        }
    }, [serverTime, checkDate]);

    return { message, serverTime };
};

export default useServerTime;
