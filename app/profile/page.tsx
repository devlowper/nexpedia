"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { api } from '@/lib/apiClient';
import { ContributionStats } from '@/components/profile/ContributionStats';
import { SubmitPromptModal } from '@/components/profile/SubmitPromptModal';
import { EditProfileModal } from '@/components/profile/EditProfileModal';
import { LogoutModal } from '@/components/profile/LogoutModal';
import { ChangePasswordModal } from '@/components/profile/ChangePasswordModal';
import { DeleteAccountModal } from '@/components/profile/DeleteAccountModal';
import { DesignPromptCard } from '@/components/prompts/DesignPromptCard';
import {
  LayoutDashboard,
  Library,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Shield,
  Moon,
  Globe,
  Download,
  Trash2,
  Lock,
  EyeOff,
  Palette,
  Sun,
  Monitor,
  Check,
  Sliders,
  ShieldCheck,
  MapPin,
  Edit3,
  Share2,
  Heart,
  Plus,
  Crown
} from 'lucide-react';

export default function ProfileDashboard() {
  const { user, logout, refreshUser } = useAuth();
  const { isDark: isDarkMode, toggle: toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('Settings');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [submissions, setSubmissions] = useState<any[]>([]);
  const [savedPrompts, setSavedPrompts] = useState<any[]>([]);

  // Settings State
  const [isPrivateProfile, setIsPrivateProfile] = useState(false);
  const [language, setLanguage] = useState('English (US)');
  const [defaultModel, setDefaultModel] = useState('ChatGPT 4o');
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Load persisted preferences on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('pref_language');
    const savedModel = localStorage.getItem('pref_defaultModel');
    if (savedLang) setLanguage(savedLang);
    if (savedModel) setDefaultModel(savedModel);
  }, []);

  const handleLanguageChange = (val: string) => {
    setLanguage(val);
    localStorage.setItem('pref_language', val);
    document.documentElement.lang = val.startsWith('English (UK)') ? 'en-GB'
      : val.startsWith('English') ? 'en'
        : val.startsWith('French') ? 'fr'
          : val.startsWith('Spanish') ? 'es'
            : val.startsWith('German') ? 'de'
              : 'en';
    showSavedToast();
  };

  const handleModelChange = (val: string) => {
    setDefaultModel(val);
    localStorage.setItem('pref_defaultModel', val);
    showSavedToast();
  };

  const showSavedToast = () => {
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  const handleDownloadData = () => {
    const data = {
      profile: user,
      submissions: submissions,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nexpedia-data-${user?.username || 'user'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const mockFeature = (feature: string) => {
    alert(`The ${feature} feature is currently in development and will be available soon!`);
  };

  useEffect(() => {
    if (user) {
      api.get<any[]>('/api/submissions/me').then(setSubmissions).catch(console.error);
      api.getSavedPrompts<any[]>().then(setSavedPrompts).catch(console.error);
    }
  }, [user?.id]);

  const displayedSavedPrompts = savedPrompts.filter((prompt: any) =>
    user?.savedPrompts?.includes(prompt._id || prompt.id)
  );

  const profileUser = {
    name: user?.name || 'Guest User',
    username: user?.username || user?.email?.split('@')[0] || 'guest',
    bio: user?.bio || 'Generative AI Specialist & Prompt Engineer.',
    location: user?.location || 'United States',
    email: user?.email || '',
    avatar: user?.avatar || ''
  };

  const stats = {
    prompts: submissions.length,
    uses: submissions.reduce((acc, sub) => acc + (sub.usageCount || 0), 0),
    rating: 4.9,
    upvotes: submissions.reduce((acc, sub) => acc + (sub.saveCount || 0), 0),
    credits: user?.credits || 0
  };

  const navItems = [
    { id: 'Dashboard', icon: LayoutDashboard },
    { id: 'My Library', icon: Library },
    { id: 'Saved Prompts', icon: Heart },
    { id: 'Profile', icon: User },
    { id: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-base flex flex-col md:flex-row animate-in fade-in duration-500 text-primary">

      {/* Settings Saved Toast */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: settingsSaved ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(16px)',
          opacity: settingsSaved ? 1 : 0,
          pointerEvents: settingsSaved ? 'auto' : 'none',
          transition: 'opacity 0.3s, transform 0.3s',
          zIndex: 9999,
        }}
      >
        <div className="flex items-center gap-2 bg-green-500 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-xl">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          Preference saved
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-full md:w-[280px] shrink-0 border-r border-border bg-surface/50 p-6 flex flex-col min-h-screen">

        <div className="mb-8 px-2 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-accent flex items-center justify-center text-black font-black text-lg">N</div>
          <span className="font-bold text-lg">Nexpedia</span>
        </div>

        <div className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${activeTab === item.id
                ? 'bg-base dark:bg-black dark:bg-white text-primary dark:text-black shadow-md scale-[1.02]'
                : 'text-muted hover:bg-black/5 dark:hover:bg-black/5 dark:bg-white/5 hover:text-primary'
                }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                {item.id}
              </div>
            </button>
          ))}
        </div>

        <div className="pt-4 mt-4 border-t border-border">
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto bg-base transition-colors duration-300">

        <div className="max-w-5xl mx-auto space-y-8">

          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{activeTab}</h1>
              <p className="text-muted mt-1">
                {activeTab === 'Dashboard' && 'Track your performance and recent activity.'}
                {activeTab === 'My Library' && 'Manage your saved prompts, folders, and published work.'}
                {activeTab === 'Saved Prompts' && 'View all the prompts you have saved.'}
                {activeTab === 'Profile' && 'Manage your public identity and creator status.'}
                {activeTab === 'Settings' && 'Manage your account security, preferences, and data.'}
              </p>
            </div>
            {['Dashboard', 'My Library'].includes(activeTab) && (
              <button onClick={() => setIsSubmitModalOpen(true)} className="px-6 py-3 bg-accent text-black rounded-xl text-sm font-bold shadow-lg shadow-accent/20 hover:scale-105 transition-all">
                Submit Prompt
              </button>
            )}
          </header>

          {/* 1. Dashboard / Overview */}
          {activeTab === 'Dashboard' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <ContributionStats stats={stats} />

              <div className="bg-surface border border-border p-8 rounded-[24px] shadow-sm">
                <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                {submissions.length === 0 ? (
                  <p className="text-muted text-sm">No recent activity.</p>
                ) : (
                  <div className="space-y-4">
                    {submissions.slice(0, 3).map((sub: any) => (
                      <div key={sub._id} className="flex items-center justify-between pb-4 border-b border-border/50 last:border-0 last:pb-0">
                        <div>
                          <div className="font-semibold">{sub.title}</div>
                          <div className="text-xs text-muted mt-1">Submitted on {new Date(sub.createdAt).toLocaleDateString()}</div>
                        </div>
                        <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${sub.status === 'approved' ? 'bg-green-500/10 text-green-500' :
                          sub.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                            'bg-yellow-500/10 text-yellow-500'
                          }`}>
                          {sub.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 2. My Library */}
          {activeTab === 'My Library' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface border border-border p-8 rounded-[24px] shadow-sm hover:border-accent/30 transition-colors cursor-pointer group">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">My Published Prompts</h3>
                  <p className="text-sm text-muted mb-4">View and manage prompts you have shared with the community.</p>
                  <div className="text-2xl font-black">{submissions.filter(s => s.status === 'approved').length} <span className="text-sm font-medium text-muted">Published</span></div>
                </div>

                <div className="bg-surface border border-border p-8 rounded-[24px] shadow-sm hover:border-accent/30 transition-colors cursor-pointer group" onClick={() => setActiveTab('Saved Prompts')}>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">Saved & Folders</h3>
                  <p className="text-sm text-muted mb-4">Access your bookmarked prompts and custom folders.</p>
                  <div className="text-2xl font-black">{displayedSavedPrompts.length} <span className="text-sm font-medium text-muted">Saved items</span></div>
                </div>
              </div>

              <div className="bg-surface border border-border p-8 rounded-[24px] shadow-sm">
                <h3 className="text-lg font-bold mb-6">All Submissions</h3>
                {submissions.length === 0 ? (
                  <div className="text-center py-10 text-muted">No submissions found.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {submissions.map((sub: any) => (
                      <div key={sub._id} className="bg-base border border-border p-5 rounded-2xl flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase bg-black/5 dark:bg-black/5 dark:bg-white/5 px-2 py-1 rounded text-muted">{sub.category}</span>
                            <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${sub.status === 'approved' ? 'bg-green-500/10 text-green-500' :
                              sub.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                                'bg-yellow-500/10 text-yellow-500'
                              }`}>
                              {sub.status}
                            </span>
                          </div>
                          <h4 className="font-bold mb-2">{sub.title}</h4>
                          <p className="text-sm text-muted line-clamp-2 mb-4">{sub.description}</p>
                        </div>
                        <div className="text-xs text-muted flex justify-between pt-3 border-t border-border/50">
                          <span>{new Date(sub.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 2.5 Saved Prompts */}
          {activeTab === 'Saved Prompts' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div className="bg-surface border border-border p-8 rounded-[24px] shadow-sm">
                <h3 className="text-lg font-bold mb-6">Saved Prompts</h3>
                {displayedSavedPrompts.length === 0 ? (
                  <div className="text-center py-10 text-muted">No saved prompts yet. Explore the library to save some!</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayedSavedPrompts.map((prompt: any, i: number) => (
                      <DesignPromptCard key={prompt._id || prompt.id} prompt={prompt} index={i} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 3. Profile */}
          {activeTab === 'Profile' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">



              {/* Hero Card */}
              <div className="bg-surface border border-border p-10 rounded-[24px] shadow-sm relative overflow-hidden flex flex-col items-center justify-center text-center group cursor-pointer" onClick={() => setIsEditModalOpen(true)}>
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />

                {/* Edit Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditModalOpen(true);
                  }} 
                  className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 border border-accent/30 text-accent hover:bg-accent/10 rounded-xl text-xs font-bold transition-all z-20 hover:scale-105 shadow-sm"
                >
                  <Edit3 size={14} />
                  Edit
                </button>

                <div className="relative z-10 w-32 h-32 rounded-full bg-base border-[6px] border-surface shadow-md flex items-center justify-center overflow-hidden mb-4 ring-2 ring-accent/20 group-hover:ring-accent transition-all">
                  {profileUser.avatar ? (
                    <img src={profileUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User size={64} strokeWidth={2.5} className="text-accent" />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold text-white text-sm backdrop-blur-sm">
                    Edit Avatar
                  </div>
                </div>

                <h3 className="text-2xl font-bold relative z-10 text-black dark:text-white">{profileUser.name}</h3>
                <div className="mt-2 inline-flex items-center px-3 py-1 bg-accent/10 text-accent text-[11px] font-bold tracking-wider rounded-md border border-accent/10 relative z-10">
                  #USER-10001
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* About Me */}
                <div className="bg-surface border border-border p-6 rounded-[24px] shadow-sm flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <User size={20} className="text-accent" />
                    </div>
                    <h3 className="font-bold text-lg text-black dark:text-white">About Me</h3>
                  </div>
                  <p className="text-muted text-sm leading-relaxed">{profileUser.bio || 'Generative AI Specialist & Prompt Engineer.'}</p>
                </div>

                {/* Location & Region */}
                <div className="bg-surface border border-border p-6 rounded-[24px] shadow-sm flex flex-col relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <MapPin size={20} className="text-accent" />
                    </div>
                    <h3 className="font-bold text-lg text-black dark:text-white">Location & Region</h3>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-muted">
                    <Globe size={18} />
                    {profileUser.location || 'United States'}
                  </div>

                  <button onClick={() => setIsEditModalOpen(true)} className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 border border-accent/30 text-accent hover:bg-accent/10 rounded-xl text-xs font-bold transition-colors">
                    <Edit3 size={14} />
                    Edit
                  </button>
                </div>
              </div>

              {/* Social Media & Plans */}
              <div className="bg-surface border border-border p-6 md:p-8 rounded-[24px] shadow-sm flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Share2 size={20} className="text-accent" />
                    </div>
                    <h3 className="font-bold text-lg text-black dark:text-white">Social Media & Plans</h3>
                  </div>
                  <p className="text-sm text-muted mb-6">Connect your social accounts and manage your plan.</p>

                  <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </button>
                    <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
                    </button>
                    <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    </button>
                    <button className="w-10 h-10 rounded-full border border-accent/30 bg-accent/5 flex items-center justify-center text-accent"><Globe size={18} /></button>
                    <button className="w-10 h-10 rounded-full border border-dashed border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors"><Plus size={18} /></button>
                    <span className="text-xs font-medium text-muted ml-1">Add More</span>
                  </div>
                </div>

                <div className="w-full md:w-px md:h-24 bg-border hidden md:block"></div>
                <hr className="w-full border-border md:hidden" />

                <div className="flex-1 w-full">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-base text-black dark:text-white">Your Plan</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase">Free Plan</span>
                  </div>
                  <p className="text-sm text-muted mb-6">Explore basic features and get started with Nexpedia.</p>

                  <button className="flex items-center gap-2 px-5 py-2.5 border border-accent/30 text-accent hover:bg-accent/10 rounded-xl text-sm font-bold transition-colors w-max">
                    <Crown size={16} />
                    Upgrade to Premium
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* 4. Settings */}
          {activeTab === 'Settings' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">

              {/* Theme Selection */}
              <div className="bg-surface border border-border p-8 rounded-[32px] shadow-sm mb-6">
                <div className="flex flex-col xl:flex-row gap-8 items-start xl:items-center justify-between">
                  <div className="flex items-start gap-4 max-w-sm">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                      <Palette className="text-accent" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Theme</h3>
                      <p className="text-sm text-muted">Choose the theme that works best for you.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Light Mode */}
                    <button
                      onClick={() => isDarkMode && toggleDarkMode()}
                      className={`theme-btn relative ${!isDarkMode ? 'active-theme' : ''}`}
                    >
                      <Sun size={16} className="theme-btn-svg shrink-0" />
                      <span className="theme-btn-letter font-bold text-sm">Light Mode</span>
                    </button>
                    {/* Dark Mode */}
                    <button
                      onClick={() => !isDarkMode && toggleDarkMode()}
                      className={`theme-btn relative ${isDarkMode ? 'active-theme' : ''}`}
                    >
                      <Moon size={16} className="theme-btn-svg shrink-0" />
                      <span className="theme-btn-letter font-bold text-sm">Dark Mode</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Account Security */}
                <div className="bg-surface border border-border p-8 rounded-[32px] shadow-sm flex flex-col justify-start">
                  <div className="flex items-start gap-4 mb-8">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                      <Shield className="text-accent" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Account Security</h3>
                      <p className="text-sm text-muted">Manage your password and authentication methods.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <button onClick={() => setIsPasswordModalOpen(true)} className="w-full flex items-center justify-between p-5 rounded-2xl bg-base border border-border hover:border-accent/50 transition-colors group">
                      <div className="flex items-center gap-4 text-left">
                        <Lock size={20} className="text-accent shrink-0" />
                        <div>
                          <span className="font-semibold text-sm block">Change Password</span>
                          <span className="text-xs text-muted mt-0.5 block">Update your account password</span>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-muted group-hover:text-accent transition-colors shrink-0" />
                    </button>
                    <button onClick={() => mockFeature('Two-Factor Authentication')} className="w-full flex items-center justify-between p-5 rounded-2xl bg-base border border-border hover:border-accent/50 transition-colors group">
                      <div className="flex items-center gap-4 text-left">
                        <ShieldCheck size={20} className="text-accent shrink-0" />
                        <div>
                          <span className="font-semibold text-sm block">Two-Factor Auth (2FA)</span>
                          <span className="text-xs text-muted mt-0.5 block">Add an extra layer of security</span>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-muted group-hover:text-accent transition-colors shrink-0" />
                    </button>
                  </div>
                </div>

                {/* Preferences */}
                <div className="bg-surface border border-border p-8 rounded-[32px] shadow-sm flex flex-col justify-start">
                  <div className="flex items-start gap-4 mb-8">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                      <Sliders className="text-accent" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">App Preferences</h3>
                      <p className="text-sm text-muted">Customize your experience across Nexpedia.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {/* Language Dropdown */}
                    <div className="w-full flex items-center justify-between p-5 rounded-2xl bg-base border border-border">
                      <div className="text-left">
                        <span className="font-semibold text-sm block">Language</span>
                        <span className="text-xs text-muted mt-0.5 block">Interface display language</span>
                      </div>
                      <select
                        value={language}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        className="bg-base text-primary text-sm outline-none cursor-pointer border border-border rounded-lg px-3 py-1.5 hover:border-accent/50 transition-colors font-medium"
                      >
                        <option value="English (US)">English (US)</option>
                        <option value="English (UK)">English (UK)</option>
                        <option value="French">French</option>
                        <option value="Spanish">Spanish</option>
                        <option value="German">German</option>
                      </select>
                    </div>
                    {/* Default AI Model */}
                    <div className="w-full flex items-center justify-between p-5 rounded-2xl bg-base border border-border">
                      <div className="text-left">
                        <span className="font-semibold text-sm block">Default AI Model</span>
                        <span className="text-xs text-muted mt-0.5 block">Used in Prompt Generator</span>
                      </div>
                      <select
                        value={defaultModel}
                        onChange={(e) => handleModelChange(e.target.value)}
                        className="bg-base text-primary text-sm outline-none cursor-pointer border border-border rounded-lg px-3 py-1.5 hover:border-accent/50 transition-colors font-medium"
                      >
                        <option value="ChatGPT 4o">ChatGPT 4o</option>
                        <option value="ChatGPT 3.5">ChatGPT 3.5</option>
                        <option value="Claude 3.5">Claude 3.5</option>
                        <option value="Claude 3 Opus">Claude 3 Opus</option>
                        <option value="Gemini 1.5 Pro">Gemini 1.5 Pro</option>
                        <option value="Midjourney">Midjourney</option>
                        <option value="DALL·E 3">DALL·E 3</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compliance & Data */}
              <div className="bg-surface border border-border p-8 rounded-[32px] shadow-sm mt-6">
                <div className="flex items-center gap-3 mb-6">
                  <Lock size={20} className="text-muted" />
                  <h3 className="font-bold text-lg">Privacy & Data Control</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                  {/* Private Profile Toggle */}
                  <div className="p-5 rounded-2xl bg-base border border-border flex flex-col justify-between">
                    <div>
                      <EyeOff size={20} className="text-muted mb-3" />
                      <h4 className="font-semibold text-sm mb-1">Private Profile</h4>
                      <p className="text-xs text-muted mb-4">Hide your profile from public view.</p>
                    </div>
                    <div
                      onClick={() => setIsPrivateProfile(!isPrivateProfile)}
                      className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${isPrivateProfile ? 'bg-accent' : 'bg-black/10 dark:bg-black/10 dark:bg-white/10'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${isPrivateProfile ? 'right-1 bg-base dark:bg-black' : 'left-1 bg-white dark:bg-muted'}`} />
                    </div>
                  </div>

                  {/* Download Data */}
                  <button
                    onClick={handleDownloadData}
                    className="p-5 rounded-2xl bg-base border border-border text-left hover:border-accent/50 transition-colors group flex flex-col justify-between"
                  >
                    <div>
                      <Download size={20} className="text-muted mb-3 group-hover:text-accent transition-colors" />
                      <h4 className="font-semibold text-sm mb-1">Download My Data</h4>
                      <p className="text-xs text-muted">Export a JSON of all your prompts.</p>
                    </div>
                  </button>

                  {/* Delete Account */}
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="p-5 rounded-2xl bg-red-500/5 border border-red-500/20 text-left hover:bg-red-500/10 transition-colors group flex flex-col justify-between"
                  >
                    <div>
                      <Trash2 size={20} className="text-red-500 mb-3" />
                      <h4 className="font-semibold text-sm text-red-500 mb-1">Delete Account</h4>
                      <p className="text-xs text-red-500/70">Permanently delete your data.</p>
                    </div>
                  </button>

                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      <SubmitPromptModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={profileUser}
      />
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={logout}
      />
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}
