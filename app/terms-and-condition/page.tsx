import React from 'react';

export default function TermsAndConditionPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Welcome to Suitable! By creating an account and using our dating platform, you agree 
                to these terms and conditions. These terms govern your use of our matching services, 
                messaging features, and all other aspects of the Suitable dating experience. If you 
                don&apos;t agree with these terms, please don&apos;t use our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Use License</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Permission is granted to temporarily download one copy of the materials on our website 
                for personal, non-commercial transitory viewing only. This is the grant of a license, 
                not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Dating Profile and Account Requirements</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Your dating profile is the foundation of your Suitable experience. To maintain a 
                trustworthy community, you must provide accurate and honest information:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-4">
                <li>You must be at least 18 years old and legally able to enter relationships</li>
                <li>All profile information (age, photos, bio) must be truthful and current</li>
                <li>Photos must be recent (within 2 years) and clearly show your face</li>
                <li>You may only create one account per person</li>
                <li>You&apos;re responsible for keeping your login credentials secure</li>
                <li>Catfishing or impersonating others is strictly prohibited</li>
                <li>We reserve the right to verify your identity and remove fake profiles</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Community Guidelines and Prohibited Behavior</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                To maintain a safe and respectful dating environment, the following behaviors are prohibited:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-4">
                <li>Harassment, stalking, or threatening other users</li>
                <li>Sending unsolicited explicit content or messages</li>
                <li>Using the platform for commercial purposes or advertising</li>
                <li>Soliciting money, gifts, or personal information from other users</li>
                <li>Promoting illegal activities or substances</li>
                <li>Discriminating based on race, religion, gender, or sexual orientation</li>
                <li>Creating fake profiles or using someone else's photos</li>
                <li>Sharing intimate images without consent</li>
                <li>Attempting to bypass our safety features or verification systems</li>
                <li>Using bots or automated systems to interact with users</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Premium Features and Subscriptions</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Suitable offers both free and premium features to enhance your dating experience:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-4">
                <li>Free features include basic matching, limited daily likes, and messaging with matches</li>
                <li>Premium subscriptions unlock unlimited likes, advanced filters, and read receipts</li>
                <li>Subscription fees are charged monthly or annually as selected</li>
                <li>You can cancel your subscription at any time through your account settings</li>
                <li>Refunds are not provided for unused portions of subscription periods</li>
                <li>Premium features may be modified or discontinued with notice</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Privacy Policy</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs 
                your use of the website, to understand our practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Account Termination and Dating Safety</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We take user safety seriously and may suspend or terminate accounts for violations:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-4">
                <li>Immediate termination for harassment, threats, or illegal activity</li>
                <li>Warning system for minor violations of community guidelines</li>
                <li>You may delete your account at any time through settings</li>
                <li>Deleted accounts and all associated data are permanently removed</li>
                <li>We may retain some information as required by law or for safety purposes</li>
                <li>Banned users cannot create new accounts on our platform</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Disclaimer</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                The information on this website is provided on an &quot;as is&quot; basis. To the fullest extent 
                permitted by law, this Company excludes all representations, warranties, conditions and 
                terms relating to our website and the use of this website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                In no event shall our company, nor its directors, employees, partners, agents, suppliers, 
                or affiliates, be liable for any indirect, incidental, punitive, consequential, or special 
                damages arising out of or related to your use of the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Governing Law</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We may update these Terms and Conditions from time to time. We will notify you of any changes by posting the new terms on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We reserve the right to terminate or suspend your account if you violate these terms or engage in behavior that we deem inappropriate or harmful to other users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Contact Information</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                By accessing and using Suitable&apos;s matrimonial platform, you agree to be bound by these Terms and Conditions.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  Email: legal@suitable.com<br />
                  Address: 123 Love Street, Suite 200, San Francisco, CA 94102<br />
                  Phone: +1 (555) SUITABLE<br />
                  Safety Hotline: +1 (555) SAFE-DATE (24/7)<br />
                  Business Hours: Monday-Friday 9AM-6PM PST
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
