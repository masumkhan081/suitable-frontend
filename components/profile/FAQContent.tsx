'use client'
import React, { useState } from 'react'
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'

interface FAQ {
  id: string
  question: string
  answer: string
}

// Using the same initial FAQs from the admin dashboard
const faqs: FAQ[] = [
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
  },
  {
    id: '6',
    question: 'How does the matching algorithm work?',
    answer: 'Our matching algorithm considers your preferences, interests, and compatibility factors to suggest potential matches. The more information you provide in your profile, the better matches you\'ll receive.'
  },
  {
    id: '7',
    question: 'What is identity verification and why is it required?',
    answer: 'Identity verification helps ensure the safety and authenticity of our community. By verifying your identity with official documents, you help create a more trustworthy environment for all users.'
  },
  {
    id: '8',
    question: 'Can I hide my profile temporarily?',
    answer: 'Yes, you can pause your visibility in the settings. This will hide your profile from searches and matches until you choose to become visible again.'
  }
]

export default function FAQAccordion() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto">
          <HelpCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Find answers to common questions about using Suitable. If you can't find what you're looking for, 
          please contact our support team.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {faqs.map((faq, index) => (
          <div 
            key={faq.id}
            className={`border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${
              openFAQ === faq.id ? 'bg-purple-50 dark:bg-purple-900/10' : ''
            }`}
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  {faq.question}
                </h3>
              </div>
              {openFAQ === faq.id ? (
                <ChevronUp className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
              )}
            </button>
            
            {openFAQ === faq.id && (
              <div className="px-6 pb-4 pt-1 ml-12 animate-fadeIn">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800/50 text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Still have questions?</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Our support team is here to help you with any questions or concerns.
        </p>
        <a 
          href="/support" 
          className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-md"
        >
          Contact Support
        </a>
      </div>
    </div>
  )
}
