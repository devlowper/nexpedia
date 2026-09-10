"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle, XCircle, Clock,
  RefreshCw, User, AlertTriangle, Inbox
} from "lucide-react";

interface ApprovalRequest {
  _id: string;
  userId: string;
  requestedName: string;
  requestedAvatar?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface Stats {
  pending: number;
  approved: number;
  rejected: number;
}

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function ProfileApprovalsPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  const [queue, setQueue] = useState<ApprovalRequest[]>([]);
  const [stats, setStats] = useState<Stats>({ pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [activeTab, setActiveTab] = useState<"pending" | "all">("pending");

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_token");
    if (stored) {
      setToken(stored);
    } else {
      router.push("/admin/login");
    }
  }, [router]);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchQueue = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/approval-queue`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { 
        sessionStorage.removeItem("admin_token");
        router.push("/admin/login");
        return; 
      }
      const data = await res.json();
      if (data.success) {
        const all: ApprovalRequest[] = data.data;
        setQueue(all);
        setStats({
          pending: all.filter((r) => r.status === "pending").length,
          approved: all.filter((r) => r.status === "approved").length,
          rejected: all.filter((r) => r.status === "rejected").length,
        });
      }
    } catch {
      showToast("Failed to fetch queue.", "error");
    } finally {
      setLoading(false);
    }
  }, [token, router]);

  useEffect(() => {
    if (token) fetchQueue();
  }, [token, fetchQueue]);

  const handleAction = async (req: ApprovalRequest, action: "approve" | "reject") => {
    if (!token) return;
    setActionLoading(req._id + action);
    try {
      const res = await fetch(`${API}/api/admin/approval-action`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          requestId: req._id,
          userId: req.userId,
          requestedName: req.requestedName,
          action,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Action failed.");
      showToast(
        action === "approve" ? "✅ Profile update approved!" : "❌ Request rejected.",
        action === "approve" ? "success" : "error"
      );
      fetchQueue();
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredQueue = activeTab === "pending"
    ? queue.filter((r) => r.status === "pending")
    : queue;

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-fade-in">
          <div className={`px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border ${toast.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
            {toast.type === 'success' ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
            <span className="font-medium text-sm">{toast.msg}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-bricolage mb-2">Profile Approvals</h1>
        <p className="text-[var(--text-muted)]">Manage user profile approval requests.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border flex items-center gap-4" style={{ background: "var(--glass-bg)", borderColor: "var(--border)" }}>
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Pending Requests</p>
            <h3 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{stats.pending}</h3>
          </div>
        </div>
        <div className="p-6 rounded-2xl border flex items-center gap-4" style={{ background: "var(--glass-bg)", borderColor: "var(--border)" }}>
          <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Approved</p>
            <h3 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{stats.approved}</h3>
          </div>
        </div>
        <div className="p-6 rounded-2xl border flex items-center gap-4" style={{ background: "var(--glass-bg)", borderColor: "var(--border)" }}>
          <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
            <XCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Rejected</p>
            <h3 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{stats.rejected}</h3>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="rounded-2xl border overflow-hidden flex flex-col" style={{ background: "var(--glass-bg)", borderColor: "var(--border)", minHeight: "500px" }}>
        {/* Header/Tabs */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'pending' ? 'bg-accent text-white' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
              style={activeTab !== 'pending' ? { color: "var(--text-muted)" } : {}}
            >
              Pending ({stats.pending})
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'all' ? 'bg-accent text-white' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
              style={activeTab !== 'all' ? { color: "var(--text-muted)" } : {}}
            >
              All Requests ({queue.length})
            </button>
          </div>
          <button
            onClick={fetchQueue}
            disabled={loading}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors disabled:opacity-50"
            style={{ color: "var(--text-muted)" }}
            title="Refresh"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 p-0">
          {loading && queue.length === 0 ? (
            <div className="flex items-center justify-center h-full text-[var(--text-muted)] p-10">
              <RefreshCw size={24} className="animate-spin mr-3" />
              Loading queue...
            </div>
          ) : filteredQueue.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[var(--text-muted)] p-20 text-center">
              <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-4">
                <Inbox size={32} className="opacity-50" />
              </div>
              <h3 className="text-lg font-medium" style={{ color: "var(--text-primary)" }}>All caught up!</h3>
              <p className="text-sm mt-1">No {activeTab === "pending" ? "pending " : ""}requests in the queue.</p>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: "var(--border)" }}>
              {filteredQueue.map((req) => (
                <div key={req._id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                  
                  {/* User Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative">
                      {req.requestedAvatar ? (
                        <img src={req.requestedAvatar} alt="Avatar" className="w-14 h-14 rounded-full object-cover border-2" style={{ borderColor: "var(--border)" }} />
                      ) : (
                        <div className="w-14 h-14 rounded-full border-2 flex items-center justify-center bg-black/5 dark:bg-white/5" style={{ borderColor: "var(--border)" }}>
                          <User size={24} style={{ color: "var(--text-muted)" }} />
                        </div>
                      )}
                      {/* Status badge */}
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          req.status === 'pending' ? 'bg-orange-500 border-orange-200' :
                          req.status === 'approved' ? 'bg-green-500 border-green-200' : 'bg-red-500 border-red-200'
                        }`}>
                        {req.status === 'pending' && <Clock size={10} className="text-white" />}
                        {req.status === 'approved' && <CheckCircle size={10} className="text-white" />}
                        {req.status === 'rejected' && <XCircle size={10} className="text-white" />}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>{req.requestedName}</h3>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                        <span className="bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded">ID: {req.userId.slice(-6)}</span>
                        <span>•</span>
                        <span>{timeAgo(req.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                    {req.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleAction(req, "reject")}
                          disabled={actionLoading === req._id + "reject"}
                          className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-sm font-bold text-red-500 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors disabled:opacity-50"
                        >
                          {actionLoading === req._id + "reject" ? "..." : "Reject"}
                        </button>
                        <button
                          onClick={() => handleAction(req, "approve")}
                          disabled={actionLoading === req._id + "approve"}
                          className="flex-1 sm:flex-none px-6 py-2 rounded-xl text-sm font-bold text-white bg-green-500 hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                        >
                          {actionLoading === req._id + "approve" ? (
                            <RefreshCw size={16} className="animate-spin" />
                          ) : (
                            <>
                              <CheckCircle size={16} />
                              Approve
                            </>
                          )}
                        </button>
                      </>
                    ) : (
                      <div className={`px-4 py-2 rounded-xl text-sm font-bold border flex items-center gap-2 ${
                        req.status === 'approved' 
                          ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                          : 'bg-red-500/10 text-red-500 border-red-500/20'
                      }`}>
                        {req.status === 'approved' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                        {req.status === 'approved' ? 'Approved' : 'Rejected'}
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
