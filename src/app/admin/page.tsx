"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Role = "elderly" | "companion";
type Status = "pending" | "approved" | "suspended";

interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  status: Status;
  city: string;
  joinedAt: string;
}

const INITIAL_USERS: AdminUser[] = [
  { id: "1", firstName: "Jane",   lastName: "Doe",     email: "jane@email.com",        role: "elderly",    status: "approved",  city: "New York",  joinedAt: "2026-05-10" },
  { id: "2", firstName: "Robert", lastName: "Smith",   email: "robert@email.com",      role: "elderly",    status: "pending",   city: "Boston",    joinedAt: "2026-06-01" },
  { id: "3", firstName: "John",   lastName: "Miller",  email: "john@nyu.edu",          role: "companion",  status: "approved",  city: "New York",  joinedAt: "2026-04-22" },
  { id: "4", firstName: "Sara",   lastName: "Lee",     email: "sara@columbia.edu",     role: "companion",  status: "pending",   city: "New York",  joinedAt: "2026-06-03" },
  { id: "5", firstName: "Marcus", lastName: "Johnson", email: "marcus@yale.edu",       role: "companion",  status: "suspended", city: "Boston",    joinedAt: "2026-03-15" },
  { id: "6", firstName: "Alice",  lastName: "Wong",    email: "alice@email.com",       role: "elderly",    status: "approved",  city: "Chicago",   joinedAt: "2026-05-28" },
  { id: "7", firstName: "Emma",   lastName: "Turner",  email: "emma@harvard.edu",      role: "companion",  status: "pending",   city: "Boston",    joinedAt: "2026-06-10" },
];

const STATUS_STYLES: Record<Status, string> = {
  approved:  "bg-green-900/40 text-green-400 border-green-700/50",
  pending:   "bg-yellow-900/40 text-yellow-400 border-yellow-700/50",
  suspended: "bg-red-900/40 text-red-400 border-red-700/50",
};

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className={`rounded-xl p-4 border ${color}`}>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-slate-400 mt-1">{label}</p>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && !sessionStorage.getItem("ally_admin")) {
      router.replace("/admin/login");
    }
  }, [router]);

  const [users, setUsers] = useState<AdminUser[]>(INITIAL_USERS);
  const [roleFilter, setRoleFilter] = useState<"all" | Role>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");
  const [search, setSearch] = useState("");

  const update = (id: string, status: Status) =>
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));

  const filtered = users.filter((u) => {
    if (roleFilter !== "all" && u.role !== roleFilter) return false;
    if (statusFilter !== "all" && u.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!`${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const counts = {
    total: users.length,
    pending: users.filter((u) => u.status === "pending").length,
    approved: users.filter((u) => u.status === "approved").length,
    companions: users.filter((u) => u.role === "companion").length,
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Manage users, approvals, and platform activity</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={counts.total} color="border-slate-700 bg-slate-800" />
        <StatCard label="Pending Review" value={counts.pending} color="border-yellow-700/50 bg-yellow-900/20" />
        <StatCard label="Approved" value={counts.approved} color="border-green-700/50 bg-green-900/20" />
        <StatCard label="Companions" value={counts.companions} color="border-blue-700/50 bg-blue-900/20" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow min-w-48"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as "all" | Role)}
          className="bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Roles</option>
          <option value="elderly">Elderly</option>
          <option value="companion">Companion</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "all" | Status)}
          className="bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="suspended">Suspended</option>
        </select>
        <span className="text-sm text-slate-500">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-800/60 shadow-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-800 text-left text-slate-400 uppercase text-xs tracking-wide border-b border-slate-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">City</th>
              <th className="py-3 px-4">Joined</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/60">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500">No users match your filters.</td>
              </tr>
            ) : (
              filtered.map((user) => (
                <tr key={user.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="py-3 px-4 text-slate-400">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      user.role === "companion"
                        ? "bg-blue-900/50 text-blue-300 border border-blue-700/50"
                        : "bg-purple-900/50 text-purple-300 border border-purple-700/50"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{user.city}</td>
                  <td className="py-3 px-4 text-slate-500">{user.joinedAt}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${STATUS_STYLES[user.status]}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      {user.status !== "approved" && (
                        <button
                          onClick={() => update(user.id, "approved")}
                          className="text-xs px-2 py-1 rounded-md bg-green-900/40 text-green-400 border border-green-700/50 hover:bg-green-800/50 transition-colors"
                        >
                          Approve
                        </button>
                      )}
                      {user.status !== "suspended" && (
                        <button
                          onClick={() => update(user.id, "suspended")}
                          className="text-xs px-2 py-1 rounded-md bg-red-900/40 text-red-400 border border-red-700/50 hover:bg-red-800/50 transition-colors"
                        >
                          Suspend
                        </button>
                      )}
                      {user.status !== "pending" && (
                        <button
                          onClick={() => update(user.id, "pending")}
                          className="text-xs px-2 py-1 rounded-md bg-yellow-900/40 text-yellow-400 border border-yellow-700/50 hover:bg-yellow-800/50 transition-colors"
                        >
                          Reset
                        </button>
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
  );
}
