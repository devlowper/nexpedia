"use client";

import { useEffect, useState } from "react";
import { Users, Search, MoreHorizontal, X } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface User {
  _id: string;
  name: string;
  email: string;
  username: string;
  role: string;
  credits: number;
  createdAt: string;
  isSuspended: boolean;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({ name: "", username: "", role: "user" });
  const [editLoading, setEditLoading] = useState(false);

  const fetchUsers = async () => {
    const token = sessionStorage.getItem("admin_token");
    if (!token) return;

    try {
      setLoading(true);
      const res = await fetch(`${API}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      } else {
        setError(data.error || "Failed to fetch users");
      }
    } catch (err) {
      setError("Network error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSuspend = async (id: string) => {
    const token = sessionStorage.getItem("admin_token");
    if (!token) return;
    try {
      const res = await fetch(`${API}/api/admin/users/${id}/suspend`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    const token = sessionStorage.getItem("admin_token");
    if (!token) return;
    
    setEditLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/users/${editingUser._id}/edit`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(editForm)
      });
      const data = await res.json();
      if (data.success) {
        setEditingUser(null);
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEditLoading(false);
    }
  };

  const openEditModal = (user: User) => {
    setEditForm({ name: user.name, username: user.username || "", role: user.role });
    setEditingUser(user);
    setActiveDropdown(null);
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.username && u.username.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-bricolage mb-2">Users</h1>
          <p className="text-[var(--text-muted)]">Manage all registered users on Nexpedia.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-accent/50"
            style={{
              background: "var(--glass-bg)",
              borderColor: "var(--border)",
              color: "var(--text-primary)",
            }}
          />
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center animate-pulse text-[var(--text-muted)]">Loading users...</div>
      ) : error ? (
        <div className="py-20 text-center text-red-500">{error}</div>
      ) : (
        <div className="rounded-2xl border" style={{ background: "var(--glass-bg)", borderColor: "var(--border)" }}>
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-black/5 dark:bg-white/5 border-b border-[var(--border)] text-[var(--text-muted)] font-medium">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Username</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] relative">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-[var(--text-muted)]">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className={`hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors ${user.isSuspended ? 'opacity-50' : ''}`}>
                      <td className="px-6 py-4 font-medium flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xs">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        {user.name}
                      </td>
                      <td className="px-6 py-4 text-[var(--text-muted)]">{user.username || "—"}</td>
                      <td className="px-6 py-4 text-[var(--text-muted)]">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          user.role === 'admin' ? 'bg-purple-500/10 text-purple-500' : 'bg-blue-500/10 text-blue-500'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {user.isSuspended ? (
                          <span className="px-2 py-1 rounded text-xs font-bold bg-red-500/10 text-red-500">Suspended</span>
                        ) : (
                          <span className="px-2 py-1 rounded text-xs font-bold bg-green-500/10 text-green-500">Active</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-[var(--text-muted)]">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right">
                        <div className={`dropdown-container relative inline-block text-left ${activeDropdown === user._id ? 'z-50' : 'z-0'}`}>
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveDropdown(activeDropdown === user._id ? null : user._id);
                            }}
                            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-muted)] transition-colors"
                          >
                            <MoreHorizontal size={18} />
                          </button>
                          
                          {activeDropdown === user._id && (
                            <div 
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="absolute right-0 top-full mt-1 w-40 rounded-xl border shadow-xl overflow-hidden z-[100]" 
                              style={{ background: "var(--bg-base)", borderColor: "var(--border)" }}
                            >
                              <div className="p-1 flex flex-col gap-1">
                                <button 
                                  onClick={() => {
                                    setActiveDropdown(null);
                                    window.open(`/profile/${user.username || user._id}`, '_blank');
                                  }}
                                  className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                                >
                                  View Profile
                                </button>
                                <button 
                                  onClick={() => openEditModal(user)}
                                  className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                                >
                                  Edit User
                                </button>
                                <button 
                                  onClick={() => {
                                    setActiveDropdown(null);
                                    handleSuspend(user._id);
                                  }}
                                  className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                                    user.isSuspended 
                                      ? 'text-green-500 hover:bg-green-500/10' 
                                      : 'text-red-500 hover:bg-red-500/10'
                                  }`}
                                >
                                  {user.isSuspended ? 'Unsuspend User' : 'Suspend User'}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border p-6" style={{ background: "var(--bg-base)", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Edit User</h2>
              <button onClick={() => setEditingUser(null)} className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input 
                  type="text" 
                  value={editForm.name}
                  onChange={e => setEditForm({...editForm, name: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-accent/50"
                  style={{ background: "var(--glass-bg)", borderColor: "var(--border)", color: "var(--text-primary)" }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <input 
                  type="text" 
                  value={editForm.username}
                  onChange={e => setEditForm({...editForm, username: e.target.value})}
                  className="w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-accent/50"
                  style={{ background: "var(--glass-bg)", borderColor: "var(--border)", color: "var(--text-primary)" }}
                  required
                />
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setEditingUser(null)}
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
