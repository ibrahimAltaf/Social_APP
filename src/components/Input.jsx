"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";

export default function Input() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [selectedImage, setSelectedImage] = useState(null);

  if (!user || !isSignedIn || !isLoaded) {
    return null;
  }

  return (
    <div className="flex flex-col p-4 border rounded-lg shadow-lg bg-white w-full max-w-md space-y-4">
      {/* Text Area */}
      <textarea
        rows={2}
        className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Write your post..."
      />

      {/* Image Preview (Text Area ke neeche) */}
      {selectedImage && (
        <div className="relative mt-2">
          <img
            src={selectedImage}
            alt="Uploaded"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        {/* Cloudinary Image Upload */}
        <CldUploadWidget
          uploadPreset="CLASS_NEW"
          onUpload={(result) => setSelectedImage(result.info.secure_url)}
        >
          {({ open }) => (
            <button
              style={{ width: "200px", height: "40px" }}
              onClick={() => open()}
            >
              Upload an Image
            </button>
          )}
        </CldUploadWidget>

        <button className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
          Post
        </button>
      </div>
    </div>
  );
}
