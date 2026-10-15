"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("ally_admin");
    router.push("/admin/login");
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo-icon.svg" alt="ALLY" width={32} height={28} />
          <div>
            <span className="text-white font-bold text-sm tracking-wide">ALLY</span>
            <span className="ml-2 text-xs text-slate-400 bg-slate-700 px-2 py-0.5 rounded-full">Admin</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-slate-300">
          <Link href="/admin" className="hover:text-white transition-colors">Dashboard</Link>
          <Link href="/admin/users" className="hover:text-white transition-colors">Users</Link>
        </div>

        <button
          onClick={handleLogout}
          className="text-xs px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
        >
          Sign out
        </button>
      </div>
    </nav>
  );
}
