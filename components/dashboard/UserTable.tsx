'use client';
import { Button } from '@/components/ui/button';
import { Circle } from 'lucide-react';
import { thead1 } from './data';
import { User } from '@/types/index';

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
  return (
    <div className="overflow-x-auto w-full overflow-y-auto">
      <table className="table-auto relative bg-gray-100 min-w-full overflow-y-auto">
        <thead className="sticky bg-white z-10 top-0 left-0 right-0">
          <tr className="bg-white">
            {thead1.map((header, index) => (
              <th
                key={index}
                className="whitespace-nowrap px-4 py-3 text-left border border-gray-300 text-sm font-medium text-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr 
                key={user.id || index} 
                className="h-auto border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                  {user['First Name']}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                  {user['Last Name']}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                  {user.Age}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                  {user.Gender}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                  {user.Email}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 min-w-[165px]">
                  {user.Phone}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {user.Address}
                </td>
                <td className="px-4 py-3 min-w-auto whitespace-nowrap">
                  <div className="flex flex-col gap-2 items-start">
                    <span className="flex items-center gap-2">
                      <span>{user.Status.ageVerified ? <Positive /> : <Negative />}</span>
                      <span className="text-sm font-medium text-gray-700">Age</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span>{user.Status.incomeVerified ? <Positive /> : <Negative />}</span>
                      <span className="text-sm font-medium text-gray-700">Income</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <span>{user.Status.identityVerified ? <Positive /> : <Negative />}</span>
                      <span className="text-sm font-medium text-gray-700">Identity</span>
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {user.Revenue}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {user.Rent}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {user.Deposit}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
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
                className="px-4 py-6 text-center text-gray-500"
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
