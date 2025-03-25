import React from 'react';
import Link from "next/link";
import { HiDotsHorizontal } from "react-icons/hi";
import moment from 'moment';
import Icon from './Icon';

const Post = ({ post }) => {
  if (!post) return null; // Agar post undefined ho, to component return mat karo

  return (
    <div className='flex p-3 border-b border-gray-200 w-full hover:bg-gray-100'>
      <Link href={`/post/${post?._id}`}>
        <img 
          src={post?.profileImg || "https://media.istockphoto.com/id/1255835530/photo/modern-custom-suburban-home-exterior.jpg?s=612x612&w=0&k=20&c=0Dqjm3NunXjZtWVpsUvNKg2A4rK2gMvJ-827nb4AMU4="} 
          alt="User Profile"
          className='h-11 w-11 rounded-full object-cover'
        />
      </Link>
      
      <div className="flex-1 ml-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h4 className='font-bold text-xs truncate max-w-32'>
              {post?.name || "Unknown"}
            </h4>
            <span className='text-xs text-gray-500 truncate max-w-32'>
              @{post?.username || "anonymous"}
            </span>
            <span className='text-xs text-gray-400'>
              {post?.createdAt ? moment(post.createdAt).fromNow() : "N/A"}
            </span>
          </div>
          <HiDotsHorizontal />
        </div>

        <Link href={`/post/${post?._id}`}>
          <p className='text-gray-800 text-sm my-3 w-full'>{post?.text || ""}</p>
        </Link>

        {post?.image && (
          <Link href={`/post/${post?._id}`}>
            <img src={post.image} className='rounded-2xl mr-2' alt="Post Image" />
          </Link>
        )}
        <Icon post={post} id={post.id}/>
      </div>
    </div>
  );
};

export default Post;
