// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjIoWl1nN5LbmG9j8n6DddRv5693mJBUY",
  authDomain: "image-2a8fb.firebaseapp.com",
  projectId: "image-2a8fb",
  storageBucket: "image-2a8fb.firebasestorage.app",
  messagingSenderId: "589305802060",
  appId: "1:589305802060:web:6e3719a7d3ac9d528cf3e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;