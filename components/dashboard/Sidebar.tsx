'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiUsers, FiSettings, FiPieChart, FiFileText } from 'react-icons/fi';

type SubMenuItem = {
  title: string;
  path: string;
};

type MenuItem = {
  title: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: SubMenuItem[];
};

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: <FiPieChart className="w-5 h-5" />,
    path: '/dashboard',
  },
  {
    title: 'Users',
    icon: <FiUsers className="w-5 h-5" />,
    subItems: [
      { title: 'Active', path: '/dashboard/users/active' },
      { title: 'Verified', path: '/dashboard/users/verified' },
      { title: 'Declined', path: '/dashboard/users/declined' },
    ],
  },
  {
    title: 'Documents',
    icon: <FiFileText className="w-5 h-5" />,
    subItems: [
      { title: 'Pending', path: '/dashboard/documents/pending' },
      { title: 'Approved', path: '/dashboard/documents/approved' },
    ],
  },
  {
    title: 'Settings',
    icon: <FiSettings className="w-5 h-5" />,
    path: '/dashboard/settings',
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (title: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isActive = (path: string) => pathname === path;
  const isParentActive = (subItems?: SubMenuItem[]) => {
    if (!subItems) return false;
    return subItems.some(item => pathname === item.path);
  };

  return (
    <div className="w-64 bg-white shadow-md h-screen fixed left-0 top-0 p-4 overflow-y-auto">
      <div className="text-xl font-bold mb-8 p-2">Dashboard</div>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <div key={item.title} className="mb-1">
            {item.path ? (
              <Link
                href={item.path}
                className={`flex items-center p-3 rounded-lg ${
                  isActive(item.path || '')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            ) : (
              <>
                <button
                  onClick={() => toggleItem(item.title)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg ${
                    isParentActive(item.subItems)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      expandedItems[item.title] ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {expandedItems[item.title] && item.subItems && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.path}
                        href={subItem.path}
                        className={`block p-2 text-sm rounded ${
                          isActive(subItem.path)
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
