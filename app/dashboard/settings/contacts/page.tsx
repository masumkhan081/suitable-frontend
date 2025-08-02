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
    <div className="p-6">
      <div className="flex items-center gap-3 mb-3">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>
      
      <SettingsTabs />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <FiPhone className="text-2xl text-green-600" />
          <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
        </div>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiEdit2 className="text-sm" />
            Edit Contact Info
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FiSave className="text-sm" />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <FiX className="text-sm" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Support Team Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Support Team</h2>
          <div className="space-y-4">
            {/* Email Support */}
            <div className="flex items-center gap-3">
              <FiMail className="text-blue-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-gray-800">Email Support</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.supportEmail}
                    onChange={(e) => updateEditForm('supportEmail', e.target.value)}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Enter support email"
                  />
                ) : (
                  <p className="text-gray-600">{contactInfo.supportEmail}</p>
                )}
              </div>
            </div>

            {/* Phone Support */}
            <div className="flex items-center gap-3">
              <FiPhone className="text-green-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-gray-800">Phone Support</p>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.supportPhone}
                    onChange={(e) => updateEditForm('supportPhone', e.target.value)}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Enter support phone"
                  />
                ) : (
                  <p className="text-gray-600">{contactInfo.supportPhone}</p>
                )}
              </div>
            </div>

            {/* Office Address */}
            <div className="flex items-start gap-3">
              <FiMapPin className="text-red-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="font-medium text-gray-800">Office Address</p>
                {isEditing ? (
                  <textarea
                    value={editForm.officeAddress}
                    onChange={(e) => updateEditForm('officeAddress', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Enter office address"
                  />
                ) : (
                  <p className="text-gray-600 whitespace-pre-line">{contactInfo.officeAddress}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Business Hours</h2>
          <div className="space-y-3">
            {/* Monday - Friday */}
            <div className="flex items-center gap-3">
              <FiClock className="text-blue-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-gray-800">Monday - Friday</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.businessHours.weekdays}
                    onChange={(e) => updateEditForm('businessHours.weekdays', e.target.value)}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Enter weekday hours"
                  />
                ) : (
                  <p className="text-gray-600">{contactInfo.businessHours.weekdays}</p>
                )}
              </div>
            </div>

            {/* Saturday */}
            <div className="flex items-center gap-3">
              <FiClock className="text-orange-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-gray-800">Saturday</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.businessHours.saturday}
                    onChange={(e) => updateEditForm('businessHours.saturday', e.target.value)}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Enter Saturday hours"
                  />
                ) : (
                  <p className="text-gray-600">{contactInfo.businessHours.saturday}</p>
                )}
              </div>
            </div>

            {/* Sunday */}
            <div className="flex items-center gap-3">
              <FiClock className="text-red-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-gray-800">Sunday</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.businessHours.sunday}
                    onChange={(e) => updateEditForm('businessHours.sunday', e.target.value)}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Enter Sunday hours"
                  />
                ) : (
                  <p className="text-gray-600">{contactInfo.businessHours.sunday}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Changes will be saved locally. In a production environment, 
            these changes would be saved to your database and reflected across the application.
          </p>
        </div>
      )}
    </div>
  );
}
