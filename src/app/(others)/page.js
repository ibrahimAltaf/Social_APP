"use client";
import Input from "../../components/Input";
import React, { useEffect, useState } from "react";

export default async function Home() {
let data = null
try {
  const result = await fetch("https://social-app-two-gold.vercel.app/api/post/all", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}) 
  });
  data = await result.json()
} catch (error) {
  console.log(error + "error in get post api")
}

 console.log("api post data " + data)

  return (
    <div className="min-h-screen max-w-xl mx-auto border-r border-l">
      <div className="py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        <Input />
      </div>
      
    </div>
  );
}
