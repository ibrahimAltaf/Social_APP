// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "upskillsocial-affc8.firebaseapp.com",
  projectId: "upskillsocial-affc8",
  storageBucket: "upskillsocial-affc8.firebasestorage.app",
  messagingSenderId: "609766850228",
  appId: "1:609766850228:web:6b40f641aaef3fa883e1e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);