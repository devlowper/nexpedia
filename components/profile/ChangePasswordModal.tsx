"use client";

import React, { useState } from 'react';
import { X, Lock, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { api } from '@/lib/apiClient';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.put<any>('/api/users/change-password', {
        currentPassword,
        newPassword
      });
      setSuccess('Password updated successfully!');
      setTimeout(() => {
        onClose();
        setCurrentPassword('');
        setNewPassword('');
        setSuccess('');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to update password. Did you sign up with Google?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[6px]" onClick={onClose} />
      <div className="relative w-full max-w-[420px] bg-base border border-border rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted hover:text-primary transition-colors">
          <X size={20} />
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Lock className="text-accent" size={20} />
          </div>
          <h2 className="text-xl font-bold text-primary">Change Password</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-primary">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 outline-none focus:border-accent text-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-primary">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 outline-none focus:border-accent text-primary"
              required
            />
          </div>
          {error && (
            <div className="flex items-start gap-2.5 px-4 py-3 rounded-lg text-sm bg-red-500/10 border border-red-500/20 text-red-500">
              <AlertTriangle size={15} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm bg-green-500/10 border border-green-500/20 text-green-500">
              <CheckCircle size={15} className="shrink-0" />
              {success}
            </div>
          )}
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg font-bold bg-surface border border-border hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-lg font-bold bg-accent text-white flex justify-center items-center gap-2">
              {loading ? <RefreshCw className="animate-spin" size={16} /> : 'Save Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
