"use client"
import React, { useRef, useState } from 'react';
import { FaImage } from "react-icons/fa";
import { useUser } from '@clerk/nextjs';

export default function Input() {
  const { user, isSignedIn, isLoaded } = useUser();
  const IMAGEFILEREF = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  if (!user || !isSignedIn || !isLoaded) {
    return null;
  }

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Ibrahim"); 
      formData.append("cloud_name", "dpz0exww7"); // Replace with your Cloudinary cloud name

      
      
      try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dpz0exww7/image/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (data.secure_url) {
          alert(`Image uploaded successfully: ${data.secure_url}`);
        }
      } catch (error) {
        console.error("Error uploading the image", error);
      }
    }
  };

  return (
    <div className="flex flex-col p-4 border rounded-lg shadow-lg bg-white w-full max-w-md space-y-4">
      <textarea
        rows={2}
        className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Write your post..."
      />

      {selectedImage && (
        <div className="relative">
          <img src={selectedImage} alt="Uploaded" className="w-full rounded-lg shadow-md" />
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <FaImage
            size={24}
            color="red"
            onClick={() => IMAGEFILEREF.current.click()}
            className="cursor-pointer hover:scale-110"
          />
          <input
            hidden
            type="file"
            accept="image/*"
            ref={IMAGEFILEREF}
            onChange={handleUploadImage}
          />
        </div>
        <button className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
          Post
        </button>
      </div>
    </div>
  );
}
