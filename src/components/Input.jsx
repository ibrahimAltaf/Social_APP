"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";

export default function Input() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [selectedImage, setSelectedImage] = useState(null);
  const [input, setInput] = useState("");
  const [postLoading, setPostLoading] = useState(false);

  if (!user || !isSignedIn || !isLoaded) {
    return null;
  }

  const handleUpload = (result) => {
    if (result.event === "success") {
      setSelectedImage(result.info.secure_url);
    }
  };

  const handleSubmit = async () => {
    setPostLoading(true);

    const response = await fetch(`/api/post/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userMongoId: user.publicMetadata.userMongoId,
        name: user.fullName,
        username: user.username,
        text: input, 
        profileImg: user.imageUrl,
        image: selectedImage, 
      }),
    });

    setPostLoading(false);
    setInput("");
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col p-4 border rounded-lg shadow-lg bg-white w-full max-w-md space-y-4">
      <textarea
        rows={2}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Write your post..."
      />

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
        <CldUploadWidget uploadPreset="CLASS_NEW" onUpload={handleUpload}>
          {({ open }) => (
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              onClick={() => open()}
            >
              Upload an Image
            </button>
          )}
        </CldUploadWidget>

        <button
          onClick={handleSubmit}
          disabled={input.trim() === "" || postLoading}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          {postLoading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}
