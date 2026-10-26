import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBwYfz-o4CkHklzpPOEC7SRUtK6m040Hcs",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "necpedia.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "necpedia",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "necpedia.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "435771996911",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:435771996911:web:be469658d66644b22bb91a",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-93Z63PVMEE",
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

export function getFirebaseApp(): FirebaseApp | null {
  if (typeof window === "undefined" || !firebaseConfig.apiKey) return null;
  if (!app) {
    try {
      app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    } catch (error) {
      console.warn("Firebase app init warning:", error);
    }
  }
  return app;
}

export function getFirebaseAuth(): Auth | null {
  if (typeof window === "undefined" || !firebaseConfig.apiKey) return null;
  if (!auth) {
    try {
      const fApp = getFirebaseApp();
      if (fApp) {
        auth = getAuth(fApp);
      }
    } catch (error) {
      console.warn("Firebase auth init warning:", error);
    }
  }
  return auth;
}

// For backward compatibility
export { auth, app };
export default app;
