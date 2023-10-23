import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAinjs7r3Yz2jPYwn709I3aSnhifGV8CGE",
    authDomain: "testforge-34ea7.firebaseapp.com",
    projectId: "testforge-34ea7",
    storageBucket: "testforge-34ea7.appspot.com",
    messagingSenderId: "563319437592",
    appId: "1:563319437592:web:a84152084e4a9a9e8ac66d",
    measurementId: "G-SS9TF3L94X"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const functions = getFunctions();
const analytics = getAnalytics(app);