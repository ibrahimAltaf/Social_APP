import React from 'react'
import Post from './Post'

const Feed = ({data}) => {
  return (
    <div>
      {data.map((post)=>(
        <Post key={post._id} post={post} />
      ))

      }
    </div>
  )
}

export default Feed
