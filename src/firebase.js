// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAaRK5_ShM7ToVh4sP0PQbyElznu7O7Oo",
  authDomain: "landingpage-a5700.firebaseapp.com",
  projectId: "landingpage-a5700",
  storageBucket: "landingpage-a5700.firebasestorage.app",
  messagingSenderId: "584901776334",
  appId: "1:584901776334:web:cc74420a94fbc88fa1119f",
  measurementId: "G-CQEV8J00YK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
