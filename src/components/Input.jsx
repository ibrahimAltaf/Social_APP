"use client"
import React from 'react'
import { FaImage } from "react-icons/fa";
import { useUser } from '@clerk/nextjs';
export default function Input() {
 const { user ,isSignedIn,isLoaded} = useUser();
if(!user || !isSignedIn || !isLoaded){
    return null
}

  return (
    <div className='flex  '> 
      <textarea noOfLines={2}/>
      
      <div className="">
      <FaImage />
      <input type='file' accept='images/*' />
      
      <button>Post</button>
      </div>
    </div>
  )
}
