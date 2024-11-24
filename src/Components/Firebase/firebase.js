// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfei7ynME7cVLV353WejTOmL3-TUDHtvI",
    authDomain: "cinema-world-f032b.firebaseapp.com",
    projectId: "cinema-world-f032b",
    storageBucket: "cinema-world-f032b.firebasestorage.app",
    messagingSenderId: "14756545869",
    appId: "1:14756545869:web:2c5923176edff1525a2304",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app