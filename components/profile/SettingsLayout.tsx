import React, { useState } from 'react';
import { Shield, Sliders, Activity, CreditCard as CreditCardIcon, FolderHeart } from 'lucide-react';
import { CreditCard } from '@/components/profile/CreditCard';

export function SettingsLayout() {
  const [activeSubTab, setActiveSubTab] = useState('Account & Security');

  const subTabs = [
    { id: 'Account & Security', icon: Shield },
    { id: 'Preferences & Customization', icon: Sliders },
    { id: 'Activity & Credits', icon: Activity },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-1 space-y-1">
        {subTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeSubTab === tab.id
              ? 'bg-accent/10 text-accent'
              : 'text-muted hover:bg-black/5 dark:bg-white/5 hover:text-primary'
              }`}
          >
            <tab.icon size={18} />
            {tab.id}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="lg:col-span-3">
        {activeSubTab === 'Account & Security' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b border-border pb-4">Password & Security</h3>
            <div className="bg-surface border border-border p-6 rounded-xl space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted mb-2">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full max-w-sm bg-black/20 border border-border rounded-md px-4 py-2.5 outline-none focus:border-accent/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-2">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full max-w-sm bg-black/20 border border-border rounded-md px-4 py-2.5 outline-none focus:border-accent/50" />
              </div>
              <button className="px-6 py-2.5 bg-accent text-black font-bold rounded-md hover:bg-accent-hover transition-colors">
                Update Password
              </button>
            </div>

            <h3 className="text-xl font-bold border-b border-border pb-4 mt-8">Account Management</h3>
            <div className="bg-surface border border-border p-6 rounded-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Two-Factor Authentication (2FA)</div>
                  <div className="text-sm text-muted">Add an extra layer of security to your account.</div>
                </div>
                <button className="px-4 py-2 border border-border rounded-md text-sm font-medium hover:bg-black/5 dark:bg-white/5">
                  Enable 2FA
                </button>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="text-red-500 font-medium mb-1">Delete Account</div>
                <div className="text-sm text-muted mb-3">Permanently delete your NExPEDIA account and all associated data.</div>
                <button className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-md text-sm font-medium hover:bg-red-500/20 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'Preferences & Customization' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b border-border pb-4">Theme Switcher</h3>
            <div className="bg-surface border border-border p-6 rounded-xl flex gap-4">
              {['Light', 'Dark', 'System Default'].map((theme, i) => (
                <label key={theme} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="theme" defaultChecked={i === 1} className="text-accent" />
                  <span className="text-sm font-medium">{theme}</span>
                </label>
              ))}
            </div>

            <h3 className="text-xl font-bold border-b border-border pb-4 mt-8">Language & Region</h3>
            <div className="bg-surface border border-border p-6 rounded-xl space-y-6">
              <div>
                <label className="block text-sm font-medium text-muted mb-2">Language</label>
                <select className="w-full max-w-sm bg-black/20 border border-border rounded-md px-4 py-2.5 outline-none focus:border-accent/50 appearance-none">
                  <option>US English</option>
                  <option>UK English</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-2">Timezone</label>
                <select className="w-full max-w-sm bg-black/20 border border-border rounded-md px-4 py-2.5 outline-none focus:border-accent/50 appearance-none">
                  <option>Eastern Time (US & Canada)</option>
                  <option>Pacific Time (US & Canada)</option>
                  <option>London (GMT)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'Activity & Credits' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold border-b border-border pb-4">Contribution Credits</h3>

            {/* The Credit Card is now rendered here */}
            <CreditCard credits={18} onSubmitClick={() => {
              // Since it's inside Settings, this could trigger a modal from context, 
              // but for this UI, we can leave it as a mock or pass a prop.
              alert("Submit prompt modal opened from settings");
            }} />

            <div className="bg-surface border border-border p-6 rounded-xl">
              <h4 className="font-bold mb-4">Credit History</h4>
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium text-sm">Prompt Approved</div>
                      <div className="text-xs text-muted">YouTube Ad Copy Generator</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-accent">+1 Credit</span>
                      <span className="text-xs text-muted">Sep 5, 2026</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-xl font-bold border-b border-border pb-4 mt-8 flex items-center gap-2">
              <FolderHeart size={20} />
              Saved Collections
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map(i => (
                <div key={i} className="bg-surface border border-border p-5 rounded-xl hover:border-accent/50 transition-colors cursor-pointer">
                  <h4 className="font-bold mb-1">Marketing Prompts</h4>
                  <p className="text-sm text-muted mb-4">42 Private Prompts</p>
                  <button className="text-xs font-medium bg-black/10 dark:bg-white/10 px-3 py-1.5 rounded hover:bg-black/20 dark:bg-white/20 transition-colors">
                    Manage Collection
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
