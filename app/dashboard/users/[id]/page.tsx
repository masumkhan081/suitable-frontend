'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FiArrowLeft, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { useUsers } from '@/hooks/useUsers';

interface UserDetailPageProps {
  params: {
    id: string;
  };
}

export default function UserDetailPage({ params }: UserDetailPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { users } = useUsers();
  
  // Get the tab parameter to know which tab to return to
  const fromTab = searchParams.get('from') || 'all';
  
  // Find the user by ID
  const user = users.find(u => u.id === params.id);
  
  const handleBack = () => {
    // Navigate back to the specific user tab
    const tabPaths: { [key: string]: string } = {
      'all': '/dashboard/users',
      'active': '/dashboard/users/active',
      'verified': '/dashboard/users/verified',
      'pending': '/dashboard/users/pending',
      'declined': '/dashboard/users/declined',
      'inactive': '/dashboard/users/inactive',
      'deactivated': '/dashboard/users/deactivated',
      'deleted': '/dashboard/users/deleted'
    };
    
    router.push(tabPaths[fromTab] || '/dashboard/users');
  };

  if (!user) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Users
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">User Not Found</h2>
          <p className="text-gray-600">The user you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={handleBack}
          className="flex items-center gap-2"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Users
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
          <p className="text-gray-600">Viewing details for {user['First Name']} {user['Last Name']}</p>
        </div>
      </div>

      {/* User Details Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        {/* User Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <FiUser className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {user['First Name']} {user['Last Name']}
              </h2>
              <p className="text-gray-600">{user.Email}</p>
            </div>
          </div>
        </div>

        {/* User Information Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
              
              <div className="flex items-center gap-3">
                <FiUser className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Full Name</p>
                  <p className="text-sm text-gray-600">{user['First Name']} {user['Last Name']}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FiCalendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Age</p>
                  <p className="text-sm text-gray-600">{user.Age} years old</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FiUser className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Gender</p>
                  <p className="text-sm text-gray-600">{user.Gender}</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
              
              <div className="flex items-center gap-3">
                <FiMail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <p className="text-sm text-gray-600">{user.Email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FiPhone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Phone</p>
                  <p className="text-sm text-gray-600">{user.Phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FiMapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Address</p>
                  <p className="text-sm text-gray-600">{user.Address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Status */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Verification Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-lg border ${user.Status.ageVerified ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${user.Status.ageVerified ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm font-medium text-gray-700">Age Verification</span>
                </div>
                <p className={`text-sm mt-1 ${user.Status.ageVerified ? 'text-green-600' : 'text-red-600'}`}>
                  {user.Status.ageVerified ? 'Verified' : 'Not Verified'}
                </p>
              </div>

              <div className={`p-4 rounded-lg border ${user.Status.incomeVerified ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${user.Status.incomeVerified ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm font-medium text-gray-700">Income Verification</span>
                </div>
                <p className={`text-sm mt-1 ${user.Status.incomeVerified ? 'text-green-600' : 'text-red-600'}`}>
                  {user.Status.incomeVerified ? 'Verified' : 'Not Verified'}
                </p>
              </div>

              <div className={`p-4 rounded-lg border ${user.Status.identityVerified ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${user.Status.identityVerified ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm font-medium text-gray-700">Identity Verification</span>
                </div>
                <p className={`text-sm mt-1 ${user.Status.identityVerified ? 'text-green-600' : 'text-red-600'}`}>
                  {user.Status.identityVerified ? 'Verified' : 'Not Verified'}
                </p>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Revenue</p>
                <p className="text-lg font-semibold text-gray-900">{user.Revenue}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Rent</p>
                <p className="text-lg font-semibold text-gray-900">{user.Rent}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Deposit</p>
                <p className="text-lg font-semibold text-gray-900">{user.Deposit}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-700">Total</p>
                <p className="text-lg font-semibold text-blue-900">{user.Total}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
