// src/services/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// তোমার Firebase Config (তুমি দিয়েছ, ঠিক আছে)
const firebaseConfig = {
  apiKey: "AIzaSyB6H0cK0-RBqSq3wnHZqy-Sa5QN-UEB98E",
  authDomain: "assignment-11-682d0.firebaseapp.com",
  projectId: "assignment-11-682d0",
  storageBucket: "assignment-11-682d0.firebasestorage.app",
  messagingSenderId: "571234752768",
  appId: "1:571234752768:web:225dfeaaf4c376790c7be5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Export সব functions
export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
};