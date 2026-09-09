"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Shield, LogOut, Users, CheckCircle, XCircle, Clock,
  RefreshCw, ChevronRight, User, AlertTriangle, BarChart3,
  Activity, Inbox
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

export default function AdminPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [view, setView] = useState<"login" | "dashboard">("login");

  // Login state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard state
  const [queue, setQueue] = useState<ApprovalRequest[]>([]);
  const [stats, setStats] = useState<Stats>({ pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [activeTab, setActiveTab] = useState<"pending" | "all">("pending");

  // Check for stored token on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("admin_token");
    if (stored) {
      setToken(stored);
      setView("dashboard");
    }
  }, []);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Invalid credentials.");
      }
      sessionStorage.setItem("admin_token", data.data.token);
      setToken(data.data.token);
      setView("dashboard");
    } catch (err: any) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setToken(null);
    setQueue([]);
    setView("login");
    setUsername("");
    setPassword("");
  };

  const fetchQueue = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/approval-queue`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { handleLogout(); return; }
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
  }, [token]);

  useEffect(() => {
    if (view === "dashboard") fetchQueue();
  }, [view, fetchQueue]);

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

  // ═══════════════════════════════════════════════════════════════════════════
  // LOGIN VIEW
  // ═══════════════════════════════════════════════════════════════════════════
  if (view === "login") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--bg-base)" }}>
        {/* Glow bg */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #ff3366 0%, transparent 70%)" }} />
        </div>

        <div className="w-full max-w-[420px] relative">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5 border"
              style={{ background: "rgba(255, 51, 102, 0.08)", borderColor: "rgba(255, 51, 102, 0.2)" }}>
              <Shield size={28} style={{ color: "#ff3366" }} />
            </div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Admin Panel</h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Sign in to manage Nexpedia</p>
          </div>

          {/* Card */}
          <form onSubmit={handleLogin} className="glass-card p-8 space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-muted)" }}>
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,51,102,0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-muted)" }}>
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,51,102,0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>

            {loginError && (
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}>
                <AlertTriangle size={15} className="shrink-0" />
                {loginError}
              </div>
            )}

            <button
              id="admin-login-btn"
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
              style={{
                background: loginLoading ? "rgba(255,51,102,0.4)" : "#ff3366",
                color: "#fff",
                opacity: loginLoading ? 0.7 : 1,
              }}
            >
              {loginLoading ? (
                <><RefreshCw size={16} className="animate-spin" /> Signing in...</>
              ) : (
                <>Sign In <ChevronRight size={16} /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs mt-6" style={{ color: "var(--text-faint)" }}>
            Protected area — admin credentials only
          </p>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // DASHBOARD VIEW
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-medium shadow-2xl transition-all animate-in slide-in-from-top-2 duration-300"
          style={{
            background: toast.type === "success" ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
            border: `1px solid ${toast.type === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
            color: toast.type === "success" ? "#4ade80" : "#f87171",
            backdropFilter: "blur(20px)",
          }}>
          {toast.msg}
        </div>
      )}

      {/* Top Bar */}
      <header className="sticky top-[60px] z-40 border-b"
        style={{ background: "rgba(9,10,10,0.85)", backdropFilter: "blur(20px)", borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield size={18} style={{ color: "#ff3366" }} />
            <span className="font-bold text-sm">Nexpedia Admin</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ background: "rgba(255,51,102,0.1)", color: "#ff3366", border: "1px solid rgba(255,51,102,0.2)" }}>
              Dashboard
            </span>
          </div>
          <button
            id="admin-logout-btn"
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl transition-all"
            style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(239,68,68,0.3)";
              (e.currentTarget as HTMLElement).style.color = "#f87171";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
            }}
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Overview</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Manage profile update requests and monitor activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Pending Review", value: stats.pending, icon: Clock, color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)" },
            { label: "Approved", value: stats.approved, icon: CheckCircle, color: "#4ade80", bg: "rgba(74,222,128,0.08)", border: "rgba(74,222,128,0.2)" },
            { label: "Rejected", value: stats.rejected, icon: XCircle, color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.2)" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-6 flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: stat.bg, border: `1px solid ${stat.border}` }}>
                <stat.icon size={22} style={{ color: stat.color }} />
              </div>
              <div>
                <div className="text-3xl font-black" style={{ color: "var(--text-primary)" }}>
                  {loading ? "—" : stat.value}
                </div>
                <div className="text-xs font-medium mt-0.5" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Approval Queue */}
        <div className="glass-card overflow-hidden">
          {/* Card Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center gap-3">
              <Inbox size={18} style={{ color: "var(--text-muted)" }} />
              <h2 className="font-bold">Approval Queue</h2>
              {stats.pending > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                  style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.25)" }}>
                  {stats.pending} pending
                </span>
              )}
            </div>
            <button
              id="admin-refresh-btn"
              onClick={fetchQueue}
              disabled={loading}
              className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg transition-all"
              style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}
            >
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b" style={{ borderColor: "var(--border)" }}>
            {(["pending", "all"] as const).map((tab) => (
              <button
                key={tab}
                id={`admin-tab-${tab}`}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-3.5 text-sm font-medium capitalize transition-all border-b-2"
                style={{
                  borderBottomColor: activeTab === tab ? "#ff3366" : "transparent",
                  color: activeTab === tab ? "#ff3366" : "var(--text-muted)",
                }}
              >
                {tab === "pending" ? "Pending" : "All Requests"}
              </button>
            ))}
          </div>

          {/* Queue List */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <RefreshCw size={28} className="animate-spin" style={{ color: "var(--text-faint)" }} />
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>Loading requests...</p>
            </div>
          ) : filteredQueue.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
                <Activity size={24} style={{ color: "var(--text-faint)" }} />
              </div>
              <div className="text-center">
                <p className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                  {activeTab === "pending" ? "No pending requests" : "No requests yet"}
                </p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {activeTab === "pending" ? "All caught up! Check back later." : "Profile update requests will appear here."}
                </p>
              </div>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: "var(--border)" }}>
              {filteredQueue.map((req) => (
                <div key={req._id} id={`request-${req._id}`}
                  className="px-6 py-5 flex items-center gap-4 transition-all"
                  style={{ background: "transparent" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>

                  {/* Avatar */}
                  <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                    {req.requestedName?.[0]?.toUpperCase() || <User size={18} />}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm truncate" style={{ color: "var(--text-primary)" }}>
                        {req.requestedName || "—"}
                      </span>
                      <StatusBadge status={req.status} />
                    </div>
                    <div className="text-xs mt-1 flex items-center gap-3" style={{ color: "var(--text-faint)" }}>
                      <span>User ID: {req.userId.slice(-8)}</span>
                      <span>·</span>
                      <span>{timeAgo(req.createdAt)}</span>
                    </div>
                    {req.requestedAvatar && (
                      <div className="text-xs mt-1 truncate max-w-[300px]" style={{ color: "var(--text-faint)" }}>
                        Avatar: {req.requestedAvatar}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  {req.status === "pending" && (
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        id={`approve-${req._id}`}
                        onClick={() => handleAction(req, "approve")}
                        disabled={!!actionLoading}
                        className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl transition-all"
                        style={{
                          background: "rgba(74,222,128,0.1)",
                          border: "1px solid rgba(74,222,128,0.25)",
                          color: "#4ade80",
                          opacity: actionLoading === req._id + "approve" ? 0.5 : 1,
                        }}
                      >
                        {actionLoading === req._id + "approve"
                          ? <RefreshCw size={12} className="animate-spin" />
                          : <CheckCircle size={13} />}
                        Approve
                      </button>
                      <button
                        id={`reject-${req._id}`}
                        onClick={() => handleAction(req, "reject")}
                        disabled={!!actionLoading}
                        className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl transition-all"
                        style={{
                          background: "rgba(248,113,113,0.1)",
                          border: "1px solid rgba(248,113,113,0.25)",
                          color: "#f87171",
                          opacity: actionLoading === req._id + "reject" ? 0.5 : 1,
                        }}
                      >
                        {actionLoading === req._id + "reject"
                          ? <RefreshCw size={12} className="animate-spin" />
                          : <XCircle size={13} />}
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string; border: string; label: string }> = {
    pending: { bg: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "rgba(245,158,11,0.25)", label: "Pending" },
    approved: { bg: "rgba(74,222,128,0.1)", color: "#4ade80", border: "rgba(74,222,128,0.25)", label: "Approved" },
    rejected: { bg: "rgba(248,113,113,0.1)", color: "#f87171", border: "rgba(248,113,113,0.25)", label: "Rejected" },
  };
  const s = map[status] ?? map.pending;
  return (
    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
      {s.label}
    </span>
  );
}
