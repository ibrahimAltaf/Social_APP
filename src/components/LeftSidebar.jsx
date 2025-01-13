import Link from 'next/link'
import React from 'react'
import { FaTwitter } from "react-icons/fa6";
import { TiHome } from "react-icons/ti";
import { SignedIn , SignedOut,SignInButton,SignOutButton } from '@clerk/nextjs';
import MiniProfile from './MiniProfile';
export default function LeftSidebar() {
  return (
    <div className='flex flex-col gap-4 p-3'>

      <Link href={"/"}>
        <FaTwitter className='w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200' />

      </Link>
      
      <Link href={"/"} 
      className='flex items-center p-3  hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit'
      >
        <TiHome   className='w-7 h-7' />
        <span>Home</span>

      </Link>
      <button className='bg-blue-400 text-white rounded-full hover:brightness-95 transition-all duration-200 w-48 h-9 shadow-md hidden xl:inline '>
       <SignedIn>
        <SignOutButton />
       </SignedIn>
       <SignedOut>
        <SignInButton/>
       </SignedOut>
      </button>
      <SignedIn>
       <MiniProfile />
       </SignedIn>
    </div>
  )
}
