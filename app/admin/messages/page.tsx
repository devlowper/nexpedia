"use client";

import React, { useState, useEffect } from "react";
import { Mail, Clock, CheckCircle2, MessageSquare, Trash2, Reply, Search, Filter, RefreshCw, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { getApiBaseUrl } from "@/lib/apiClient";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "Pending" | "Reviewed" | "Replied";
  createdAt: string;
}

export default function AdminMessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("admin_token");
      if (!token) {
        router.push("/admin/login");
        return;
      }

      const API = getApiBaseUrl();
      const res = await fetch(`${API}/api/admin/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data && data.success) {
        setMessages(data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch contact messages", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleStatusChange = async (id: string, newStatus: "Pending" | "Reviewed" | "Replied") => {
    try {
      setActionLoading(id);
      const token = sessionStorage.getItem("admin_token");
      const API = getApiBaseUrl();
      const res = await fetch(`${API}/api/admin/contacts/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages(prev => prev.map(m => m._id === id ? { ...m, status: newStatus } : m));
      }
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      setActionLoading(id);
      const token = sessionStorage.getItem("admin_token");
      const API = getApiBaseUrl();
      const res = await fetch(`${API}/api/admin/contacts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setMessages(prev => prev.filter(m => m._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete message", err);
    } finally {
      setActionLoading(null);
    }
  };

  const filteredMessages = messages.filter(m => {
    const matchesSearch = 
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "All" || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = messages.filter(m => m.status === "Pending").length;

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Mail className="text-accent" size={24} /> Contact Messages
          </h1>
          <p className="text-muted text-sm mt-1">
            Review inquiries submitted through the Contact Us page on procraft.site
          </p>
        </div>
        <button
          onClick={fetchMessages}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-black/5 dark:bg-white/5 hover:border-accent/40 text-sm font-medium transition-colors self-start sm:self-auto"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-border bg-black/5 dark:bg-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted font-medium uppercase tracking-wider">Total Inquiries</p>
            <p className="text-2xl font-bold text-primary mt-1">{messages.length}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
            <MessageSquare size={20} />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-black/5 dark:bg-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted font-medium uppercase tracking-wider">Pending Attention</p>
            <p className="text-2xl font-bold text-amber-500 mt-1">{pendingCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <Clock size={20} />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-black/5 dark:bg-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted font-medium uppercase tracking-wider">Replied</p>
            <p className="text-2xl font-bold text-emerald-500 mt-1">
              {messages.filter(m => m.status === "Replied").length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
            <CheckCircle2 size={20} />
          </div>
        </div>
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-base border border-border rounded-lg text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Filter size={15} className="text-muted shrink-0" />
          {["All", "Pending", "Reviewed", "Replied"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === status
                  ? "bg-accent text-black"
                  : "bg-black/5 dark:bg-white/5 text-muted hover:text-primary border border-border"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Messages list */}
      {loading ? (
        <div className="p-12 text-center text-muted flex flex-col items-center justify-center gap-3">
          <RefreshCw size={24} className="animate-spin text-accent" />
          <span>Loading messages...</span>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-border rounded-2xl bg-black/5 dark:bg-white/5">
          <AlertCircle size={32} className="mx-auto text-muted mb-2 opacity-50" />
          <h3 className="font-semibold text-primary">No messages found</h3>
          <p className="text-muted text-xs mt-1">
            {search || statusFilter !== "All"
              ? "Try adjusting your search query or status filter."
              : "When users send messages from the Contact Us page, they will appear here."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg) => {
            const dateStr = new Date(msg.createdAt).toLocaleString();
            const isReplying = actionLoading === msg._id;

            return (
              <div
                key={msg._id}
                className="p-5 rounded-2xl border border-border bg-surface hover:border-accent/30 transition-all space-y-4 shadow-xs"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary text-base">{msg.name}</span>
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                        className="text-xs text-accent hover:underline flex items-center gap-1 font-mono"
                      >
                        &lt;{msg.email}&gt;
                      </a>
                    </div>
                    <p className="text-xs text-muted mt-0.5">{dateStr}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                        msg.status === "Pending"
                          ? "bg-amber-500/10 text-amber-500 border-amber-500/25"
                          : msg.status === "Reviewed"
                          ? "bg-blue-500/10 text-blue-500 border-blue-500/25"
                          : "bg-emerald-500/10 text-emerald-500 border-emerald-500/25"
                      }`}
                    >
                      {msg.status}
                    </span>

                    <select
                      value={msg.status}
                      disabled={isReplying}
                      onChange={(e) => handleStatusChange(msg._id, e.target.value as any)}
                      className="text-xs bg-base border border-border rounded-lg px-2 py-1 text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                    >
                      <option value="Pending">Mark Pending</option>
                      <option value="Reviewed">Mark Reviewed</option>
                      <option value="Replied">Mark Replied</option>
                    </select>

                    <button
                      onClick={() => handleDelete(msg._id)}
                      disabled={isReplying}
                      className="p-1.5 text-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete inquiry"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Subject & Message body */}
                <div>
                  <h4 className="font-semibold text-primary text-sm mb-1">
                    Subject: <span className="font-normal text-muted">{msg.subject}</span>
                  </h4>
                  <div className="p-4 rounded-xl bg-base border border-border/70 text-sm text-primary/90 whitespace-pre-wrap leading-relaxed font-sans">
                    {msg.message}
                  </div>
                </div>

                {/* Reply button */}
                <div className="flex justify-end pt-1">
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                    onClick={() => {
                      if (msg.status === "Pending") {
                        handleStatusChange(msg._id, "Replied");
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-black font-semibold text-xs hover:bg-accent-hover transition-colors shadow-xs"
                  >
                    <Reply size={14} /> Reply to {msg.name}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

