"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Bell, User as UserIcon, Settings, Sun, Moon, LogOut } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from '@/components/auth/AuthModal';
import { cn } from '@/lib/utils';
import { getApiBaseUrl } from '@/lib/apiClient';
import { CometButton } from '@/components/ui/CometButton';

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
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const API = getApiBaseUrl();

  // Helper to arm the ads-free protection shield on all nav actions
  const shieldNavAction = () => {
    if (typeof window !== 'undefined' && (window as any).__armAdsFree) {
      (window as any).__armAdsFree(2500);
    }
  };

  // Bulletproof mobile hamburger protection: stops any ad scripts from intercepting touch/pointer events
  useEffect(() => {
    const btn = hamburgerRef.current;
    if (!btn) return;

    const stopRogueInterception = (e: Event) => {
      shieldNavAction();
      e.stopPropagation();
      if ('stopImmediatePropagation' in e) {
        e.stopImmediatePropagation();
      }
    };

    const handleMobileTap = (e: Event) => {
      shieldNavAction();
      e.stopPropagation();
      e.preventDefault();
      if ('stopImmediatePropagation' in e) {
        e.stopImmediatePropagation();
      }
      setMobileOpen((prev) => !prev);
    };

    btn.addEventListener('pointerdown', stopRogueInterception, { capture: true });
    btn.addEventListener('touchstart', stopRogueInterception, { capture: true });
    btn.addEventListener('touchend', handleMobileTap, { capture: true });
    btn.addEventListener('mousedown', stopRogueInterception, { capture: true });

    return () => {
      btn.removeEventListener('pointerdown', stopRogueInterception, { capture: true });
      btn.removeEventListener('touchstart', stopRogueInterception, { capture: true });
      btn.removeEventListener('touchend', handleMobileTap, { capture: true });
      btn.removeEventListener('mousedown', stopRogueInterception, { capture: true });
    };
  }, []);

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
          const token = localStorage.getItem('token') || sessionStorage.getItem('token');
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
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
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
      <nav
        data-ads-free="true"
        onPointerDown={shieldNavAction}
        className={cn(
        "fixed z-[90] transition-all duration-300 h-[60px] left-1/2 -translate-x-1/2",
        scrolled
          ? "top-4 w-[calc(100%-2rem)] max-w-5xl rounded-full bg-black/5 dark:bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-border shadow-lg scrolled"
          : "top-0 w-full max-w-full rounded-none bg-transparent border border-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            data-ads-free="true"
            data-nav-item="true"
            onClick={shieldNavAction}
            className="flex items-center group transition-opacity hover:opacity-90 py-1"
            title="proCraft | Prompt Library & Directory"
          >
            <Image
              src="/logo-dark-v2.png"
              alt="proCraft — AI Prompt Library & Directory"
              width={140}
              height={26}
              priority
              unoptimized
              className={cn("h-7 w-auto object-contain", scrolled ? "hidden" : "block dark:hidden")}
            />
            <Image
              src="/logo-light-v2.png"
              alt="proCraft — AI Prompt Library & Directory"
              width={140}
              height={26}
              priority
              unoptimized
              className={cn("h-7 w-auto object-contain", scrolled ? "block" : "hidden dark:block")}
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                data-ads-free="true"
                data-nav-item="true"
                onClick={shieldNavAction}
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
                  data-ads-free="true"
                  data-nav-item="true"
                  onClick={() => { shieldNavAction(); openLogin(); }}
                  className="text-sm font-medium px-4 py-2 rounded-md hover:bg-surface text-primary transition-colors"
                >
                  Login
                </button>
                <CometButton
                  id="navbar-signup-btn"
                  data-ads-free="true"
                  data-nav-item="true"
                  onClick={() => { shieldNavAction(); openSignup(); }}
                  backgroundColor={isDark ? '#0b0c10' : '#111318'}
                  hoverBackgroundColor={isDark ? '#151722' : '#1c1f2a'}
                  textColor="#ffffff"
                  hoverTextColor="#ffffff"
                  padding="0.45rem 1.25rem"
                  fontSize="0.875rem"
                  fontWeight={600}
                >
                  Get Start
                </CometButton>
              </>
            ) : (
              <div className="flex items-center gap-3">
                {/* Notification bell */}
                <div className="relative" ref={notifRef}>
                  <button
                    data-ads-free="true"
                    data-nav-item="true"
                    onClick={() => { shieldNavAction(); setNotificationsOpen(!notificationsOpen); }}
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
                <button
                  data-ads-free="true"
                  data-nav-item="true"
                  onClick={() => { shieldNavAction(); toggle(); }}
                  className="text-muted hover:text-primary transition-colors"
                  title="Toggle Theme"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* User Avatar */}
                <Link
                  id="navbar-user-btn"
                  href="/profile"
                  data-ads-free="true"
                  data-nav-item="true"
                  onClick={shieldNavAction}
                  className="w-8 h-8 rounded-full gradient-pink flex items-center justify-center text-black font-bold text-sm border border-[rgba(255,51,102,0.3)] transition-all hover:scale-105 ml-1"
                  title={`${user?.name} (Profile)`}
                >
                  {initial}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Right Controls */}
          <div className="md:hidden flex items-center gap-2 relative z-50">
            {isLoggedIn && (
              <Link
                href="/profile"
                data-ads-free="true"
                data-nav-item="true"
                onClick={shieldNavAction}
                className="w-7 h-7 rounded-full gradient-pink flex items-center justify-center text-black font-bold text-xs border border-[rgba(255,51,102,0.3)] shadow-sm"
                title={`${user?.name} (Profile)`}
              >
                {initial}
              </Link>
            )}
            <button
              type="button"
              ref={hamburgerRef}
              id="navbar-hamburger-btn"
              data-ads-free="true"
              data-nav-item="true"
              aria-label="Toggle navigation menu"
              className="p-1.5 -mr-1 text-muted hover:text-primary transition-colors cursor-pointer select-none"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                shieldNavAction();
                setMobileOpen((prev) => !prev);
              }}
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div data-ads-free="true" data-mobile-drawer="true" className="fixed inset-0 z-[100] flex justify-end">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              shieldNavAction();
              setMobileOpen(false);
            }}
          />
          <div
            className="relative w-64 h-full border-l p-6 shadow-2xl overflow-y-auto transition-transform duration-300"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
            onClick={(e) => {
              e.stopPropagation();
              shieldNavAction();
            }}
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
              <Link
                href="/"
                data-ads-free="true"
                data-nav-item="true"
                onClick={() => {
                  shieldNavAction();
                  setMobileOpen(false);
                }}
                className="inline-block"
              >
                <Image
                  src="/logo-dark-v2.png"
                  alt="proCraft — AI Prompt Library & Directory"
                  width={120}
                  height={22}
                  unoptimized
                  className="block dark:hidden h-5 w-auto object-contain"
                />
                <Image
                  src="/logo-light-v2.png"
                  alt="proCraft — AI Prompt Library & Directory"
                  width={120}
                  height={22}
                  unoptimized
                  className="hidden dark:block h-5 w-auto object-contain"
                />
              </Link>
              <button
                data-ads-free="true"
                data-nav-item="true"
                className="text-muted hover:text-primary p-1"
                onClick={() => {
                  shieldNavAction();
                  setMobileOpen(false);
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col gap-5">
              {links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-ads-free="true"
                  data-nav-item="true"
                  className={cn("text-lg font-medium transition-colors",
                    pathname === link.href ? "text-accent" : "text-muted hover:text-primary"
                  )}
                  onClick={() => {
                    shieldNavAction();
                    setMobileOpen(false);
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <hr style={{ borderColor: 'var(--border)' }} />
              {!isLoggedIn ? (
                <>
                  <button
                    data-ads-free="true"
                    data-nav-item="true"
                    onClick={() => {
                      shieldNavAction();
                      setMobileOpen(false);
                      openLogin();
                    }}
                    className="text-left text-lg font-medium text-muted hover:text-primary transition-colors"
                  >
                    Login
                  </button>
                  <CometButton
                    id="mobile-navbar-signup-btn"
                    data-ads-free="true"
                    data-nav-item="true"
                    onClick={() => {
                      shieldNavAction();
                      setMobileOpen(false);
                      openSignup();
                    }}
                    className="w-full"
                    backgroundColor={isDark ? '#0b0c10' : '#111318'}
                    hoverBackgroundColor={isDark ? '#151722' : '#1c1f2a'}
                    textColor="#ffffff"
                    hoverTextColor="#ffffff"
                    padding="0.75rem 1.5rem"
                    fontSize="1rem"
                    fontWeight={600}
                  >
                    Get Start
                  </CometButton>
                </>
              ) : (
                <>
                  <Link
                    href="/profile"
                    data-ads-free="true"
                    data-nav-item="true"
                    onClick={() => {
                      shieldNavAction();
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-border hover:border-accent/40 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full gradient-pink flex items-center justify-center text-black font-bold text-sm shadow-sm shrink-0">
                      {initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-primary truncate group-hover:text-accent transition-colors">
                        {user?.name || "User Profile"}
                      </div>
                      <div className="text-xs text-muted truncate">
                        {user?.email || "View profile & prompts"}
                      </div>
                    </div>
                    <UserIcon size={16} className="text-muted group-hover:text-primary shrink-0" />
                  </Link>

                  <div className="flex flex-col gap-2 pt-2">
                    <Link
                      href="/profile"
                      data-ads-free="true"
                      data-nav-item="true"
                      onClick={() => {
                        shieldNavAction();
                        setMobileOpen(false);
                      }}
                      className="text-left text-base font-medium text-primary hover:text-accent transition-colors flex items-center gap-2 py-1"
                    >
                      <UserIcon size={18} className="text-accent" />
                      <span>My Profile</span>
                    </Link>

                    {user?.role === 'admin' && (
                      <Link
                        href="/admin"
                        data-ads-free="true"
                        data-nav-item="true"
                        onClick={() => {
                          shieldNavAction();
                          setMobileOpen(false);
                        }}
                        className="text-left text-base font-medium text-primary hover:text-accent transition-colors flex items-center gap-2 py-1"
                      >
                        <Settings size={18} className="text-accent" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    <button
                      data-ads-free="true"
                      data-nav-item="true"
                      onClick={() => {
                        shieldNavAction();
                        setMobileOpen(false);
                        handleLogout();
                      }}
                      className="text-left text-base font-medium transition-colors flex items-center gap-2 py-2 text-red-500 hover:text-red-400 mt-2 border-t border-border/50"
                    >
                      <LogOut size={18} />
                      <span>Sign Out</span>
                    </button>
                  </div>
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
