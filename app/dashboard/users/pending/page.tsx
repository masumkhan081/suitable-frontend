'use client';

import { useRouter } from 'next/navigation';
import { UserTabs } from '@/components/dashboard/UserTabs';
import { UserPageHeader } from '@/components/dashboard/UserPageHeader';
import UserTable from '@/components/dashboard/UserTable';
import { useUsers } from '@/hooks/useUsers';

export default function PendingUsersPage() {
  const router = useRouter();
  const { getUsersByStatus, updateUser, deleteUser } = useUsers();
  const pendingUsers = getUsersByStatus('pending');

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
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
      <UserPageHeader />
      <UserTabs />
      <div className="mt-6">
        <UserTable 
          users={pendingUsers} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
