import EnhanceText from '@/components/custom/EnhanceText'
import React from 'react'

type Props = {}

export default function VerificationRequired({}: Props) {
  return (
    <div>
      <EnhanceText txt="Verification Required" styleKey="appTitle" />
    </div>
  )
}