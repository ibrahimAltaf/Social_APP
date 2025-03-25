"use client";
import Feed from "../../components/Feed";
import Input from "../../components/Input";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllPost = async () => {
      try {
        const response = await fetch("/api/post/all", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData); 
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getAllPost();
  }, []);

  return (
    <div className="min-h-screen max-w-xl mx-auto border-r border-l">
      <div className="py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
      </div>
      <Input />
      <Feed data={data} />
    </div>
  );
}
