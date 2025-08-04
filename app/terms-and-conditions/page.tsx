import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Terms and Conditions
          </h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Last updated: January 1, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                By accessing and using Suitable ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Use License
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Permission is granted to temporarily download one copy of Suitable's materials for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 ml-4">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained on the website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. User Accounts
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Privacy and Data Protection
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Prohibited Uses
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You may not use our service:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 ml-4">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Service Availability
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We reserve the right to withdraw or amend our service, and any service or material we provide on the website, in our sole discretion without notice. We will not be liable if for any reason all or any part of the website is unavailable at any time or for any period.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Limitation of Liability
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                In no event shall Suitable or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Suitable's website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Contact Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  Email: legal@suitable.one<br />
                  Phone: +1 (555) 123-4567
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
