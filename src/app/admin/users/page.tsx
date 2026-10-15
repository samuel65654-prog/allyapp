"use client";

import { useState } from "react";
import UserList from "@/components/admin/UserList";

// Mock data for demonstration purposes
const mockUsers = [
  {
    id: "1",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    role: "Elderly",
    status: "Active",
  },
  {
    id: "2",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@university.edu",
    role: "Companion",
    status: "Pending",
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers);

  const handleApprove = (userId: string) => {
    console.log(`User ${userId} approved!`);
    setUsers(users.map(user => user.id === userId ? { ...user, status: 'Active' } : user));
  };

  const handleSuspend = (userId: string) => {
    console.log(`User ${userId} suspended!`);
    setUsers(users.map(user => user.id === userId ? { ...user, status: 'Suspended' } : user));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <UserList users={users} onApprove={handleApprove} onSuspend={handleSuspend} />
    </div>
  );
}
