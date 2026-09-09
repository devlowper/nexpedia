"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Bell, User as UserIcon, Settings, Sun, Moon, LogOut } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from '@/components/auth/AuthModal';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ open: boolean; view: 'login' | 'signup' }>({ open: false, view: 'login' });
  const pathname = usePathname();
  const { isDark, toggle } = useTheme();
  const { user, isLoggedIn, isLoading, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Prompt Library', href: '/prompt-library' },
    { name: 'AI Directory', href: '/ai-directory' },
    { name: 'AI Models', href: '/ai-models' },
  ];

  const openLogin = () => setAuthModal({ open: true, view: 'login' });
  const openSignup = () => setAuthModal({ open: true, view: 'signup' });
  const closeModal = () => setAuthModal((p) => ({ ...p, open: false }));

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
  };

  // Avatar initial
  const initial = user?.name?.[0]?.toUpperCase() ?? 'U';

  return (
    <>
      <nav className={cn(
        "fixed z-40 transition-all duration-300 h-[60px] left-1/2 -translate-x-1/2",
        scrolled
          ? "top-4 w-[calc(100%-2rem)] max-w-5xl rounded-full bg-black/5 dark:bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-border shadow-lg scrolled"
          : "top-0 w-full max-w-full rounded-none bg-transparent border border-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded flex items-center justify-center bg-accent text-black font-black text-xl">
              N
            </div>
            <span className="font-bold text-lg tracking-tight">
              <span className="text-primary group-hover:text-gray-300 transition-colors">Nex</span>
              <span className="text-accent">pedia</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[0.875rem] transition-colors px-3 py-1.5 rounded-md",
                  pathname === link.href
                    ? "text-accent bg-black/5 dark:bg-black/5 dark:bg-white/5 font-bold"
                    : "text-primary hover:text-primary hover:bg-surface font-medium"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              // Skeleton while checking auth
              <div className="w-8 h-8 rounded-full animate-pulse" style={{ background: 'var(--bg-elevated)' }} />
            ) : !isLoggedIn ? (
              <>
                <button
                  id="navbar-login-btn"
                  onClick={openLogin}
                  className="text-sm font-medium px-4 py-2 rounded-md hover:bg-surface text-primary transition-colors"
                >
                  Login
                </button>
                <button
                  id="navbar-signup-btn"
                  onClick={openSignup}
                  className="bg-accent text-black text-sm font-semibold px-5 py-2 rounded-full hover:bg-accent-hover transition-colors"
                >
                  Start for Free →
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                {/* Notification bell */}
                <button className="text-muted hover:text-primary transition-colors relative">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full" />
                </button>

                {/* User Avatar + Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    id="navbar-user-btn"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="w-8 h-8 rounded-full gradient-pink flex items-center justify-center text-black font-bold text-sm border border-[rgba(255,51,102,0.3)] transition-all hover:scale-105"
                    title={user?.name}
                  >
                    {initial}
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-xl py-2 shadow-2xl animate-in slide-in-from-top-2 fade-in duration-150"
                      style={{
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border)',
                        backdropFilter: 'blur(20px)',
                      }}>
                      {/* User info header */}
                      <div className="px-4 py-2.5 border-b mb-1" style={{ borderColor: 'var(--border)' }}>
                        <div className="font-semibold text-sm truncate" style={{ color: 'var(--text-primary)' }}>{user?.name}</div>
                        <div className="text-xs truncate mt-0.5" style={{ color: 'var(--text-muted)' }}>{user?.email}</div>
                      </div>

                      <Link href="/profile" onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                        <UserIcon size={15} /> Profile
                      </Link>

                      <Link href="/profile" onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                        <Settings size={15} /> Settings
                      </Link>

                      <button onClick={toggle}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                        {isDark ? <Sun size={15} /> : <Moon size={15} />}
                        {isDark ? 'Light Mode' : 'Dark Mode'}
                      </button>

                      <div className="h-px my-1" style={{ background: 'var(--border)' }} />

                      <button
                        id="navbar-logout-btn"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors"
                        style={{ color: '#f87171' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.06)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                        <LogOut size={15} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-muted hover:text-primary" onClick={() => setMobileOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative w-64 h-full border-l p-6 shadow-2xl animate-in slide-in-from-right fade-in duration-300"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
            <button className="absolute top-4 right-4 text-muted hover:text-primary" onClick={() => setMobileOpen(false)}>
              <X size={24} />
            </button>
            <div className="flex flex-col gap-5 mt-8">
              {links.map(link => (
                <Link key={link.href} href={link.href}
                  className={cn("text-lg font-medium transition-colors",
                    pathname === link.href ? "text-accent" : "text-muted hover:text-primary"
                  )}
                  onClick={() => setMobileOpen(false)}>
                  {link.name}
                </Link>
              ))}
              <hr style={{ borderColor: 'var(--border)' }} />
              {!isLoggedIn ? (
                <>
                  <button onClick={() => { setMobileOpen(false); openLogin(); }}
                    className="text-left text-lg font-medium text-muted hover:text-primary transition-colors">
                    Login
                  </button>
                  <button onClick={() => { setMobileOpen(false); openSignup(); }}
                    className="bg-accent text-black text-center font-semibold py-3 rounded-full hover:bg-accent-hover transition-colors">
                    Start for Free
                  </button>
                </>
              ) : (
                <>
                  <div className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                    Signed in as <span style={{ color: 'var(--text-primary)' }}>{user?.name}</span>
                  </div>
                  <button onClick={() => { setMobileOpen(false); handleLogout(); }}
                    className="text-left text-sm font-medium transition-colors" style={{ color: '#f87171' }}>
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.open}
        onClose={closeModal}
        defaultView={authModal.view}
      />
    </>
  );
}
