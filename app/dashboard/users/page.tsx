'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { UserTabs } from '@/components/dashboard/UserTabs';
import { UserPageHeader } from '@/components/dashboard/UserPageHeader';
import UserTable from '@/components/dashboard/UserTable';
import { useUsers } from '@/hooks/useUsers';
import { User } from '@/types/index';

export default function UsersPage() {
  const router = useRouter();
  const { users, updateUser, deleteUser } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (user: any) => {
    // Handle edit action
    console.log('Edit user:', user);
  };

  const handleDelete = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    
    const lowercaseSearch = searchTerm.toLowerCase();
    return users.filter((user: User) => 
      user['First Name']?.toLowerCase().includes(lowercaseSearch) ||
      user['Last Name']?.toLowerCase().includes(lowercaseSearch) ||
      user.Email?.toLowerCase().includes(lowercaseSearch) ||
      user.Phone?.toLowerCase().includes(lowercaseSearch) ||
      `${user['First Name']} ${user['Last Name']}`.toLowerCase().includes(lowercaseSearch)
    );
  }, [users, searchTerm]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
      <UserPageHeader onSearch={handleSearch} />
      <UserTabs />
      <div className="mt-6">
        <UserTable 
          users={filteredUsers} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
