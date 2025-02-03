"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
import { FaImage } from "react-icons/fa";

export default function CloudinaryImageUploader() {
  const IMAGEFILEREF = useRef(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dpz0exww7/image/upload";
  const UPLOAD_PRESET = "your_upload_preset"; // Replace with your Cloudinary preset

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const response = await axios.post(CLOUDINARY_URL, formData);
        setUploadedImageUrl(response.data.secure_url);
        alert("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="flex flex-col p-4 border rounded-lg shadow-lg bg-white w-full max-w-md space-y-4">
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

      {uploadedImageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={uploadedImageUrl} alt="Uploaded" className="w-full rounded-lg shadow-md" />
        </div>
      )}
    </div>
  );
}
