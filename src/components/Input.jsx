"use client"
import React from 'react'
import { FaImage } from "react-icons/fa";
import { useUser } from '@clerk/nextjs';
import { useRef } from 'react';
export default function Input() {
 const { user ,isSignedIn,isLoaded} = useUser();
 const IMAGEFILEREF = useRef(null)
if(!user || !isSignedIn || !isLoaded){
    return null
}

  return (
    <div className='flex  '> 
        {/* <img src={user.imageUrl} alt='user_img' /> */}
      <textarea noOfLines={2}/>
      
      <div className="">
      <FaImage /> 
      <input hidden  type='file' accept='images/*' ref={IMAGEFILEREF} />

      <button>Post</button>
      </div>
    </div>
  )
}
