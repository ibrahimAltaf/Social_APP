"use client";
import Input from "../../components/Input";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getAllPost = async () => {
      try {
        const result = await fetch("https://social-app-two-gold.vercel.app/api/post/all", {
          method: "POST",
          cache: "no-cache",
        });
  
        if (!result.ok) {
          throw new Error(`HTTP error! Status: ${result.status}`);
        }
  
        const jsonData = await result.json();
        console.log("Fetched Data:", jsonData);
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

      
    </div>
  );
}
