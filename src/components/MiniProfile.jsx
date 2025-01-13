"use client"
import React from 'react'
import { useUser ,UserButton } from '@clerk/nextjs'
export default function MiniProfile() {
  const user = useUser()

  console.log(`user=======>>> ${JSON.stringify(user)}`)
    return (
    <div className='flex'>

        {/* <UserButton /> */}
        <h3>{user && user.firstname}</h3>
    </div>
  )
}
