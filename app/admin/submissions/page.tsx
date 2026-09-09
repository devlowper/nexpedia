"use client";

import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { api } from '@/lib/apiClient';

export default function AdminSubmissionsDashboard() {
  const [activeTab, setActiveTab] = useState('pending');
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const res = await api.get<any>('/api/admin/submissions');
      if (res && res.data) {
        setSubmissions(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch submissions", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await api.put(`/api/admin/submissions/${id}/approve`, {});
      fetchSubmissions();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await api.put(`/api/admin/submissions/${id}/reject`, {});
      fetchSubmissions();
    } catch (err) {
      console.error(err);
    }
  };

  const counts = {
    pending: submissions.filter(s => s.status === 'pending').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    rejected: submissions.filter(s => s.status === 'rejected').length,
    drafts: submissions.filter(s => s.status === 'draft').length,
  };

  const tabs = [
    { id: 'pending', label: 'Pending', icon: Clock, count: counts.pending },
    { id: 'approved', label: 'Approved', icon: CheckCircle, count: counts.approved },
    { id: 'rejected', label: 'Rejected', icon: XCircle, count: counts.rejected },
    { id: 'draft', label: 'Drafts', icon: FileText, count: counts.drafts },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-bricolage mb-2">Prompt Submissions</h1>
          <p className="text-muted">Review, edit, and approve community prompt submissions.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-border mb-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-accent text-accent' 
                : 'border-transparent text-muted hover:text-primary'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
            <span className="ml-2 bg-black/10 dark:bg-white/10 text-muted px-2 py-0.5 rounded-full text-xs">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-20 text-center animate-pulse text-muted">Loading submissions...</div>
      ) : (
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-black/20 text-xs font-semibold text-muted uppercase tracking-wider">
          <div className="col-span-3">User</div>
          <div className="col-span-4">Prompt Title</div>
          <div className="col-span-2">Tool / Category</div>
          <div className="col-span-1">Date</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Actual List */}
        <div className="divide-y divide-border">
          {submissions.filter(s => s.status === activeTab).length === 0 ? (
            <div className="p-8 text-center text-muted">No {activeTab} submissions.</div>
          ) : (
            submissions.filter(s => s.status === activeTab).map(sub => (
              <div key={sub._id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-black/5 dark:bg-white/5 transition-colors">
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
                    {sub.author?.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <div className="font-medium text-sm line-clamp-1">{sub.author?.name || 'Unknown User'}</div>
                    <div className="text-xs text-muted truncate">{sub.author?.email || ''}</div>
                  </div>
                </div>
                <div className="col-span-4 font-medium text-sm truncate">
                  {sub.title}
                </div>
                <div className="col-span-2">
                  <div className="text-xs font-medium bg-black/10 dark:bg-white/10 inline-block px-2 py-0.5 rounded text-muted mb-1">{sub.tools?.join(', ') || 'AI'}</div>
                  <div className="text-xs text-muted truncate">{sub.category}</div>
                </div>
                <div className="col-span-1 text-xs text-muted">
                  {new Date(sub.createdAt).toLocaleDateString()}
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <button className="px-3 py-1.5 border border-border rounded text-xs font-medium hover:bg-black/5 dark:bg-white/5">
                    Edit
                  </button>
                  {sub.status !== 'approved' && (
                    <button onClick={() => handleApprove(sub._id)} className="px-3 py-1.5 bg-green-500/20 text-green-500 border border-green-500/30 rounded text-xs font-medium hover:bg-green-500/30 transition-colors">
                      Approve
                    </button>
                  )}
                  {sub.status !== 'rejected' && (
                    <button onClick={() => handleReject(sub._id)} className="px-3 py-1.5 bg-red-500/20 text-red-500 border border-red-500/30 rounded text-xs font-medium hover:bg-red-500/30 transition-colors">
                      Reject
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      )}
    </div>
  );
}
