import EnhanceText from '@/components/custom/EnhanceText'
import React from 'react'

type Props = Record<string, unknown>

export default function VerificationRequired({}: Props) {
  return (
    <div>
      <EnhanceText txt="Verification Required" styleKey="appTitle" />
    </div>
  )
}