'use client';

import React, { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { SettingsTabs } from '@/components/dashboard/SettingsTabs';

interface ContactInfo {
  supportEmail: string;
  supportPhone: string;
  officeAddress: string;
  businessHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}

const initialContactInfo: ContactInfo = {
  supportEmail: 'support@suitable.com',
  supportPhone: '+1 (555) 123-4567',
  officeAddress: '123 Business St, Suite 100\nSan Francisco, CA 94102',
  businessHours: {
    weekdays: '9:00 AM - 6:00 PM PST',
    saturday: '10:00 AM - 4:00 PM PST',
    sunday: 'Closed'
  }
};

export default function ContactsPage() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(initialContactInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<ContactInfo>(initialContactInfo);

  const handleEdit = () => {
    setEditForm(contactInfo);
    setIsEditing(true);
  };

  const handleSave = () => {
    setContactInfo(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(contactInfo);
    setIsEditing(false);
  };

  const updateEditForm = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      if (parent === 'businessHours') {
        setEditForm({
          ...editForm,
          businessHours: {
            ...editForm.businessHours,
            [child]: value
          }
        });
      }
    } else {
      setEditForm({
        ...editForm,
        [field]: value
      });
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <div className="flex items-center gap-3 mb-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      </div>
      
      <SettingsTabs />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <FiPhone className="text-2xl text-green-600 dark:text-green-400" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Contact Information</h2>
        </div>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
          >
            <FiEdit2 className="text-sm" />
            Edit Contact Info
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-200"
            >
              <FiSave className="text-sm" />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <FiX className="text-sm" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Support Team Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-200">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Support Team</h2>
          <div className="space-y-4">
            {/* Email Support */}
            <div className="flex items-center gap-3">
              <FiMail className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-gray-200">Email Support</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.supportEmail}
                    onChange={(e) => updateEditForm('supportEmail', e.target.value)}
                    className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm transition-colors duration-200"
                    placeholder="Enter support email"
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">{contactInfo.supportEmail}</p>
                )}
              </div>
            </div>

            {/* Phone Support */}
            <div className="flex items-center gap-3">
              <FiPhone className="text-green-600 dark:text-green-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-gray-200">Phone Support</p>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.supportPhone}
                    onChange={(e) => updateEditForm('supportPhone', e.target.value)}
                    className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm transition-colors duration-200"
                    placeholder="Enter support phone"
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">{contactInfo.supportPhone}</p>
                )}
              </div>
            </div>

            {/* Office Address */}
            <div className="flex items-start gap-3">
              <FiMapPin className="text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-gray-200">Office Address</p>
                {isEditing ? (
                  <textarea
                    value={editForm.officeAddress}
                    onChange={(e) => updateEditForm('officeAddress', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm transition-colors duration-200"
                    placeholder="Enter office address"
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">{contactInfo.officeAddress}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-200">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Business Hours</h2>
          <div className="space-y-3">
            {/* Monday - Friday */}
            <div className="flex items-center gap-3">
              <FiClock className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-gray-200">Monday - Friday</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.businessHours.weekdays}
                    onChange={(e) => updateEditForm('businessHours.weekdays', e.target.value)}
                    className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm transition-colors duration-200"
                    placeholder="Enter weekday hours"
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">{contactInfo.businessHours.weekdays}</p>
                )}
              </div>
            </div>

            {/* Saturday */}
            <div className="flex items-center gap-3">
              <FiClock className="text-orange-600 dark:text-orange-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-gray-200">Saturday</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.businessHours.saturday}
                    onChange={(e) => updateEditForm('businessHours.saturday', e.target.value)}
                    className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm transition-colors duration-200"
                    placeholder="Enter Saturday hours"
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">{contactInfo.businessHours.saturday}</p>
                )}
              </div>
            </div>

            {/* Sunday */}
            <div className="flex items-center gap-3">
              <FiClock className="text-red-600 dark:text-red-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-gray-200">Sunday</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.businessHours.sunday}
                    onChange={(e) => updateEditForm('businessHours.sunday', e.target.value)}
                    className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm transition-colors duration-200"
                    placeholder="Enter Sunday hours"
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">{contactInfo.businessHours.sunday}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg transition-colors duration-200">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Note:</strong> Changes will be saved locally. In a production environment, 
            these changes would be saved to your database and reflected across the application.
          </p>
        </div>
      )}
    </div>
  );
}
