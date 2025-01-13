"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs'
export default function MiniProfile() {
  const user = useUser()

  console.log(`user=======>>> ${user}`)
    return (
    <div>
      Profile
    </div>
  )
}
