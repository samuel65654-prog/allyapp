"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 mx-auto">
          <img src="/Diseño sin título-2.png" alt="ALLY" style={{width: 70, height: 70}} />
          <span className="text-2xl font-extrabold text-slate-800 tracking-tight">ALLY</span>
        </Link>

        <div className="flex items-center gap-5 text-sm font-medium text-gray-500">
          {user ? (
            <>
              <Link href="/matching" className="hover:text-blue-600 transition-colors">Matching</Link>
              <Link href="/chat" className="hover:text-blue-600 transition-colors">Chat</Link>
              <Link href="/profile" className="hover:text-blue-600 transition-colors">Profile</Link>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <span className="text-gray-400 text-xs">
                  Hi, <span className="text-gray-700 font-semibold">{user.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                >
                  Log out
                </button>
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
