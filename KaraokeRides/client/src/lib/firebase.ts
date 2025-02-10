// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics"; // Import getAnalytics if you plan to use it
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../../.env' });

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Validation
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error('Firebase configuration is incomplete. Check your .env file');
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app); // Initialize analytics if you want to use it

// **Real Firebase signUp function**
export async function signUp(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Firebase signup successful:", user);
    return user;
  } catch (error: any) {
    console.error("Firebase signup error:", error.code, error.message); // Log detailed error info
    throw error; // Re-throw to handle in components
  }
}

// **Real Firebase signIn function**
export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Firebase signin successful:", user);
    return user;
  } catch (error: any) {
    console.error("Firebase signin error:", error.code, error.message); // Log detailed error info
    throw error; // Re-throw to handle in components
  }
}

// **Real Firebase logOut function**
export async function logOut() {
  try {
    await signOut(auth);
    console.log("Firebase logout successful");
  } catch (error: any) {
    console.error("Firebase logout error:", error.code, error.message); // Log detailed error info
    throw error; // Re-throw to handle in components
  }
}