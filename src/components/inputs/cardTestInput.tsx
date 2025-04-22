"use client";

import React, { useState } from "react";
import { getUserPostData } from "../utils/DataServices";
import { IUserCardType } from "../utils/Interface";


const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost: IUserCardType = {
      id: 0, // backend will assign
      creatorId: 101, // from log in
      imageUrl,
      title,
      description,
      dateCreated: new Date().toISOString(),
      isDeleted: false,
      likes: [],
      comments: [],
    };

    const response = await getUserPostData(newPost);
    if (response?.success) {
      alert("Post created!");
      setTitle("");
      setDescription("");
      setImageUrl("");
    } else {
      alert("Failed to post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-slate-500 rounded shadow">
      <h2 className="text-white text-xl mb-4">New Ride Post</h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full mb-2 p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="w-full mb-2 p-2 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        className="w-full mb-2 p-2 rounded"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit Post
      </button>
    </form>
  );
};

export default CreatePostForm;
