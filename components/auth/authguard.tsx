import React from 'react'

export default function authguard({children}: {children: React.ReactNode}) {


const pass=true

if(!pass){
    return <div>unauthorized</div>
}

  return (
    {children}
  )
}
