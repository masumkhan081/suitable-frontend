'use client';
import { Button } from '@/components/ui/button';
import { Circle } from 'lucide-react';
import { thead1 } from './data';
import { User } from '@/types/index';
import { useRouter, usePathname } from 'next/navigation';

interface UserTableProps {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (userId: string) => void;
}

const Positive = () => (
  <Circle className="bg-green-600 text-white w-4 h-4 rounded-full" />
);

const Negative = () => (
  <Circle className="bg-red-600 text-white w-4 h-4 rounded-full" />
);

export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Determine which tab we're currently on for the back navigation
  const getCurrentTab = () => {
    if (pathname.includes('/active')) return 'active';
    if (pathname.includes('/verified')) return 'verified';
    if (pathname.includes('/pending')) return 'pending';
    if (pathname.includes('/declined')) return 'declined';
    if (pathname.includes('/inactive')) return 'inactive';
    if (pathname.includes('/deactivated')) return 'deactivated';
    if (pathname.includes('/deleted')) return 'deleted';
    return 'all';
  };

  const handleUserClick = (userId: string) => {
    const currentTab = getCurrentTab();
    router.push(`/dashboard/users/${userId}?from=${currentTab}`);
  };

  return (
    <div className="overflow-x-auto w-full overflow-y-auto">
      <table className="table-auto relative bg-gray-100 dark:bg-gray-800 min-w-full overflow-y-auto">
        <thead className="sticky bg-white dark:bg-gray-800 z-10 top-0 left-0 right-0">
          <tr className="bg-white dark:bg-gray-800">
            {thead1.map((header, index) => (
              <th
                key={index}
                className="whitespace-nowrap px-4 py-3 text-left border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800">
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr 
                key={user.id || index} 
                className="h-auto border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                  <button
                    onClick={() => handleUserClick(user.id || '')}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline font-medium transition-colors"
                  >
                    {user['First Name']} {user['Last Name']}
                  </button>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                  {user.Age}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                  {user.Gender}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                  {user.Email}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 min-w-[165px]">
                  {user.Phone}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                  {user.Address}
                </td>
                <td className="px-4 py-3 min-w-auto whitespace-nowrap">
                  <div className="flex flex-col gap-2 items-start">
                    <span className="flex items-center gap-2">
                      <span>{user.Status.ageVerified ? <Positive /> : <Negative />}</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Age</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span>{user.Status.incomeVerified ? <Positive /> : <Negative />}</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Income</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span>{user.Status.identityVerified ? <Positive /> : <Negative />}</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Identity</span>
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                  {user.Revenue}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                  {user.Rent}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                  {user.Deposit}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {user.Total}
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex gap-2 items-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onEdit?.(user)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => onDelete?.(user.id || '')}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td 
                colSpan={thead1.length} 
                className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
              >
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
