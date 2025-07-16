'use client';

import { useRouter } from 'next/navigation';
import { UserTabs } from '@/components/dashboard/UserTabs';
import UserTable from '@/components/dashboard/UserTable';
import { useUsers } from '@/hooks/useUsers';

export default function UsersPage() {
  const router = useRouter();
  const { users, updateUser, deleteUser } = useUsers();

  const handleEdit = (user: any) => {
    // Handle edit action
    console.log('Edit user:', user);
  };

  const handleDelete = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">User Management</h2>
      <UserTabs />
      <div className="mt-6">
        <UserTable 
          users={users} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
