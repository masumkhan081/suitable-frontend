import EnhanceText from '@/components/custom/EnhanceText'
import React from 'react'

type Props = Record<string, unknown>

export default function OnboardRequest({}: Props) {
  return (
    <div>
      <EnhanceText txt="Onboard Request" styleKey="appTitle" />
    </div>
  )
}
