import React from 'react'
import Link from "next/link"
import { HiDotsHorizontal, HiOutlineDotsHorizontal } from "react-icons/hi";
import moment from 'moment';

const Post = ({post}) => {
  console.log("oist data===>" , post)
  return (
    <div className='flex p-3 border-b border-gray-200 w-full hover:bg-gray-100'>
      <Link>
      <img src={post?.profileImg}
      alt=''
      className='h-11 w-11 rounded-full object-cover'
      />
      <div className="flex-1">
        <div className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className='font-bold text-xs maz-w-32 truncate'>
              {post?.name}
            </h4> 
            <span className='text-xs truncate max-w-32'>
              {post?.username}
            </span>
            {/* yahan par mene ments sa time niakala hai ye meen smjahta nahi hai */}
            <span>
              {moment(post?.createdAt).add.fromNow()}
            </span>
          </div>
          <HiDotsHorizontal />
        </div>
        <Link  href={`/post/${post?._id}`}>
        <p className='text-gray-800 text-sm my-3 w-full'>{post?.text}</p>
        </Link>
        <Link  href={`/post/${post?._id}`}>
    <img src={post?.image} className='rounded-2xl mr-2' />

        </Link>
      </div>
      </Link>
 
    </div>
  )
}

export default Post
