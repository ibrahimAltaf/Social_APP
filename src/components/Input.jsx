"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
import { FaImage } from "react-icons/fa";

export default function UploadHandler() {
  const IMAGEFILEREF = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

  // Cloudinary Configuration
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dpz0exww7/image/upload";
  const CLOUDINARY_PRESET = "products"; 

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_PRESET);

      try {
        const response = await axios.post(CLOUDINARY_URL, formData);
        setUploadedUrl(response.data.secure_url);
        alert("Image Uploaded Successfully!");
      } catch (error) {
        console.error("Upload Error:", error);
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

      {uploadedUrl && (
        <p className="text-green-600">Uploaded Image URL: {uploadedUrl}</p>
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
