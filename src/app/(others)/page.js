"use client"
import Feed from '../../components/Feed'
import Input from '../../components/Input'
import React from 'react'


export default async function page() {
  let data = null 
  try {
    const result = await fetch('https://social-app-two-gold.vercel.app/api/post/all' ,{
      method:"POST",
      cache: "no-store",
    })
    data = await result.json()
  } catch (error) {
    console.log(`Error in fecthing post`,error)
    
  }
  return (
    <div className='min-h-screen max-w-xl mx-auto border-r border-l '>
      <div className='py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200 '>
        <h2 className='text-lg sm:text-xl font-bold'>Home</h2>
<Input/>
<Feed data={data}/>
      </div>
    </div>
  )
}
