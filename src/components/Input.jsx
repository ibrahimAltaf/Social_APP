"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'
import { HiOutlinePhoto } from "react-icons/hi2";

export default function Input() {
    const { user ,isSignedIn,isLoaded} = useUser()

    if(!isLoaded || !isSignedIn) {
        return null
    }

  return (
    <div className='flex border-b border-gray-200 p-3 space-x3 w-full'>

        <img src={user.imageUrl} alt="" className='w-12 h-12 rounded-full cursor-pointer hover:brightness-95 object-cover'/>
        <div className="w-full divide-y divide-gray-200">
        <textarea rows={"2"} placeholder='What is happening?' className='w-full outline-none tracking-wide min-h-[50px] text-gray-700' />

        </div>
        <div className="flex items-center justify-between pt-2.5  ">
            <HiOutlinePhoto className='w-10 h-10 text-blue-500 cursor-pointer hover:bg-sky-100 rounded-full cursor-pointer'/>
            <button disabled className='bg-blue-500 text-white px-4 py-2 rounded-full hover:brightness-95 transition-all duration-200'>
                Post
            </button>
        </div>
    </div>
  )
}
