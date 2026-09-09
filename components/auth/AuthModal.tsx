"use client";

import React, { useState } from 'react';
import { X, Eye, EyeOff, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, defaultView = 'login' }: AuthModalProps) {
  const { login, register, loginWithGoogle } = useAuth();

  const [view, setView] = useState<'login' | 'signup'>(defaultView);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const reset = () => {
    setError('');
    setSuccess('');
    setName('');
    setEmail('');
    setPassword('');
  };

  const switchView = (v: 'login' | 'signup') => {
    reset();
    setView(v);
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await loginWithGoogle();
      setSuccess('Signed in with Google! 🎉');
      setTimeout(() => {
        onClose();
        reset();
      }, 800);
    } catch (err: any) {
      setError(err?.message || 'Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (view === 'signup') {
        await register(name.trim(), email.trim(), password);
        setSuccess('Account created! Welcome to Nexpedia 🎉');
        setTimeout(() => { onClose(); reset(); }, 1200);
      } else {
        await login(email.trim(), password);
        setSuccess('Welcome back! 👋');
        setTimeout(() => { onClose(); reset(); }, 800);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-[6px]"
        onClick={() => { onClose(); reset(); }}
      />

      {/* Modal */}
      <div className="relative w-full max-w-[420px] animate-in fade-in zoom-in-95 duration-200"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        }}>

        {/* Close */}
        <button
          id="auth-modal-close"
          onClick={() => { onClose(); reset(); }}
          className="absolute top-4 right-4 transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-7">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-2xl mb-4"
            style={{ background: '#ff3366' }}>
            N
          </div>
          <h2 className="text-2xl font-bold mb-1.5" style={{ color: 'var(--text-primary)' }}>
            {view === 'login' ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {view === 'login' ? 'Sign in to continue creating' : 'Join Nexpedia for free'}
          </p>
        </div>

        {/* Google OAuth button */}
        <button
          type="button"
          id="auth-google-btn"
          disabled={loading}
          onClick={handleGoogleSignIn}
          className="w-full h-[44px] flex items-center justify-center gap-3 rounded-[8px] transition-colors mb-5 text-sm font-medium hover:opacity-90 active:scale-[0.99] disabled:opacity-50"
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-elevated)')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-4 mb-5">
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>OR</span>
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {view === 'signup' && (
            <input
              id="auth-name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="w-full rounded-[8px] px-4 py-3 text-sm outline-none transition-all"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(255,51,102,0.45)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
          )}

          <input
            id="auth-email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full rounded-[8px] px-4 py-3 text-sm outline-none transition-all"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'rgba(255,51,102,0.45)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
          />

          <div className="relative">
            <input
              id="auth-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={view === 'login' ? 'current-password' : 'new-password'}
              className="w-full rounded-[8px] px-4 py-3 pr-16 text-sm outline-none transition-all"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(255,51,102,0.45)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2.5 px-4 py-3 rounded-lg text-sm"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
              <AlertTriangle size={15} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm"
              style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', color: '#4ade80' }}>
              <CheckCircle size={15} className="shrink-0" />
              {success}
            </div>
          )}

          {/* Submit */}
          <button
            id="auth-submit-btn"
            type="submit"
            disabled={loading || !!success}
            className="w-full py-3 rounded-[8px] font-semibold text-sm transition-all flex items-center justify-center gap-2 mt-1"
            style={{
              background: '#ff3366',
              color: '#fff',
              opacity: loading || success ? 0.7 : 1,
            }}
          >
            {loading
              ? <><RefreshCw size={15} className="animate-spin" /> Processing...</>
              : view === 'login' ? 'Sign In' : 'Create Account'
            }
          </button>
        </form>

        {/* Switch view */}
        <div className="mt-5 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
          {view === 'login' ? (
            <p>
              Don&apos;t have an account?{' '}
              <button id="auth-switch-signup" onClick={() => switchView('signup')}
                className="font-semibold transition-colors" style={{ color: 'var(--text-primary)' }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#ff3366')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text-primary)')}>
                Sign up free
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button id="auth-switch-login" onClick={() => switchView('login')}
                className="font-semibold transition-colors" style={{ color: 'var(--text-primary)' }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#ff3366')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text-primary)')}>
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
