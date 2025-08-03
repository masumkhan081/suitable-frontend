import EnhanceText from '@/components/custom/EnhanceText'
import React from 'react'

type Props = Record<string, unknown>

export default function VerifyAge({}: Props) {
  return (
    <div>
      <EnhanceText txt="Verify Age" styleKey="appTitle" />
    </div>
  )
}