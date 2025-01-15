"use client";
import React from 'react';
import { useUser ,UserButton } from '@clerk/nextjs';

export default function MiniProfile() {
  const { user } = useUser();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center p-4 bg-white shadow-md rounded-lg w-72">
        <UserButton />
      <img 
        src={user.imageUrl} 
        alt="Profile Picture" 
        className="w-16 h-16 rounded-full border-2 border-blue-500"
      />
      <div className="ml-4">
        <h2 className="text-lg font-semibold">{user.firstName} {user.lastName}</h2>
        <p className="text-sm text-gray-600">{user.emailAddresses[0].emailAddress}</p>
      </div>
    </div>
  );
}
