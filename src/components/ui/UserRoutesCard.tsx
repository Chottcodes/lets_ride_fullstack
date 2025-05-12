"use client";
import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import BackButtonComponent from "../buttons/BackButtonComponent";
import MapsUserCards from "../mapsUserCards";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  CommentsModelRoute,
  LikesRoutesModel,
  RouteGetForCardTypes,
} from "../utils/Interface";
import { AddCommentRoute, AddLike } from "../utils/DataServices";

const UserRoutesCard = ({
  id,
  routeName,
  routeDescription,
  dateCreated,
  imageUrl,
  creator,
  likes,
  comments,
  pathCoordinates,
}: RouteGetForCardTypes) => {
  // State management
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isImageOpen, setIsImageOpen] = useState<boolean>(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");
  const [userId, setUserId] = useState<number>(0);
  const [likedRoutes, setLikedRoutes] = useState<Set<number>>(new Set());

  // Check if route is liked by current user
  const isLiked = useMemo(() => likedRoutes.has(id), [likedRoutes, id]);

  // Format date once
  const formattedDate = useMemo(
    () => new Date(dateCreated).toLocaleDateString("en-CA"),
    [dateCreated]
  );

  // Get trail coordinates for map
  const trailCoordinates = useMemo(
    () =>
      pathCoordinates.map(
        (coords) => [coords.longitude, coords.latitude] as [number, number]
      ),
    [pathCoordinates]
  );

  // Get starting point for map
  const startingPoint: [number, number] = useMemo(
    () => [pathCoordinates[0].longitude, pathCoordinates[0].latitude],
    [pathCoordinates]
  );

  // Load user ID from localStorage only once on component mount
  useEffect(() => {
    const storedId = localStorage.getItem("ID");
    if (storedId) setUserId(Number(storedId));
  }, []);

  // Handle likes with improved error handling
  const handleLike = useCallback(async () => {
    try {
      const likeObj: LikesRoutesModel = {
        UserId: userId,
        RouteId: id,
        IsDeleted: false,
      };

      if (userId === 0) {
        console.error("User not logged in");
        return;
      }

      const response = await AddLike(likeObj);

      if (response) {
        setLikedRoutes((prev) => {
          const newSet = new Set(prev);
          newSet.add(id);
          return newSet;
        });
      }
    } catch (error) {
      console.error("Error adding like:", error);
    }
  }, [userId, id]);

  // State for comments and loading states
  const [localComments, setLocalComments] = useState(comments || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Ref for comments container to scroll to bottom on new comments
  const commentsEndRef = useRef<HTMLDivElement>(null);

  // Update local comments when props change
  useEffect(() => {
    setLocalComments(comments || []);
  }, [comments]);

  // Auto-scroll to the newest comment when comments change
  const scrollToBottom = useCallback(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Scroll to bottom when comments are added
  useEffect(() => {
    if (localComments.length > 0 && isCommentsOpen) {
      scrollToBottom();
    }
  }, [localComments.length, isCommentsOpen, scrollToBottom]);

  // Handle comment submission with improved validation, error handling, and local state update
  const handleCommentSubmit = useCallback(async () => {
    if (!commentText?.trim()) return;

    try {
      if (userId === 0) {
        setSubmitError("You must be logged in to comment");
        return;
      }

      setIsSubmitting(true);
      setSubmitError("");

      const commentObj: CommentsModelRoute = {
        UserId: userId,
        RouteId: id,
        CommentText: commentText.trim(),
        IsDeleted: false,
      };

      const response = await AddCommentRoute(commentObj);

      if (response) {
        // Clear input after successful submission
        setCommentText("");

        // Add the new comment to the local state for immediate feedback
        // In a real app, you'd want to get the actual comment ID from the response
        const newComment = {
          id: Date.now(), // Temporary ID
          userId: userId,
          routeId: id,
          commentText: commentText.trim(),
          createdAt: new Date().toISOString(),
          user: {
            id: userId,
            userName: creator.userName, // Assuming the current user is the creator
            profilePicture: creator.profilePicture,
          },
        };

        setLocalComments((prev) => [...prev, newComment]);
      } else {
        setSubmitError("Failed to add comment. Please try again.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      setSubmitError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [commentText, userId, id, creator.userName, creator.profilePicture]);

  // Handle modal toggle with focus management
  const toggleModal = useCallback((state: boolean) => {
    setIsModalOpen(state);
    if (!state) {
      setIsCommentsOpen(false);
      setIsImageOpen(false);
    }
    // Prevent body scroll when modal is open
    document.body.style.overflow = state ? "hidden" : "";
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isImageOpen) {
          setIsImageOpen(false);
        } else if (isModalOpen) {
          toggleModal(false);
        }
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "";
    };
  }, [isModalOpen, isImageOpen, toggleModal]);

  // Card preview (collapsed state)
  if (!isModalOpen) {
    return (
      <article className="w-full h-full shadow-md rounded-lg border border-blue-500 flex flex-col overflow-hidden transition-all hover:shadow-lg bg-gray-900">
        {/* Map Section */}
        <header className="h-3/5 w-full relative">
          <MapsUserCards
            StartingPointcoordinates={startingPoint}
            zoom={10}
            trailCoordinates={trailCoordinates}
          />
        </header>

        {/* User info */}
        <section className="p-3 flex items-center gap-3">
          <Avatar className="h-10 w-10 rounded-full overflow-hidden">
            <AvatarImage
              src={creator.profilePicture}
              alt={`${creator.userName}'s profile`}
              className="object-cover w-full h-full"
            />
            <AvatarFallback className="bg-blue-700 text-white flex items-center justify-center">
              {creator.userName?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <p className="text-white text-sm font-medium">{creator.userName}</p>
        </section>

        {/* Route Info */}
        <main className="px-3 py-2 flex justify-between items-center text-white">
          <section className="flex gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLike();
              }}
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
              aria-label={isLiked ? "Unlike route" : "Like route"}
            >
              <Image
                src={
                  isLiked
                    ? "/assets/images/thumbs-up-blue.png"
                    : "/assets/images/card/thumbs-up.png"
                }
                width={16}
                height={16}
                alt="Like"
                className="w-4 h-4"
              />
              <span className="text-xs">{likes?.length || 0}</span>
            </button>

            <div className="flex items-center gap-1">
              <Image
                src="/assets/images/card/coment.png"
                width={16}
                height={16}
                alt="Comments"
                className="w-4 h-4"
              />
              <span className="text-xs">{comments?.length || 0}</span>
            </div>
          </section>

          <h3
            className="font-medium text-center truncate max-w-[40%]"
            title={routeName}
          >
            {routeName}
          </h3>

          <time
            className="text-xs text-gray-300"
            dateTime={new Date(dateCreated).toISOString()}
          >
            {formattedDate}
          </time>
        </main>

        {/* Action Button */}
        <footer className="p-3 pt-0 mt-auto">
          <button
            onClick={() => toggleModal(true)}
            className="w-full py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            More
          </button>
        </footer>
      </article>
    );
  }

  // Modal view (expanded state)
  return (
    <div
      className="fixed inset-0 z-50 bg-black lg:flex lg:justify-center bg-opacity-75 backdrop-blur-sm p-4 pt-6"
      onClick={() => toggleModal(false)}
    >
      <article
        className="w-full max-w-4xl h-[calc(100dvh-90px)] overflow-y-auto bg-gray-900 rounded-lg shadow-xl border border-blue-500  flex flex-col  md:pb-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with back button */}
        <header className="flex items-center p-3 border-b border-gray-800">
          <BackButtonComponent onClick={() => toggleModal(false)} />
          <h2 className="ml-4 text-white font-bold text-lg truncate">
            {routeName}
          </h2>
        </header>

        {/* Content area */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Left column - Image/Map and User Info */}
          <div className="md:w-1/2 flex flex-col">
            {/* Route Image */}
            <div
              className="relative h-48 md:h-72 cursor-pointer overflow-hidden"
              onClick={() => {
                setIsImageOpen(!isImageOpen);
                setIsModalOpen(true);
              }}
            >
              <Image
                src={imageUrl || "/assets/images/card/motorbike.png"}
                alt="Route preview"
                fill
                className="object-cover transition-transform hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* User and stats info */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 rounded-full overflow-hidden">
                  <AvatarImage
                    src={creator.profilePicture}
                    alt={creator.userName}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-blue-700 text-white flex items-center justify-center">
                    {creator.userName?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white text-sm font-medium">
                    {creator.userName}
                  </p>
                  <time
                    className="text-xs text-gray-400"
                    dateTime={new Date(dateCreated).toISOString()}
                  >
                    {formattedDate}
                  </time>
                </div>
              </div>

              <button
                onClick={handleLike}
                className="flex items-center gap-1 text-sm text-white"
                aria-label={isLiked ? "Unlike route" : "Like route"}
              >
                <Image
                  src={
                    isLiked
                      ? "/assets/images/thumbs-up-blue.png"
                      : "/assets/images/card/thumbs-up.png"
                  }
                  width={18}
                  height={18}
                  alt="Like"
                  className="w-5 h-5"
                />
                <span>{likes?.length || 0}</span>
              </button>
            </div>

            {/* Route Description */}
            <div
              className={`flex-1 p-4 overflow-y-auto ${
                isCommentsOpen ? "hidden md:block" : ""
              }`}
            >
              <h3 className="text-white font-medium mb-2">Description</h3>
              <p className="text-gray-300 text-sm whitespace-pre-line">
                {routeDescription}
              </p>
            </div>

            {/* Action button on mobile */}
            <div className="p-4 md:hidden">
              <button className="w-full py-3 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors text-white font-medium">
                Lets Ride
              </button>
            </div>
          </div>

          {/* Right column - Description/Comments toggle */}
          <div className="md:w-1/2 border-l border-gray-800 flex flex-col h-full max-h-full">
            {/* Comments/Description toggle */}
            <div className="flex border-b border-gray-800">
              <button
                onClick={() => setIsCommentsOpen(!isCommentsOpen)}
                className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
                  isCommentsOpen
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Comments ({comments?.length || 0})
              </button>
            </div>

            {/* Mobile Description (when not showing comments) */}
            <div
              className={`md:hidden flex-1 p-4 overflow-y-auto ${
                isCommentsOpen ? "hidden" : ""
              }`}
            >
              <p className="text-gray-300 text-sm whitespace-pre-line">
                {routeDescription}
              </p>
            </div>

            {/* Comments Section */}
            <div
              className={`flex-1 flex flex-col ${!isCommentsOpen ? "hidden md:flex" : ""}`}
            >
              {/* Comments List - Fixed for better scrollability */}
              <div className="flex-1 overflow-y-auto px-4 py-2 max-h-[300px]">
                <div className="flex-1 overflow-y-auto px-4 py-2">
                  {localComments && localComments.length > 0 ? (
                    <div className="space-y-4">
                      {localComments.map((comment, index) => (
                        <div key={index} className="flex gap-3 animate-fadeIn">
                          <Avatar className="h-8 w-8 flex-shrink-0 rounded-full overflow-hidden">
                            <AvatarImage
                              src={comment.user.profilePicture}
                              alt={comment.user.userName}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-blue-700 text-white flex items-center justify-center">
                              {comment.user.userName
                                ?.charAt(0)
                                ?.toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 max-w-full">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-white text-xs font-medium">
                                {comment.user.userName}
                              </p>
                              <time className="text-xs text-gray-400">
                                {comment.createdAt
                                  ? new Date(
                                      comment.createdAt
                                    ).toLocaleDateString("en-CA")
                                  : "Unknown Date"}
                              </time>
                            </div>
                            <div className="mt-1 text-gray-300 text-sm bg-gray-800 p-2 rounded-lg inline-block max-w-full break-words">
                              {comment.commentText}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full p-8">
                      <p className="text-gray-400 text-sm text-center">
                        No comments yet. Be the first to comment!
                      </p>
                    </div>
                  )}
                  <div ref={commentsEndRef} />
                </div>
              </div>

              {/* Comment Input */}
              <div className="p-3 border-t border-gray-800 bg-gray-900">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 flex-shrink-0 rounded-full overflow-hidden hidden sm:block">
                    <AvatarImage
                      src={creator.profilePicture}
                      alt="Your avatar"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-blue-700 text-white flex items-center justify-center">
                      {creator.userName?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleCommentSubmit();
                        }
                      }}
                      className="w-full py-2 px-3 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                    />
                    <button
                      onClick={handleCommentSubmit}
                      disabled={!commentText.trim() || isSubmitting}
                      aria-label="Send comment"
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full ${
                        commentText.trim() && !isSubmitting
                          ? "text-blue-500 hover:bg-gray-700"
                          : "text-gray-500"
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Image
                          src="/assets/images/send.png"
                          width={20}
                          height={20}
                          alt="Send"
                          className="w-5 h-5"
                        />
                      )}
                    </button>
                  </div>
                </div>
                {submitError && (
                  <p className="text-red-500 text-xs mt-1 text-center">
                    {submitError}
                  </p>
                )}
              </div>
            </div>

            {/* Desktop Action Button */}
            <div className="p-4 border-t border-gray-800 hidden md:block">
              <button className="w-full py-3 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Lets Ride
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Fullscreen Image Modal */}
      {isImageOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm"
          onClick={() => {
            setIsImageOpen(false);
          }}
        >
          <button
            className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsImageOpen(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div
            className="w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imageUrl || "/assets/images/card/motorbike.png"}
              alt="Route image full view"
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRoutesCard;
