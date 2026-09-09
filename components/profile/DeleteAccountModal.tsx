"use client";

import React, { useState } from 'react';
import { X, Trash2, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { api } from '@/lib/apiClient';
import { useAuth } from '@/hooks/useAuth';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteAccountModal({ isOpen, onClose }: DeleteAccountModalProps) {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [confirmText, setConfirmText] = useState('');

  if (!isOpen) return null;

  const handleDelete = async () => {
    if (confirmText !== 'DELETE') {
      setError('Please type DELETE to confirm.');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await api.delete<any>('/api/users/delete-account');
      setSuccess('Account deleted. Redirecting...');
      setTimeout(() => {
        onClose();
        logout();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to delete account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[6px]" onClick={onClose} />
      <div className="relative w-full max-w-[420px] bg-base border border-red-500/20 rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted hover:text-primary transition-colors">
          <X size={20} />
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
            <Trash2 className="text-red-500" size={20} />
          </div>
          <h2 className="text-xl font-bold text-red-500">Delete Account</h2>
        </div>
        
        <p className="text-sm text-primary mb-4">
          Are you sure you want to delete your account? This action is <span className="font-bold">permanent</span> and cannot be undone. All your saved prompts and data will be lost.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-2 text-muted">Type DELETE to confirm</label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE"
              className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 outline-none focus:border-red-500 text-primary"
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
            <button 
              type="button" 
              onClick={handleDelete}
              disabled={loading || confirmText !== 'DELETE'} 
              className="flex-1 py-2.5 rounded-lg font-bold bg-red-500 text-white flex justify-center items-center gap-2 disabled:opacity-50"
            >
              {loading ? <RefreshCw className="animate-spin" size={16} /> : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
