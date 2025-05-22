import React from 'react'

export default function ResetSuccess() {
  return (
    <div className="max-w-md w-full">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Password reset successful!
        </h2>
        <p className="mt-4 text-gray-600">
          Your password has been successfully reset. You can now sign in with your new password.
        </p>
        <button
          className="mt-8 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Go to sign in
        </button>
      </div>
    </div>
  )
}
