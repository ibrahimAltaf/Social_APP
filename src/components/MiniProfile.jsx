"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs'
export default function MiniProfile() {
  const user = useUser()

  console.log(`user=======>>> ${JSON.stringify(user)}`)
    return (
    <div>
      Profile
    </div>
  )
}
