"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

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
      window.location.href = "/admin"; // Full refresh to let layout catch token
    } catch (err: any) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center px-4">
      {/* Glow bg */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
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
        <form onSubmit={handleLogin} className="p-8 space-y-5 rounded-2xl border" style={{ background: "var(--glass-bg)", borderColor: "var(--border)", backdropFilter: "blur(20px)" }}>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-muted)" }}>
              Username
            </label>
            <input
              id="admin-username"
              type="text"
              autoComplete="username"
              required
              className="w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-0"
              style={{
                background: "rgba(0, 0, 0, 0.2)",
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              required
              className="w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-0"
              style={{
                background: "rgba(0, 0, 0, 0.2)",
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {loginError && (
            <div className="p-3 rounded-lg text-sm bg-red-500/10 text-red-500 border border-red-500/20 text-center">
              {loginError}
            </div>
          )}

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-90 mt-2"
            style={{ background: "linear-gradient(135deg, #ff3366, #ff6b3b)" }}
          >
            {loginLoading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
