"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ADMIN_PASSWORD = "ally-admin-2026"; // mock password

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("ally_admin", "true");
      router.push("/admin");
    } else {
      setError("Incorrect password. Try: ally-admin-2026");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <Image src="/logo-icon.svg" alt="ALLY" width={64} height={56} className="mb-3" />
          <h1 className="text-white text-xl font-bold tracking-wide">Admin Portal</h1>
          <p className="text-slate-400 text-sm mt-1">Restricted access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-slate-300 text-sm block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="Enter admin password"
              required
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-900/30 border border-red-800 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Sign in
          </button>
        </form>

        <p className="text-slate-600 text-xs text-center mt-6">
          This portal is for ALLY administrators only.
        </p>
      </div>
    </div>
  );
}
