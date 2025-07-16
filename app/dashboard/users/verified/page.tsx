'use client';

import { useRouter } from 'next/navigation';
import { UserTabs } from '@/components/dashboard/UserTabs';
import UserTable from '@/components/dashboard/UserTable';
import { useUsers } from '@/hooks/useUsers';

export default function VerifiedUsersPage() {
  const router = useRouter();
  const { getUsersByStatus, updateUser, deleteUser } = useUsers();
  const verifiedUsers = getUsersByStatus('verified');

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
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Verified Users</h2>
      <UserTabs />
      <div className="mt-6">
        <UserTable 
          users={verifiedUsers} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
