"use client";
import React, { useRef, useState } from "react";
import { FaImage } from "react-icons/fa";
import axios from "axios";

export default function ImageUploader() {
  const IMAGEFILEREF = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default");
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dpz0exww7/image/upload",
          formData
        );

        console.log("Uploaded Image URL:", response.data.secure_url);
        alert("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Image upload failed.");
      }
    }
  };

  return (
    <div className="flex flex-col p-4 border rounded-lg shadow-lg bg-white w-full max-w-md space-y-4">
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
      </div>
    </div>
  );
}
