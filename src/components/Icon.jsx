"use client";
import React, { useEffect, useState } from 'react';
import { HiOutlineChat, HiOutlineHeart, HiOutlineTrash ,HiHeart} from 'react-icons/hi';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
export default function Icon({post}) {
    const [isLiked,setLiked] =useState(false)
    const [likes,setlikes]=useState(post.likes || [])
    const {user} = useUser()
    const router = useRouter()
    const likePost = async () => {
        if (!user) {
            return router.push("/sign-in");
        }
    
        const response = await fetch("/api/post/like", {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ postId: post._id })
        });
    
        if (!response.ok) {
            console.error("Error liking post");
            return;
        }
    
        const updatedPost = await response.json();
    
        setlikes(updatedPost.likes);  
        setLiked(updatedPost.likes.includes(user.publicMetadata.userMongoId));
    };
    useEffect(()=>{
if(user && likes?.includes(user.publicMetadata.userMongoId)){
    setLiked(true)
}else{
    setLiked(false)
}
    },[likes,user])
  return (
    <div className='flex justify-start gap-5 p-2 text-gray-500'>
      <HiOutlineChat className='h-8 w-8 cursor-pointer 
      rounded-full transition duration-500 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100' />
      
    {isLiked ? (
      <HiHeart onClick={likePost} className='h-8 w-8 cursor-pointer 
      rounded-full transition text-red-600 duration-500 ease-in-out p-2
       hover:text-red-600 hover:bg-red-100' />

    
    ) : (
        <HiOutlineHeart onClick={likePost} className='h-8 w-8 cursor-pointer 
      rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100' />
    )

    }  
      {likes.length > 0 && <span className={`text-xs ${isLiked && 'text-red-600'}`}>{likes.length}</span>

      }
      <HiOutlineTrash className='h-8 w-8 cursor-pointer 
      rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100' />
    </div>
  );
}
