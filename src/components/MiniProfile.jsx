"use client"
import React from 'react'
import { useUser ,UserButton } from '@clerk/nextjs'
export default function MiniProfile() {
  const {user} = useUser()

  console.log(`user=======>>> ${JSON.stringify(user )}`)
    return (
    <div className=''>

        <UserButton />
        <h3>{user && user.firstName}</h3>
        <p>{user && user.username}</p>
        <p>{user && user.emailAddress}</p>

    </div>
  )
}
