'use client'
import React from 'react'
import Link from 'next/link'

export default function OnboardingWelcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
        }}
      ></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Bismillah...
          </h1>

          {/* Description text */}
          <div className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 space-y-4">
            <p>
              Now that you have created your login, please take your time and make effort to fill in these questions fully. It will take you approximately 10-15 minutes. Be honest and true about yourself and what qualities you will like to find in an partner.
            </p>

            <p>
              We ask many questions from lifestyle to family background. Some are for our vetting process and your profile will only show basic details. If you connect with another member then you will both be able to see an expanded profile.
            </p>

            <p className="text-sm">
              (Questions marked with a "*" is for admin purposes only and will never be shown on your profile).
            </p>
          </div>

          {/* Start Now button */}
          <Link
            href="/onboarding/personal-info/step-1"
            className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start Now
          </Link>

          {/* Progress indicator */}
          <div className="mt-12">
            <p className="text-white/70 text-sm mb-4">Profile Setup Progress</p>
            <div className="w-full max-w-md mx-auto bg-white/20 rounded-full h-2">
              <div className="bg-purple-400 h-2 rounded-full w-0 transition-all duration-300"></div>
            </div>
            <p className="text-white/60 text-xs mt-2">0% Complete</p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-400/20 rounded-full blur-xl"></div>
    </div>
  )
}
