"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function RightSidebar() {
  const [input, setinput] = useState('')
  const router = useRouter()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    router.push(`/search/${input}`)

  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input className='bg-gray-100 border text-black border-gray-200 rounded-3xl text-sm w-full px-4 py-2' type="text" placeholder='Search' value={input} onChange={(e) => setinput(e.target.value)} />
      </form>
    </div>
  )
}
