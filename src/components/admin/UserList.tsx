interface UserListProps {
  users: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status: string;
  }[];
  onApprove: (userId: string) => void;
  onSuspend: (userId: string) => void;
}

export default function UserList({ users, onApprove, onSuspend }: UserListProps) {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">First Name</th>
          <th className="py-2 px-4 border-b">Last Name</th>
          <th className="py-2 px-4 border-b">Email</th>
          <th className="py-2 px-4 border-b">Role</th>
          <th className="py-2 px-4 border-b">Status</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="py-2 px-4 border-b">{user.firstName}</td>
            <td className="py-2 px-4 border-b">{user.lastName}</td>
            <td className="py-2 px-4 border-b">{user.email}</td>
            <td className="py-2 px-4 border-b">{user.role}</td>
            <td className="py-2 px-4 border-b">{user.status}</td>
            <td className="py-2 px-4 border-b">
              <button onClick={() => onApprove(user.id)} className="text-green-500 mr-2">Approve</button>
              <button onClick={() => onSuspend(user.id)} className="text-red-500">Suspend</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
