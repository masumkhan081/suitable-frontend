import React from 'react'
import EnhanceText from '../custom/EnhanceText'

type Props = Record<string, unknown>

export default function ProfileCard({}: Props) {
  return (
    <div>
      <EnhanceText txt="ProfileCard" styleKey="appTitle" />
    </div>
  )
}
