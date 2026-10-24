import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "necpedia.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "necpedia",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "necpedia.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "435771996911",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:435771996911:web:be469658d66644b22bb91a",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-93Z63PVMEE",
};

let app: FirebaseApp;
let auth: Auth;

try {
  if (firebaseConfig.apiKey) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
  } else {
    app = (getApps().length ? getApp() : {}) as FirebaseApp;
    auth = {} as Auth;
  }
} catch (error) {
  // Gracefully handle server-side build prerender without crashing
  app = (getApps().length ? getApp() : {}) as FirebaseApp;
  auth = {} as Auth;
}

export { auth };
export default app;
