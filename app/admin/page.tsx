"use client";

import { useEffect, useState } from "react";
import { Users, FileText, CheckSquare, Activity, BarChart3, TrendingUp, UserPlus, Send } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface DashboardStats {
  totalUsers: number;
  totalPrompts: number;
  pendingSubmissions: number;
  pendingApprovals: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStatsAndActivity = async () => {
      const token = sessionStorage.getItem("admin_token");
      if (!token) return;

      try {
        const [statsRes, activityRes] = await Promise.all([
          fetch(`${API}/api/admin/dashboard-stats`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API}/api/admin/activity`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        const statsData = await statsRes.json();
        const activityData = await activityRes.json();

        if (statsData.success) {
          setStats(statsData.data);
        } else {
          setError(statsData.error || "Failed to load stats");
        }

        if (activityData.success) {
          const combined = [
            ...activityData.data.users.map((u: any) => ({ ...u, type: 'user' })),
            ...activityData.data.prompts.map((p: any) => ({ ...p, type: 'prompt' }))
          ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
          
          setActivity(combined);
        }
      } catch (err) {
        setError("Network error loading dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchStatsAndActivity();
  }, []);

  if (loading) return <div className="animate-pulse flex space-x-4 p-8">Loading dashboard...</div>;
  if (error) return <div className="text-red-500 p-8">{error}</div>;
  if (!stats) return null;

  const cards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Total Prompts", value: stats.totalPrompts, icon: FileText, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Pending Submissions", value: stats.pendingSubmissions, icon: Activity, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Profile Approvals", value: stats.pendingApprovals, icon: CheckSquare, color: "text-pink-500", bg: "bg-pink-500/10" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-bricolage mb-2">Overview</h1>
        <p className="text-[var(--text-muted)]">Welcome to the Nexpedia Admin Dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="p-6 rounded-2xl border" style={{ background: "var(--glass-bg)", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bg}`}>
                <card.icon className={card.color} size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <p className="text-[var(--text-muted)] text-sm font-medium mb-1">{card.label}</p>
            <h3 className="text-3xl font-bold">{card.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border flex flex-col" style={{ background: "var(--glass-bg)", borderColor: "var(--border)" }}>
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="text-accent" />
            <h2 className="text-xl font-bold font-bricolage">Recent Activity</h2>
          </div>
          <div className="flex-1 space-y-4">
            {activity.length === 0 ? (
              <div className="text-[var(--text-muted)] text-sm flex items-center justify-center h-40">
                No recent activity.
              </div>
            ) : (
              activity.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-xl bg-black/5 dark:bg-white/5">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.type === 'user' ? 'bg-blue-500/20 text-blue-500' : 'bg-purple-500/20 text-purple-500'}`}>
                    {item.type === 'user' ? <UserPlus size={18} /> : <Send size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      {item.type === 'user' ? (
                        <>New user registered: <strong>{item.name}</strong></>
                      ) : (
                        <>New prompt submitted: <strong>{item.title}</strong> by {item.author?.name || 'Unknown'}</>
                      )}
                    </p>
                    <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="p-6 rounded-2xl border" style={{ background: "var(--glass-bg)", borderColor: "var(--border)" }}>
          <div className="flex items-center gap-3 mb-6">
            <Activity className="text-accent" />
            <h2 className="text-xl font-bold font-bricolage">System Status</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-muted)] text-sm">API Gateway</span>
              <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs font-bold">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-muted)] text-sm">Database</span>
              <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs font-bold">Operational</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--text-muted)] text-sm">Authentication</span>
              <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs font-bold">Operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
