import EnhanceText from '@/components/custom/EnhanceText'
import React from 'react'
import AuthGuard from '@/components/auth/authguard'

export default function page() {
  return (
    <AuthGuard>
      <div>
        <EnhanceText txt="Home" styleKey="appTitle" />
      </div>
    </AuthGuard>
  )
}