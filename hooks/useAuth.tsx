"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "@/lib/apiClient";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

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
  isPromptSaved: (promptId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [guestSavedPrompts, setGuestSavedPrompts] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        return JSON.parse(localStorage.getItem("guest_saved_prompts") || "[]");
      } catch {
        return [];
      }
    }
    return [];
  });

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
    // Authenticate directly with MongoDB backend (fast, reliable, no 403 errors)
    const data = await api.post<{ token: string; user: any }>("/api/users/register", { 
      name: name.trim(), 
      email: email.trim(), 
      password 
    });
    localStorage.setItem("token", data.token);
    setUser({ ...data.user, id: data.user._id || data.user.id });
  };

  const login = async (email: string, password: string) => {
    // Authenticate directly with MongoDB backend
    const data = await api.post<{ token: string; user: any }>("/api/users/login", { 
      email: email.trim(), 
      password 
    });
    localStorage.setItem("token", data.token);
    setUser({ ...data.user, id: data.user._id || data.user.id });
  };

  const loginWithGoogle = async () => {
    const fbAuth = getFirebaseAuth();
    if (!fbAuth) {
      throw new Error("Google authentication is currently not available. Please sign in with email and password.");
    }

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      // Trigger Firebase Google Sign-In Popup
      const result = await signInWithPopup(fbAuth, provider);
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
        throw new Error('This domain is not authorized in Firebase. Please use email and password to sign in.');
      }
      if (
        (err.message && (err.message.includes('Requests from referer') || err.message.includes('API_KEY_HTTP_REFERRER_BLOCKED'))) ||
        err.code === 'auth/requests-from-referer-are-blocked'
      ) {
        throw new Error('Google Sign-In is blocked by Google API Key Website restrictions. Please add https://necpedia.firebaseapp.com/* and localhost to Google Cloud Console credentials, or sign in with email & password.');
      }
      console.error("Google Auth Error:", err);
      throw new Error(err.message || 'Failed to sign in with Google');
    }
  };

  const logout = useCallback(async () => {
    const fbAuth = getFirebaseAuth();
    if (fbAuth) {
      try {
        await firebaseSignOut(fbAuth);
      } catch (e) {
        console.warn("Firebase sign out warning:", e);
      }
    }
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null);
  }, []);

  const refreshUser = async () => {
    await fetchUser();
  };

  const isPromptSaved = useCallback((promptId: string) => {
    if (!promptId) return false;
    const norm = String(promptId);
    if (user?.savedPrompts?.some(id => String(id) === norm)) return true;
    return guestSavedPrompts.some(id => String(id) === norm);
  }, [user?.savedPrompts, guestSavedPrompts]);

  const toggleSavedPrompt = async (promptId: string) => {
    if (!promptId) return;
    const norm = String(promptId);

    // Guest Wishlist (when not logged in)
    if (!user) {
      setGuestSavedPrompts(prev => {
        const exists = prev.some(id => String(id) === norm);
        const next = exists ? prev.filter(id => String(id) !== norm) : [...prev, norm];
        try {
          localStorage.setItem("guest_saved_prompts", JSON.stringify(next));
        } catch (e) {
          console.warn("Could not save to localStorage", e);
        }
        return next;
      });
      return;
    }

    // Logged in user: optimistic update + sync
    const isSaved = user.savedPrompts?.some(id => String(id) === norm);
    const newSavedPrompts = isSaved 
      ? (user.savedPrompts || []).filter(id => String(id) !== norm) 
      : [...(user.savedPrompts || []), norm];
    
    setUser({ ...user, savedPrompts: newSavedPrompts });

    try {
      await api.toggleSavePrompt(norm);
    } catch (error) {
      console.error("Failed to toggle save", error);
      // Revert optimistic update on failure
      await refreshUser();
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: !!user, isLoading, login, register, loginWithGoogle, logout, refreshUser, toggleSavedPrompt, isPromptSaved }}
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
