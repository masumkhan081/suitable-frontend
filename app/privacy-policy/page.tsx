import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
              <p className="text-gray-600 mb-4">
                At Suitable, we collect information to help you find meaningful connections. This includes 
                information you provide when creating your dating profile, using our matching features, 
                or contacting our support team:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Profile information (name, age, photos, bio, interests, relationship preferences)</li>
                <li>Contact details (email address, phone number for verification)</li>
                <li>Location data to show you nearby matches</li>
                <li>Dating preferences and compatibility criteria</li>
                <li>Messages and interactions with other users</li>
                <li>Photos and media you upload to your profile</li>
                <li>Usage patterns and app analytics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">
                We use your information to create the best dating experience possible:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Show your profile to compatible matches based on preferences</li>
                <li>Suggest potential matches using our compatibility algorithm</li>
                <li>Enable messaging and communication features</li>
                <li>Verify user identities to maintain a safe dating environment</li>
                <li>Process premium subscription payments and features</li>
                <li>Send notifications about matches, messages, and app updates</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Improve our matching algorithm and user experience</li>
                <li>Prevent fraud, spam, and inappropriate behavior</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Information Sharing</h2>
              <p className="text-gray-600 mb-4">
                Your privacy is paramount in dating. We never sell your personal information. 
                We only share information in these specific circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>With other Suitable users when you match or interact (profile info only)</li>
                <li>With your explicit consent for specific features</li>
                <li>With trusted service providers (payment processing, photo verification)</li>
                <li>To comply with legal requirements or court orders</li>
                <li>To protect user safety and prevent harassment or fraud</li>
                <li>In case of business merger or acquisition (with notice to users)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Security</h2>
              <p className="text-gray-600 mb-4">
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction. However, 
                no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Your Rights</h2>
              <p className="text-gray-600 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Access and update your personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of certain communications</li>
                <li>Request a copy of your data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibent text-gray-800 mb-4">6. Dating Safety and Verification</h2>
              <p className="text-gray-600 mb-4">
                Your safety while dating is our priority. We implement various measures to create 
                a secure environment:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Photo verification to confirm profile authenticity</li>
                <li>Identity verification for premium features</li>
                <li>Reporting and blocking tools for inappropriate behavior</li>
                <li>AI-powered content moderation for messages and photos</li>
                <li>Safety tips and dating guidelines</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Changes to This Policy</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date at the top of this Privacy Policy.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this privacy policy, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  Email: privacy@suitable.com<br />
                  Address: 123 Love Street, Suite 200, San Francisco, CA 94102<br />
                  Phone: +1 (555) SUITABLE<br />
                  Support Hours: Monday-Friday 9AM-6PM PST
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
