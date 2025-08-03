'use client';

import React, { useState } from 'react';
import { FiHelpCircle, FiPlus, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import { SettingsTabs } from '@/components/dashboard/SettingsTabs';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const initialFAQs: FAQ[] = [
  {
    id: '1',
    question: 'How do I reset my password?',
    answer: 'You can reset your password by clicking the "Forgot Password" link on the login page. We\'ll send you an email with instructions to create a new password.'
  },
  {
    id: '2',
    question: 'How do I update my profile information?',
    answer: 'Go to your profile settings and click "Edit Profile". You can update your personal information, preferences, and other details from there.'
  },
  {
    id: '3',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for premium subscriptions.'
  },
  {
    id: '4',
    question: 'How can I contact customer support?',
    answer: 'You can reach our support team through the contact form, email us at support@suitable.com, or call our helpline during business hours.'
  },
  {
    id: '5',
    question: 'Is my personal information secure?',
    answer: 'Yes, we use industry-standard encryption and security measures to protect your data. Please review our Privacy Policy for detailed information about data handling.'
  }
];

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState({ question: '', answer: '' });
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });

  const handleEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setEditForm({ question: faq.question, answer: faq.answer });
  };

  const handleSave = (id: string) => {
    setFaqs(faqs.map(faq =>
      faq.id === id
        ? { ...faq, question: editForm.question, answer: editForm.answer }
        : faq
    ));
    setEditingId(null);
    setEditForm({ question: '', answer: '' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ question: '', answer: '' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      setFaqs(faqs.filter(faq => faq.id !== id));
    }
  };

  const handleAdd = () => {
    if (newFaq.question.trim() && newFaq.answer.trim()) {
      const newId = Date.now().toString();
      setFaqs([...faqs, { id: newId, ...newFaq }]);
      setNewFaq({ question: '', answer: '' });
      setIsAdding(false);
    }
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewFaq({ question: '', answer: '' });
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <div className="flex items-center gap-3 mb-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      </div>

      <SettingsTabs />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <FiHelpCircle className="text-2xl text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Frequently Asked Questions</h2>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
        >
          <FiPlus className="text-sm" />
          Add FAQ
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
        <div className="space-y-6">
          {/* Add New FAQ Form */}
          {isAdding && (
            <div className="rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Add New FAQ</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Question
                  </label>
                  <input
                    type="text"
                    value={newFaq.question}
                    onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
                    placeholder="Enter the question..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Answer
                  </label>
                  <textarea
                    value={newFaq.answer}
                    onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
                    placeholder="Enter the answer..."
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-md hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-200"
                  >
                    <FiSave className="text-sm" />
                    Save
                  </button>
                  <button
                    onClick={handleCancelAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-500 dark:bg-gray-600 text-white rounded-md hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <FiX className="text-sm" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FAQ List */}
          {faqs.map((faq, index) => (
            <div key={faq.id} className="mb-6 last:mb-0">
              {editingId === faq.id ? (
                // Edit Mode
                <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Question
                    </label>
                    <input
                      type="text"
                      value={editForm.question}
                      onChange={(e) => setEditForm({ ...editForm, question: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Answer
                    </label>
                    <textarea
                      value={editForm.answer}
                      onChange={(e) => setEditForm({ ...editForm, answer: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSave(faq.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-md hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-200"
                    >
                      <FiSave className="text-sm" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-500 dark:bg-gray-600 text-white rounded-md hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <FiX className="text-sm" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg transition-colors duration-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(faq)}
                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors duration-200"
                        title="Edit FAQ"
                      >
                        <FiEdit2 className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors duration-200"
                        title="Delete FAQ"
                      >
                        <FiTrash2 className="text-sm" />
                      </button>
                    </div>
                  </div>
                  <div className="ml-11">
                    <p className="text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {faqs.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No FAQs available. Click "Add FAQ" to create your first one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
