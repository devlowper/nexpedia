"use client";

import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle, XCircle, Clock, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminSubmissionsDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('pending');
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingSub, setEditingSub] = useState<any>(null);
  const [editForm, setEditForm] = useState({ title: "", category: "", content: "" });
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("admin_token");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      const res = await fetch(`${API}/api/admin/submissions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data && data.data) {
        setSubmissions(data.data);
      } else if (data && data.length !== undefined) {
        setSubmissions(data);
      }
    } catch (err) {
      console.error("Failed to fetch submissions", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const token = sessionStorage.getItem("admin_token");
      await fetch(`${API}/api/admin/submissions/${id}/approve`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSubmissions();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const token = sessionStorage.getItem("admin_token");
      await fetch(`${API}/api/admin/submissions/${id}/reject`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSubmissions();
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (sub: any) => {
    setEditForm({ title: sub.title, category: sub.category, content: sub.content });
    setEditingSub(sub);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSub) return;
    const token = sessionStorage.getItem("admin_token");
    setEditLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/submissions/${editingSub._id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });
      const data = await res.json();
      if (data.success) {
        setEditingSub(null);
        fetchSubmissions();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEditLoading(false);
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
    <div className="space-y-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-bricolage mb-2">Prompt Submissions</h1>
          <p className="text-[var(--text-muted)]">Review, edit, and approve community prompt submissions.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-[var(--border)] mb-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-accent text-accent' 
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
            <span className="ml-2 bg-black/10 dark:bg-white/10 text-[var(--text-muted)] px-2 py-0.5 rounded-full text-xs">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-20 text-center animate-pulse text-[var(--text-muted)]">Loading submissions...</div>
      ) : (
      <div className="rounded-xl overflow-hidden border" style={{ background: "var(--glass-bg)", borderColor: "var(--border)" }}>
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-[var(--border)] bg-black/5 dark:bg-white/5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
          <div className="col-span-3">User</div>
          <div className="col-span-4">Prompt Title</div>
          <div className="col-span-2">Tool / Category</div>
          <div className="col-span-1">Date</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Actual List */}
        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {submissions.filter(s => s.status === activeTab).length === 0 ? (
            <div className="p-8 text-center text-[var(--text-muted)]">No {activeTab} submissions.</div>
          ) : (
            submissions.filter(s => s.status === activeTab).map(sub => (
              <div key={sub._id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
                    {sub.author?.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <div className="font-medium text-sm line-clamp-1">{sub.author?.name || 'Unknown User'}</div>
                    <div className="text-xs text-[var(--text-muted)] truncate">{sub.author?.email || ''}</div>
                  </div>
                </div>
                <div className="col-span-4 font-medium text-sm truncate">
                  {sub.title}
                </div>
                <div className="col-span-2">
                  <div className="text-xs font-medium bg-black/10 dark:bg-white/10 inline-block px-2 py-0.5 rounded text-[var(--text-muted)] mb-1">{sub.tools?.join(', ') || 'AI'}</div>
                  <div className="text-xs text-[var(--text-muted)] truncate">{sub.category}</div>
                </div>
                <div className="col-span-1 text-xs text-[var(--text-muted)]">
                  {new Date(sub.createdAt).toLocaleDateString()}
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <button onClick={() => openEditModal(sub)} className="px-3 py-1.5 border border-[var(--border)] rounded text-xs font-medium hover:bg-black/5 dark:hover:bg-white/5">
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

      {/* Edit Modal */}
      {editingSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl border p-6" style={{ background: "var(--bg-base)", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Edit Submission</h2>
              <button onClick={() => setEditingSub(null)} className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input 
                  type="text" 
                  value={editForm.title}
                  onChange={e => setEditForm({...editForm, title: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-accent/50"
                  style={{ background: "var(--glass-bg)", borderColor: "var(--border)", color: "var(--text-primary)" }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <input 
                  type="text" 
                  value={editForm.category}
                  onChange={e => setEditForm({...editForm, category: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-accent/50"
                  style={{ background: "var(--glass-bg)", borderColor: "var(--border)", color: "var(--text-primary)" }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Prompt Content</label>
                <textarea 
                  value={editForm.content}
                  onChange={e => setEditForm({...editForm, content: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-accent/50 min-h-[150px]"
                  style={{ background: "var(--glass-bg)", borderColor: "var(--border)", color: "var(--text-primary)" }}
                  required
                />
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setEditingSub(null)}
                  className="px-4 py-2 rounded-xl text-sm font-bold border hover:bg-black/5 dark:hover:bg-white/5"
                  style={{ borderColor: "var(--border)" }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={editLoading}
                  className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-accent hover:opacity-90 disabled:opacity-50"
                >
                  {editLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
