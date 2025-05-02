"use client";

import React, { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { AddGalleryPost } from "../utils/Interface";
import { addGalleryPost } from "../utils/DataServices";




interface CardPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OpenPostModal = ({ isOpen, onClose }: CardPostModalProps) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [titleInput, setTitleInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  console.log(isOpen)
  console.log(onClose)
  useEffect(() => {
    const storedId = localStorage.getItem("ID");
    if (storedId) setUserId(Number(storedId));
  }, []);

  const handleImagePost = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    if (userId !== null) {
      try {
        const imageRef = ref(storage, `gallerypicture/${userId}_${file.name}`);
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        setImage(url);
        console.log("Uploaded image URL:", url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  // if (!userId || !image || !titleInput || !descriptionInput) {
  //   alert("Please fill out all fields and upload an image.");

  //   return;
  // }
  const handleSubmit = async () => {

    if(image)
    {
    const inputFieldObj: AddGalleryPost = {
      ImageUrl: image,
      Title: titleInput,
      Description: descriptionInput,
      IsDeleted: false
      
    }
      const res = await addGalleryPost(inputFieldObj);
      if(res) console.log("Post created:", res);
    }
    resetModal();
  };

  const resetModal = () => {
    setOpenModal(false);
    setImage(null);
    setImagePreview(null);
    setTitleInput("");
    setDescriptionInput("");
  };

  return (
    <>
      {/* Open Modal Button */}
      <div className="flex justify-center mt-10">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={() => setOpenModal(true)}
        >
          + Upload Image / Route
        </button>
      </div>

      {/* Modal */}
      {openModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
          onClick={resetModal}
        >
          <div
            className="bg-white text-black p-6 rounded-xl w-full max-w-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Upload Image or Route</h2>

            {imagePreview && (
              <div className="mb-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-[250px] object-cover rounded border"
                />
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
