"use client";
import Input from "../../components/Input";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllPost = async () => {
      try {
        const result = await fetch(process.env.API_URL + "/api/post/all", {
          method: "POST",
          cache: "no-cache",
        });
        const jsonData = await result.json();
        setData(jsonData); 
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    getAllPost();
  }, []); 

  return (
    <div className="min-h-screen max-w-xl mx-auto border-r border-l">
      <div className="py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        <Input />
      </div>

      <div className="p-4">
        {data.length > 0 ? (
          data.map((post, index) => (
            <div key={index} className="p-2 border-b border-gray-200">
              <h3 className="font-bold">{post.title}</h3>
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No posts available</p>
        )}
      </div>
    </div>
  );
}
