'use client';


import { UserTabs } from '@/components/dashboard/UserTabs';
import { UserPageHeader } from '@/components/dashboard/UserPageHeader';
import UserTable from '@/components/dashboard/UserTable';
import { useUsers } from '@/hooks/useUsers';

export default function ActiveUsersPage() {
  const { getUsersByStatus, deleteUser } = useUsers();
  const activeUsers = getUsersByStatus('active');

  const handleEdit = (user: { id: string; [key: string]: unknown }) => {
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
          users={activeUsers} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
