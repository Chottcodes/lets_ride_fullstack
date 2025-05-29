"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, MessageCircle, X, ZoomIn, ZoomOut, Info, Trash } from "lucide-react";
import {
  CommentsModelGallery,
  GalleryComments,
  IUserCardType,
  LikesGalleryModel,
} from "../utils/Interface";
import {
  AddCommentGallery,
  AddGalleryLike,
  GetGalleryComments,
  RemoveGalleryLike,
  RemoveGalleryPost,
} from "../utils/DataServices";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserCardsPost = (props: IUserCardType) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFullImage, setIsFullImage] = useState<boolean>(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [userComment, setUserComment] = useState<string>("");
  const [userId, setUserId] = useState<number>(0);
  const [comments, setComments] = useState<GalleryComments[]>([]);
  const [likeCount, setLikeCount] = useState<number>(props.likeCount || 0);
  const [showLoginTooltip, setShowLoginTooltip] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  
  useEffect(() => {
    const storedId = localStorage.getItem("ID");
    if (storedId) setUserId(Number(storedId));
  }, []);

  // Set initial like state
  useEffect(() => {
    if (props.isLikedByCurrentUser) {
      setIsLiked(true);
    }
  }, [props.isLikedByCurrentUser]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      const galleryComments = await GetGalleryComments(props.id);
      if (galleryComments) {
        setComments(galleryComments);
      }
    };
    
    // Fetch comments when modal is opened or comment is posted
    if (isModalOpen || isCommentsOpen) {
      fetchComments();
    }
  }, [isModalOpen, isCommentsOpen, props.id]);

  const handleCommentSubmit = async () => {
    if (!userId) {
      setShowLoginTooltip(true);
      setTimeout(() => setShowLoginTooltip(false), 3000);
      return;
    }

    if (userComment.trim()) {
      const commentObj: CommentsModelGallery = {
        UserId: userId,
        GalleryPostId: props.id,
        CommentText: userComment,
        IsDeleted: false,
      };
      
      const response = await AddCommentGallery(commentObj);
      if (response) {
        setUserComment("");
        const updatedComments = await GetGalleryComments(props.id);
        setComments(updatedComments);
      }
    }
  };

  const handleLikeToggle = async () => {
    if (!userId) {
      setShowLoginTooltip(true);
      setTimeout(() => setShowLoginTooltip(false), 3000);
      return;
    }

    if (isLiked) {
      const success = await RemoveGalleryLike(userId, props.id);
      if (success) {
        setIsLiked(false);
        setLikeCount((prev) => Math.max(0, prev - 1));
      }
    } else {
      const likeObj: LikesGalleryModel = {
        UserId: userId,
        GalleryPostId: props.id,
        IsDeleted: false,
      };
      
      const response = await AddGalleryLike(likeObj);
      if (response) {
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    }
  };

  const handleDeletePost = async () => {
    try {
      const response = await RemoveGalleryPost(props.id);
      if (response) {
        // Close both modals
        setShowDeleteConfirm(false);
        setIsModalOpen(false);
        // Refresh the page to show updated posts
        window.location.reload();
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const formatDate = (dateString:string) => {
    return new Date(dateString).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Main Card */}
      <div className="w-full bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-blue-500/30 border border-gray-800 hover:border-blue-500/50">
        {/* Image Container */}
        <div 
          className="relative aspect-[3/2] overflow-hidden cursor-pointer group"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start justify-end p-3">
            <ZoomIn className="text-white/80 w-6 h-6" />
          </div>
          
          <Image
            src={props.imageUrl}
            alt={props.caption || "Gallery image"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        {/* User Info & Caption */}
        <div className="px-4 pt-3 pb-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src={props.profilePicture} alt={props.creatorName} />
                <AvatarFallback>{props.creatorName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-200">@{props.creatorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{formatDate(props.dateCreated)}</span>
              {userId === props.creatorId && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteConfirm(true);
                  }}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="Delete post"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          {/* Caption and Description */}
          <div className="mt-3">
            {props.caption && (
              <h3 className="text-base font-medium text-gray-200">{props.caption}</h3>
            )}
            {props.description && (
              <p className="mt-1 text-sm text-gray-400">{props.description}</p>
            )}
          </div>
        </div>
        
        {/* Interaction Bar */}
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-800 mt-2">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                className="flex items-center space-x-1 group"
                onClick={handleLikeToggle}
                aria-label={isLiked ? "Unlike" : "Like"}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isLiked 
                      ? "text-blue-500 fill-blue-500" 
                      : "text-gray-400 group-hover:text-gray-200"
                  } transition-colors duration-200`}
                />
                <span className="text-sm text-gray-300">{likeCount}</span>
              </button>
              
              {showLoginTooltip && userId === 0 && (
                <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-gray-800 text-xs text-white rounded shadow-lg z-50">
                  Please login or signup to like this post
                </div>
              )}
            </div>
            
            <button
              className="flex items-center space-x-1 group"
              onClick={() => setIsModalOpen(true)}
              aria-label="View comments"
            >
              <MessageCircle className="h-5 w-5 text-gray-400 group-hover:text-gray-200" />
              <span className="text-sm text-gray-300">{props.commentCount}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal View */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div 
            className={`bg-gray-900 rounded-lg overflow-hidden shadow-xl max-w-4xl w-full max-h-[90vh] ${
              isFullImage ? 'p-0' : 'p-4'
            } relative flex flex-col`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 z-50 bg-gray-800/70 rounded-full p-1 text-gray-200 hover:text-white hover:bg-gray-700/80 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Image Section */}
            <div className={`relative ${isFullImage ? 'w-full h-screen' : 'max-h-[60vh]'} overflow-hidden`}>
              <button
                onClick={() => setIsFullImage(!isFullImage)}
                className="absolute right-12 z-50 bg-gray-800/70 rounded-full p-1 text-gray-200 hover:text-blue-800 hover:bg-gray-700/80 transition-colors cursor-pointer"
                aria-label={isFullImage ? "Zoom out" : "Zoom in"}
              >
                {isFullImage ? <ZoomOut className="h-5 w-5 " /> : <ZoomIn className="h-5 w-5" />}
              </button>

            {/* Delete Button */}
            {userId === props.creatorId && (
              <button 
                className="absolute right-12 top-10 z-50 bg-gray-800/70 rounded-full p-1 text-gray-200 hover:text-red-500 hover:bg-gray-700/80 transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteConfirm(true);
                }}
                title="Delete post">
                <Trash className="w-5 h-5"></Trash>
              </button>
            )}
            
              <div className={`relative ${isFullImage ? 'w-full h-screen' : 'w-full h-[60vh]'}`}>
                <Image
                  src={props.imageUrl}
                  alt={props.caption || "Gallery image"}
                  fill
                  className={`object-contain ${isFullImage ? 'object-contain ' : ''}`}
                  sizes="100vw"
                  priority
                />
              </div>
            </div>

            {!isFullImage && (
              <>
                {/* User Info & Caption */}
                <div className="py-4 border-b border-gray-800">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={props.profilePicture} alt={props.creatorName} />
                        <AvatarFallback>{props.creatorName?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-200">@{props.creatorName}</span>
                    </div>
                    <span className="text-sm text-gray-400">{formatDate(props.dateCreated)}</span>
                  </div>
                  
                  {/* Caption and Description */}
                  <div className="space-y-2">
                    {props.caption && (
                      <h3 className="text-lg font-medium text-gray-200">{props.caption}</h3>
                    )}
                    {props.description && (
                      <p className="text-gray-400">{props.description}</p>
                    )}
                  </div>
                </div>

                {/* Interaction Bar */}
                <div className="flex items-center space-x-6 py-3 border-b border-gray-800">
                  <div className="relative">
                    <button
                      className="flex items-center space-x-2 group"
                      onClick={handleLikeToggle}
                      aria-label={isLiked ? "Unlike" : "Like"}
                    >
                      <Heart
                        className={`h-6 w-6 ${
                          isLiked 
                            ? "text-blue-500 fill-blue-500" 
                            : "text-gray-400 group-hover:text-gray-200"
                        } transition-colors duration-200`}
                      />
                      <span className="text-gray-300">{likeCount}</span>
                    </button>
                    
                    {showLoginTooltip && userId === 0 && (
                      <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-gray-800 text-xs text-white rounded shadow-lg z-50 flex items-center">
                        <Info className="h-4 w-4 mr-1 text-blue-400" />
                        Please login or signup to like this post
                      </div>
                    )}
                  </div>
                  
                  <button
                    className="flex items-center space-x-2 group"
                    onClick={() => setIsCommentsOpen(!isCommentsOpen)}
                    aria-label={isCommentsOpen ? "Hide comments" : "Show comments"}
                  >
                    <MessageCircle className={`h-6 w-6 ${
                      isCommentsOpen ? "text-blue-500" : "text-gray-400 group-hover:text-gray-200"
                    }`} />
                    <span className="text-gray-300">
                      {comments.length > 0 ? comments.length : props.commentCount} comments
                    </span>
                  </button>
                </div>

                {/* Comments Section */}
                {isCommentsOpen && (
                  <div className="flex-1 overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-y-auto py-4 space-y-4 custom-scrollbar">
                      {comments.length > 0 ? (
                        comments.map((comment, index) => (
                          <div key={index} className="flex space-x-3 px-1">
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarImage 
                                src={comment.profilePictureUrl || "/assets/images/default-avatar.png"} 
                                alt={comment.username || "User"} 
                              />
                              <AvatarFallback>{(comment.username || "U").charAt(0)}</AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 bg-gray-800 rounded-lg p-3">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-gray-200">
                                  @{comment.username || "Unknown"}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {comment.dateCreated ? formatDate(comment.dateCreated) : ""}
                                </span>
                              </div>
                              <p className="text-gray-300 text-sm break-words">{comment.commentText}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-400">
                          No comments yet. Be the first to comment!
                        </div>
                      )}
                    </div>
                    
                    {/* Comment Input */}
                    <div className="mt-auto border-t border-gray-800 pt-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src={props.profilePicture} alt="Your avatar" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        
                        <div className="relative flex-1">
                          <input
                            type="text"
                            value={userComment}
                            onChange={(e) => setUserComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="w-full bg-gray-800 rounded-full px-4 py-2 text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleCommentSubmit();
                              }
                            }}
                          />
                          
                          {showLoginTooltip && userId === 0 && (
                            <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-gray-800 text-xs text-white rounded shadow-lg z-50 flex items-center">
                              <Info className="h-4 w-4 mr-1 text-blue-400" />
                              Please login or signup to comment
                            </div>
                          )}
                        </div>
                        
                        <button
                          onClick={handleCommentSubmit}
                          disabled={!userComment.trim()}
                          className={`px-4 py-2 rounded-full ${
                            userComment.trim() 
                              ? 'bg-blue-600 text-white hover:bg-blue-700' 
                              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          } transition-colors`}
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-gray-900 rounded-lg p-6 max-w-sm w-full shadow-xl border border-gray-800">
            <h3 className="text-xl font-semibold text-white mb-4">Delete Post?</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePost}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserCardsPost;