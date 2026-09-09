"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "@/lib/apiClient";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  username?: string;
  bio?: string;
  location?: string;
  website?: string;
  socials?: any;
  credits?: number;
  savedPrompts?: string[];
}

interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  toggleSavedPrompt: (promptId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      if (localStorage.getItem("token")) {
        const userData = await api.get<any>("/api/users/me");
        setUser({ ...userData, id: userData._id || userData.id });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user from MongoDB", error);
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const register = async (name: string, email: string, password: string) => {
    // 1. Create account in Firebase Auth
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
    } catch (fbErr: any) {
      console.warn("Firebase signup notice:", fbErr?.message);
    }

    // 2. Persist in MongoDB
    const data = await api.post<{ token: string; user: any }>("/api/users/register", { 
      name: name.trim(), 
      email: email.trim(), 
      password 
    });
    localStorage.setItem("token", data.token);
    setUser({ ...data.user, id: data.user._id || data.user.id });
  };

  const login = async (email: string, password: string) => {
    // 1. Sign in with Firebase Auth
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (fbErr: any) {
      console.warn("Firebase login notice:", fbErr?.message);
    }

    // 2. Authenticate with MongoDB backend
    const data = await api.post<{ token: string; user: any }>("/api/users/login", { 
      email: email.trim(), 
      password 
    });
    localStorage.setItem("token", data.token);
    setUser({ ...data.user, id: data.user._id || data.user.id });
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      // Trigger Firebase Google Sign-In Popup
      const result = await signInWithPopup(auth, provider);
      const fbUser = result.user;

      const profile = {
        name: fbUser.displayName || 'Google User',
        email: fbUser.email || '',
        avatar: fbUser.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        googleId: fbUser.uid,
        firebaseUid: fbUser.uid
      };

      // Sync and retrieve from MongoDB database
      const data = await api.post<{ token: string; user: any }>("/api/users/google-auth", profile);
      localStorage.setItem("token", data.token);
      setUser({ ...data.user, id: data.user._id || data.user.id });
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
        throw new Error('Google sign-in popup was closed.');
      }
      if (err.code === 'auth/unauthorized-domain') {
        throw new Error('This domain is not authorized in your Firebase console. Please add localhost to Authorized Domains in Firebase Authentication Settings.');
      }
      console.error("Google Auth Error:", err);
      throw new Error(err.message || 'Failed to sign in with Google');
    }
  };

  const logout = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.warn("Firebase sign out warning:", e);
    }
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  const refreshUser = async () => {
    await fetchUser();
  };

  const toggleSavedPrompt = async (promptId: string) => {
    if (!user) return;
    const isSaved = user.savedPrompts?.includes(promptId);
    
    // Optimistic update
    const newSavedPrompts = isSaved 
      ? (user.savedPrompts || []).filter(id => id !== promptId) 
      : [...(user.savedPrompts || []), promptId];
    
    setUser({ ...user, savedPrompts: newSavedPrompts });

    try {
      await api.toggleSavePrompt(promptId);
    } catch (error) {
      console.error("Failed to toggle save", error);
      // Revert optimistic update on failure
      await refreshUser();
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: !!user, isLoading, login, register, loginWithGoogle, logout, refreshUser, toggleSavedPrompt }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
