"use client"
import { useUser } from '@clerk/nextjs'
import React, { useRef, useState } from 'react'
import { HiOutlinePhoto } from "react-icons/hi2";

export default function Input() {
    const { user ,isSignedIn,isLoaded} = useUser()
    const ImagePickRef =useRef(null)
    const [imageFileUrl,SetImageFileURl]=useState(null)
    const [SelectedFile,SetSelectedFile]=useState(null)
    const [imageFileUploading,setImageFileUploading]=useState(false)
    if(!isLoaded || !isSignedIn) {
        return null
    }
const addImageToPost =(e)=>{
const file = e.target.files[0]
if(file){
    SetSelectedFile(file)
    setImageFileUploading(URL.createObjectURL(file))
}
}
  return (
    <div className='flex border-b border-gray-200 p-3 space-x3 w-full'>

        <img src={user.imageUrl} alt="" className='w-12 h-12 rounded-full cursor-pointer hover:brightness-95 object-cover'/>
        <div className="w-full divide-y divide-gray-200">
        <textarea rows={"2"} placeholder='What is happening?' className='w-full outline-none tracking-wide min-h-[50px] text-gray-700' />
        {SelectedFile && (
            <img 
  src={imageFileUrl} 
  alt="selected-img" 
  className={`w-full max-h-[250px] object-cover cursor-pointer ${imageFileUploading ? "animate-pulse" : ""}`} 
/>
        )

        }
        <div className="flex items-center justify-between pt-2.5  ">
            <HiOutlinePhoto className='w-10 h-10 text-blue-500 cursor-pointer hover:bg-sky-100 rounded-full cursor-pointer' onClick={()=>{
                ImagePickRef.current.click()
            }}/>
            <input type='file' ref={ImagePickRef} accept='images/*' hidden onChange={addImageToPost}/>
            <button disabled className='bg-blue-500 text-white px-4 py-2 rounded-full hover:brightness-95 transition-all duration-200'>
                Post
            </button>
        </div>
        </div>
     
    </div>
  )
}
