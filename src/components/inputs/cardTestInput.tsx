"use client";

import React, { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { InputField } from "../utils/Interface";
import { getUserPostData } from "../utils/DataServices";

interface CardPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OpenPostModal = ({ isOpen, onClose }: CardPostModalProps) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [titleInput, setTitleInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  // if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!userId || !image || !titleInput || !descriptionInput) {
      alert("Please fill out all fields and upload an image.");
      return;
    }

    const inputFieldObj: InputField = {
      creatorId: userId,
      imageUrl: image,
      title: titleInput,
      description: descriptionInput,
      IsDeleted: false,
    };

    const res = await getUserPostData(inputFieldObj);
    console.log("Post created:", res);

    setOpenModal(false); // Close modal after submit
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const storedId = localStorage.getItem("ID");
    if (storedId) setUserId(Number(storedId));
  }, []);

  const handleImagePost = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    try {
      if (file && userId !== null) {
        const imageRef = ref(storage, `gallerypicture/${userId}_${file.name}`);
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        setImage(url);
        console.log("Uploaded profile picture URL:", url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Open Modal Button */}
      <div className="flex justify-center mt-10">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={handleOpenModal}
        >
          + Upload Image
        </button>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded-xl w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">Upload Image</h2>
            <input
              type="file"
              onChange={handleImagePost}
              className="mb-2 w-full"
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
                onClick={handleCloseModal}
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
