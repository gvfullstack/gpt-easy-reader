// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

let analytics; // Declare analytics globally but don't initialize yet

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: "G-23J967XL2N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Conditionally initialize Analytics in the browser
if (typeof window !== "undefined") {
    const { getAnalytics } = require("firebase/analytics");
    analytics = getAnalytics(app);
}

// Initialize Firestore
export const db = getFirestore(app);
export { analytics };
