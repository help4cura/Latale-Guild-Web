import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));

app.get('/', (req, res) => {
    const now = new Date();
    const serverTime = now.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }); // 한국 표준시 문자열로 변환
    console.log(`Server time (KST): ${serverTime}`); // 로깅 추가
    res.status(200).json({ serverTime });
});

export const getServerTime = functions.https.onRequest(app);