import type { Metadata } from "next";
import AdminShell from "./AdminShell";

export const metadata: Metadata = {
  title: "Admin — proCraft",
  description: "proCraft admin panel",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
