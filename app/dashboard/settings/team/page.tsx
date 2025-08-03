'use client';

import { SettingsTabs } from '@/components/dashboard/SettingsTabs';

export default function TeamManagementPage() {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <div className="flex items-center gap-3 mb-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      </div>

      <SettingsTabs />
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mt-6 transition-colors duration-200">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Team Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your team members, roles, and permissions.</p>
        </div>

        <div className="space-y-6">
          {/* Team Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-blue-900 dark:text-blue-300 mb-2">Total Members</h3>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">12</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-green-900 dark:text-green-300 mb-2">Active Members</h3>
              <p className="text-2xl font-bold text-green-700 dark:text-green-400">10</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-orange-900 dark:text-orange-300 mb-2">Pending Invites</h3>
              <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">2</p>
            </div>
          </div>

          {/* Add New Member */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Add New Team Member</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200">
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200">
                  Send Invite
                </button>
              </div>
            </div>
          </div>

          {/* Team Members List */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Team Members</h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Sample team members */}
              {[
                { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
                { name: 'Jane Smith', email: 'jane@example.com', role: 'Moderator', status: 'Active' },
                { name: 'Mike Johnson', email: 'mike@example.com', role: 'Viewer', status: 'Pending' },
              ].map((member, index) => (
                <div key={index} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">{member.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{member.role}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      member.status === 'Active' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                    }`}>
                      {member.status}
                    </span>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm transition-colors duration-200">Edit</button>
                      <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm transition-colors duration-200">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Permissions Settings */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Role Permissions</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="font-medium text-gray-700 dark:text-gray-300">Permission</div>
                <div className="font-medium text-gray-700 dark:text-gray-300 text-center">Admin</div>
                <div className="font-medium text-gray-700 dark:text-gray-300 text-center">Moderator</div>
                <div className="font-medium text-gray-700 dark:text-gray-300 text-center">Viewer</div>
              </div>
              {[
                'Manage Users',
                'View Analytics',
                'Manage Settings',
                'Send Messages',
                'Export Data'
              ].map((permission, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2 border-t border-gray-100 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">{permission}</div>
                  <div className="text-center">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                  </div>
                  <div className="text-center">
                    <span className={index < 2 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                      {index < 2 ? "✓" : "✗"}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className={index === 1 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                      {index === 1 ? "✓" : "✗"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
