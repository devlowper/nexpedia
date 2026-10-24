"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Bell, User as UserIcon, Settings, Sun, Moon, LogOut } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from '@/components/auth/AuthModal';
import { cn } from '@/lib/utils';
import { getApiBaseUrl } from '@/lib/apiClient';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ open: boolean; view: 'login' | 'signup' }>({ open: false, view: 'login' });
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  const pathname = usePathname();
  const { isDark, toggle } = useTheme();
  const { user, isLoggedIn, isLoading, logout } = useAuth();

  const notifRef = useRef<HTMLDivElement>(null);
  const API = getApiBaseUrl();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchNotifs = async () => {
        try {
          const token = sessionStorage.getItem('token');
          if (!token) return;
          const res = await fetch(`${API}/api/users/notifications`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.success) {
            setNotifications(data.data);
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchNotifs();
      const interval = setInterval(fetchNotifs, 30000); // Check every 30s
      return () => clearInterval(interval);
    } else {
      setNotifications([]);
    }
  }, [isLoggedIn]);

  const markAsRead = async (id: string) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) return;
      await fetch(`${API}/api/users/notifications/${id}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Prompt Library', href: '/prompt-library' },
    { name: 'AI Directory', href: '/ai-directory' },
    { name: 'Img to Prompt', href: '/image-to-prompt' },
  ];

  const openLogin = () => setAuthModal({ open: true, view: 'login' });
  const openSignup = () => setAuthModal({ open: true, view: 'signup' });
  const closeModal = () => setAuthModal((p) => ({ ...p, open: false }));

  const handleLogout = async () => {
    await logout();
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
          <Link href="/" className="flex items-center gap-2 group" title="proCraft - AI Prompt Library & Directory">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-accent text-white font-black text-xl shadow-sm">
              P
            </div>
            <span className="font-bold text-lg tracking-tight">
              <span className="text-primary group-hover:text-accent transition-colors">pro</span>
              <span className="text-accent">Craft</span>
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
                  Get Start
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                {/* Notification bell */}
                <div className="relative" ref={notifRef}>
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="text-muted hover:text-primary transition-colors relative flex items-center justify-center p-1"
                  >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-accent rounded-full border-[1.5px] border-[var(--bg-base)] flex items-center justify-center" />
                    )}
                  </button>

                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-72 rounded-xl py-2 shadow-2xl animate-in slide-in-from-top-2 fade-in duration-150 max-h-96 overflow-y-auto"
                      style={{
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border)',
                        backdropFilter: 'blur(20px)',
                      }}>
                      <div className="px-4 py-2 border-b font-semibold text-sm" style={{ borderColor: 'var(--border)' }}>
                        Notifications
                      </div>
                      {notifications.length === 0 ? (
                        <div className="px-4 py-4 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
                          No notifications yet.
                        </div>
                      ) : (
                        notifications.map(n => (
                          <div
                            key={n._id}
                            className={`px-4 py-3 border-b last:border-b-0 cursor-pointer transition-colors ${!n.isRead ? 'bg-accent/5' : ''}`}
                            style={{ borderColor: 'var(--border)' }}
                            onClick={() => !n.isRead && markAsRead(n._id)}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-sm truncate" style={{ color: 'var(--text-primary)' }}>{n.title}</span>
                              {!n.isRead && <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0 ml-2" />}
                            </div>
                            <div className="text-xs line-clamp-2" style={{ color: 'var(--text-muted)' }}>{n.message}</div>
                            <div className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>
                              {new Date(n.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>

                {/* Dark Mode Toggle */}
                <button onClick={toggle} className="text-muted hover:text-primary transition-colors" title="Toggle Theme">
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* User Avatar */}
                <Link
                  id="navbar-user-btn"
                  href="/profile"
                  className="w-8 h-8 rounded-full gradient-pink flex items-center justify-center text-black font-bold text-sm border border-[rgba(255,51,102,0.3)] transition-all hover:scale-105 ml-1"
                  title={`${user?.name} (Profile)`}
                >
                  {initial}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button type="button" className="md:hidden relative z-50 p-2 -mr-2 text-muted hover:text-primary" onClick={(e) => { e.stopPropagation(); setMobileOpen(true); }}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={(e) => { e.stopPropagation(); setMobileOpen(false); }} />
          <div className="relative w-64 h-full border-l p-6 shadow-2xl overflow-y-auto transition-transform duration-300"
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
                    Get Start
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
