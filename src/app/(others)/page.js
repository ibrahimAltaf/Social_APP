"use client";
import Feed from "../../components/Feed";
import Input from "../../components/Input";
import React, { useEffect, useState } from "react";

export default async function Home() {
  let data = null;
  try {
    const response = await fetch("https://social-app-two-gold.vercel.app/api/post/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
  return (
    <div className='min-h-screen max-w-xl mx-auto border-r border-l'>
      <div className='py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
        <h2 className='text-lg sm:text-xl font-bold'>Home</h2>
      </div>
      <Input />
      <Feed data={data} />
    </div>
  );
}