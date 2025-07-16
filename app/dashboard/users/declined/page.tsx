'use client';

import { useRouter } from 'next/navigation';
import { UserTabs } from '@/components/dashboard/UserTabs';
import UserTable from '@/components/dashboard/UserTable';
import { useUsers } from '@/hooks/useUsers';

export default function DeclinedUsersPage() {
  const router = useRouter();
  const { getUsersByStatus, updateUser, deleteUser } = useUsers();
  const declinedUsers = getUsersByStatus('declined');

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
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Declined Users</h2>
      <UserTabs />
      <div className="mt-6">
        <UserTable 
          users={declinedUsers} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
