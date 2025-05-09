"use client";

import React, { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { AddGalleryPost, AddVideoTypes } from "../utils/Interface";
import { addGalleryPost, AddVideo } from "../utils/DataServices";
import { Switch } from "../ui/switch";
interface OpenPostModalProps {
  isPosted: (value: boolean) => void;
}

const OpenPostModal: React.FC<OpenPostModalProps> = ({ isPosted }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [titleInput, setTitleInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isVideo, setIsVideo] = useState<boolean>(false);
  useEffect(() => {
    const storedId = localStorage.getItem("ID");
    if (storedId) setUserId(Number(storedId));
  }, []);

  const handleImagePost = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // const isImageFile = file.type.startsWith("image/");
    // const isVideoFile = file.type.startsWith("video/");

    // if (isVideo && !isVideoFile) {
    //   alert("Please upload a valid video file.");
    //   return;
    // }

    // if (!isVideo && !isImageFile) {
    //   alert("Please upload a valid image file.");
    //   return;
    // }
    const maxFileSize = 20 * 1024 * 1024;
    if (file.size > maxFileSize) {
      alert("File size must be under 20MB.");
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    if (previewUrl) {
      setPreview(previewUrl);
      setFile(file);
    }
  };

  // if (!userId || !image || !titleInput || !descriptionInput) {
  //   alert("Please fill out all fields and upload an image.");

  //   return;
  // }
  const handleSubmit = async () => {
    if (file && userId !== null) {
      try {
        const uploadRef = isVideo
          ? ref(storage, `galleryvideos/${userId}_${file.name}`)
          : ref(storage, `gallerypicture/${userId}_${file.name}`);
        await uploadBytes(uploadRef, file);
        const downloadURL = await getDownloadURL(uploadRef);
        if (isVideo) {
          
          const inputFieldObj: AddVideoTypes = {
            VideoUrl: downloadURL,
            CreatorId: userId,
            Title: titleInput,
            IsDeleted: false,
          };
          const res = await AddVideo(inputFieldObj);
          if (res) {
            console.log("Video post created:", res);
            isPosted(true);
          }
        } else {
          const inputFieldObj: AddGalleryPost = {
            ImageUrl: downloadURL,
            CreatorId: userId,
            Title: titleInput,
            Description: descriptionInput,
            IsDeleted: false,
          };
          const res = await addGalleryPost(inputFieldObj);
          if (res) {
            console.log("Image post created:", res);
            isPosted(true);
          }
        }
  
        resetModal();
      } catch (error) {
        console.error("Error uploading file or posting:", error);
      }
    } else {
      alert("Missing file or user ID");
    }
  };

  const resetModal = () => {
    setIsOpen(false);
    
    setPreview(null);
    setTitleInput("");
    setDescriptionInput("");
  };

  return (
    <>
      {/* Open Modal Button */}
      <div className="flex justify-center">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={() => setIsOpen(true)}
        >
          Upload
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
          onClick={resetModal}
        >
          <div
            className="bg-white text-black p-6 rounded-xl w-full max-w-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Upload Image or Route</h2>

            {preview && (
              <div className="mb-4">
                {isVideo ? (
                  <video
                    controls
                    src={preview}
                    className="w-full h-[250px] object-contain rounded border"
                  />
                ) : (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-[250px] object-contain rounded border"
                  />
                )}
              </div>
            )}

            <input
              type="file"
              onChange={handleImagePost}
              className="mb-2 w-full cursor-pointer file:cursor-pointer file:rounded file:border file:border-gray-300 file:px-4 file:py-2 file:bg-white file:hover:bg-blue-50 file:text-sm file:text-gray-700 transition"
            />

            <input
              type="text"
              placeholder="Title"
              className="w-full mb-2 p-2 rounded border"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />

            <textarea
              placeholder="Description"
              className="w-full mb-2 p-2 rounded border"
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
            />
            <div className="w-full h-[20%] flex items-center gap-2 ">
              <Switch
                checked={isVideo}
                onCheckedChange={(checked: boolean) => setIsVideo(checked)}
              />
              {isVideo ? "Video" : "Image"}
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={resetModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OpenPostModal;
