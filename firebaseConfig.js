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
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Use environment variable for flexibility
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Conditionally initialize Analytics in the browser
if (typeof window !== "undefined" && firebaseConfig.measurementId) {
    try {
        const { getAnalytics } = require("firebase/analytics");
        analytics = getAnalytics(app);
    } catch (error) {
        console.error("Firebase Analytics initialization failed:", error);
    }
}

// Initialize Firestore
export const db = getFirestore(app);
export { analytics };
