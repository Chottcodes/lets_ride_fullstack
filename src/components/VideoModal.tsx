"use client";
import React, { useState } from "react";

interface VideoModalProps {
  videoUrl: string;
  videoId: number|null; 
  onClose: () => void;
}

interface Comment {
  id: number;
  text: string;
  likes: number;
}

const VideoModal = ({ videoUrl, videoId, onClose }: VideoModalProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [likes, setLikes] = useState<number>(0);
  const [showComments, setShowComments] = useState<boolean>(false);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: comments.length + 1, text: newComment, likes: 0 },
      ]);
      setNewComment(""); 
    }
  };

  const handleLikeComment = (id: number) => {
    setComments(
      comments.map((comment) =>
        comment.id === id
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  const handleVideoLike = () => {
    setLikes(likes + 1); // Increment video like count
    // You could send the like to the backend for storage here
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="w-[90vw] h-[90vh] max-w-[600px] relative bg-white rounded-lg p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fullscreen video */}
        <video
          src={videoUrl}
          controls
          autoPlay
          className="w-full h-[60%] object-contain rounded-lg"
        />

        <button
          className="absolute top-2 right-2 text-white text-2xl cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Video Like Button */}
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={handleVideoLike}
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            👍 {likes} Likes
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="p-2 bg-green-500 text-white rounded-md"
          >
            💬 Comments
          </button>
        </div>

        {/* Comment Section */}
        {showComments && (
          <div className="mt-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleAddComment}
              className="mt-2 p-2 bg-blue-500 text-white rounded-md"
            >
              Post Comment
            </button>

            {/* Comments List */}
            <div className="mt-4 space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="flex justify-between items-center">
                  <p className="text-sm">{comment.text}</p>
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    className="text-blue-500 text-sm"
                  >
                    👍 {comment.likes}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoModal;
