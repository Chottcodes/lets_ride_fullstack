"use client"

import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { IUserCardType } from "../utils/Interface";
import { getUserPostData } from "../utils/DataServices";

const CardPostModal = ({
  userId,
  isOpen,
  onClose,
}: {
  userId: number;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    const imageRef = ref(storage, `galleryImages/${userId}_${file.name}`);
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);
    setImageUrl(url);
  };

  const handleSubmit = async () => {
    const newPost: IUserCardType = {
      id: 0,
      creatorId: userId,
      imageUrl,
      title,
      description,
      dateCreated: new Date().toISOString(),
      isDeleted: false,
      likes: [],
      comments: [],
    };

    const res = await getUserPostData(newPost);
    if (res?.success) {
      alert("Post uploaded!");
      setTitle("");
      setDescription("");
      setImageUrl("");
      onClose();
    } else {
      alert("Failed to post.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
      <div className="bg-white text-black p-6 rounded-xl w-full max-w-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">Create Ride Post</h2>
        <input type="file" onChange={handleImageUpload} className="mb-2 w-full" />
        <input
          type="text"
          placeholder="Title"
          className="w-full mb-2 p-2 rounded border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full mb-2 p-2 rounded border"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded"
            onClick={onClose}
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
  );
};

export default CardPostModal;
