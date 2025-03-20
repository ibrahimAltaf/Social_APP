import React from 'react'
import Link from 'next/link'
import moment from "moment"
const Post = ({post}) => {
  return (
    <div className='flex p-3 border-b border-gray-200 w-full hover:bg-gray-50'>
        <Link href={`user/${post?.username}`} />
        <img
        src={post?.profileImg}
        alt='userimg'
        className='h-11 w-11 rounded-full mr-4 '

        />
        <div className="flex-1">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 whitespace-nowrap">
                    <h4 className='font-bold textxs truncate max-w-32'>{post?.name}</h4>
                    <span>@{post?.username}</span>
                    <span className='text-xl text-gray-500'>.</span>
                    <span className='text-xs text-gray-500 flex-1 truncate '>{moment(post?.createdAt).fromNov()}</span>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Post
