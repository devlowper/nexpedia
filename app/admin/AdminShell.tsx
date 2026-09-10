"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Shield, LayoutDashboard, Users, CheckSquare, FileText, LogOut, Menu, X } from "lucide-react";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (pathname === "/admin/login") {
      setLoading(false);
      return;
    }
    
    if (!token) {
      router.push("/admin/login");
    } else {
      setIsAuth(true);
    }
    setLoading(false);
  }, [pathname, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-base)" }}>Loading...</div>;
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!isAuth) return null;

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Profile Approvals", href: "/admin/approvals", icon: CheckSquare },
    { label: "Prompt Submissions", href: "/admin/submissions", icon: FileText },
    { label: "Users", href: "/admin/users", icon: Users },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r" style={{ borderColor: "var(--border)", background: "var(--glass-bg)", backdropFilter: "blur(12px)" }}>
        <div className="p-6 flex items-center gap-3 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: "rgba(255, 51, 102, 0.1)" }}>
            <Shield size={20} style={{ color: "#ff3366" }} />
          </div>
          <span className="font-bold text-lg font-bricolage">Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  active ? "text-white" : "hover:bg-black/5 dark:hover:bg-white/5"
                }`}
                style={{
                  background: active ? "#ff3366" : "transparent",
                  color: active ? "#ffffff" : "var(--text-muted)"
                }}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t" style={{ borderColor: "var(--border)" }}>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b" style={{ borderColor: "var(--border)", background: "var(--glass-bg)" }}>
          <div className="flex items-center gap-2">
            <Shield size={20} style={{ color: "#ff3366" }} />
            <span className="font-bold">Admin</span>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[60px] left-0 right-0 bottom-0 z-50 p-4" style={{ background: "var(--bg-base)" }}>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium`}
                    style={{
                      background: active ? "#ff3366" : "transparent",
                      color: active ? "#ffffff" : "var(--text-muted)"
                    }}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors">
                <LogOut size={18} />
                Logout
              </button>
            </nav>
          </div>
        )}

        <main className="flex-1 p-6 lg:p-10 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
