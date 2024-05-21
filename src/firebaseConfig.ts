// firebaseConfig.ts
import { initializeApp, getApps } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyBn-n632GriEqbTJ5P4mYzsbn4FVwlXxto',
    authDomain: 'latale-1d43a.firebaseapp.com',
    projectId: 'latale-1d43a',
    storageBucket: 'latale-1d43a.appspot.com',
    messagingSenderId: '954188583993',
    appId: '1:954188583993:web:4ca5fe0a1bd5f3ddff69e8',
    databaseURL: 'https://latale-1d43a-default-rtdb.firebaseio.com',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const storage = getStorage(app);
const database = getDatabase(app);

export { storage, database };
