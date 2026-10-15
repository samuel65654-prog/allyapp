"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import type { AppUser } from "@/types";

export default function LoginPage() {
  const { login, setProfile } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) return;

    try {
      // Check credentials
      const storedCreds = localStorage.getItem("ally_credentials");
      const creds = storedCreds ? JSON.parse(storedCreds) : null;

      if (!creds || creds.email.toLowerCase() !== email.trim().toLowerCase()) {
        setError("No account found with this email. Please sign up first.");
        return;
      }
      if (creds.password !== password) {
        setError("Incorrect password. Please try again.");
        return;
      }

      // Credentials match — restore profile session
      const storedProfile = localStorage.getItem("ally_profile");
      if (storedProfile) {
        const profile: AppUser = JSON.parse(storedProfile);
        login(profile.firstName, profile.role);
        setProfile(profile);
        router.push("/matching");
      } else {
        setError("Account not found. Please sign up again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-57px)] bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">Welcome back</h1>
        <p className="text-center text-sm text-gray-500 mb-6">Log in to your ALLY account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Registration email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            required
            autoFocus
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            required
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {error && (
            <p className="text-xs text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
          >
            Log in
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-5">
          Don't have an account?{" "}
          <Link href="/" className="text-blue-600 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
