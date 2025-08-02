'use client';

import { SettingsTabs } from '@/components/dashboard/SettingsTabs';

export default function TeamManagementPage() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-3">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <SettingsTabs />
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Team Management</h2>
          <p className="text-gray-600">Manage your team members, roles, and permissions.</p>
        </div>

        <div className="space-y-6">
          {/* Team Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-blue-900 mb-2">Total Members</h3>
              <p className="text-2xl font-bold text-blue-700">12</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-green-900 mb-2">Active Members</h3>
              <p className="text-2xl font-bold text-green-700">10</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-orange-900 mb-2">Pending Invites</h3>
              <p className="text-2xl font-bold text-orange-700">2</p>
            </div>
          </div>

          {/* Add New Member */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Team Member</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Send Invite
                </button>
              </div>
            </div>
          </div>

          {/* Team Members List */}
          <div className="border border-gray-200 rounded-lg">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {/* Sample team members */}
              {[
                { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
                { name: 'Jane Smith', email: 'jane@example.com', role: 'Moderator', status: 'Active' },
                { name: 'Mike Johnson', email: 'mike@example.com', role: 'Viewer', status: 'Pending' },
              ].map((member, index) => (
                <div key={index} className="p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{member.name}</h4>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{member.role}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      member.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {member.status}
                    </span>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                      <button className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Permissions Settings */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Role Permissions</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="font-medium text-gray-700">Permission</div>
                <div className="font-medium text-gray-700 text-center">Admin</div>
                <div className="font-medium text-gray-700 text-center">Moderator</div>
                <div className="font-medium text-gray-700 text-center">Viewer</div>
              </div>
              {[
                'Manage Users',
                'View Analytics',
                'Manage Settings',
                'Send Messages',
                'Export Data'
              ].map((permission, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2 border-t border-gray-100">
                  <div className="text-sm text-gray-600">{permission}</div>
                  <div className="text-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <div className="text-center">
                    <span className={index < 2 ? "text-green-600" : "text-red-600"}>
                      {index < 2 ? "✓" : "✗"}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className={index === 1 ? "text-green-600" : "text-red-600"}>
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
