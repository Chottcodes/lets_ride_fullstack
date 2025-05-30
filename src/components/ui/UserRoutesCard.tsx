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
  GetRoutes,
  LikesRoutesModel,
  RouteComment,
} from "../utils/Interface";
import {
  AddCommentRoute,
  AddLike,
  GetRouteComment,
  RemoveRouteLike,
} from "../utils/DataServices";
import { useProfilePicture } from "@/hooks/useProfilePicture";
import { useRouter } from "next/navigation";
import { Heart, MessageSquareMore, Maximize2 } from "lucide-react";

const UserRoutesCard = ({
  id,
  title,
  routeDescription,
  likeCount,
  dateCreated,
  creatorName,
  pathCoordinates,
  profilePicture,
  isLikedByCurrentUser,
  commentCount,
}: GetRoutes) => {
  // State management
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isImageOpen, setIsImageOpen] = useState<boolean>(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);
  const [isMapFullscreen, setIsMapFullscreen] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [showCToolTip, setShowCToolTip] = useState<boolean>(false);

  const [commentText, setCommentText] = useState<string>("");
  const [userId, setUserId] = useState<number>(0);
  const [likedCount, setLikedCount] = useState<number>(0);
  const [likedRoutes, setLikedRoutes] = useState<Set<number>>(new Set());
  const [localComments, setLocalComments] = useState<RouteComment[]>([]);
  const { push } = useRouter();

  const isLiked = useMemo(() => likedRoutes.has(id), [likedRoutes, id]);

  const profilePictures = useProfilePicture();

  const getComments = async () => {
    try {
      const comments: RouteComment[] = await GetRouteComment(id);
      setLocalComments(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      getComments();
    }
  }, [isModalOpen]);
  
  useEffect(() => {
    setLikedCount(likeCount);
    if (isLikedByCurrentUser) {
      setLikedRoutes(new Set([id]));
    }
  }, [id, isLikedByCurrentUser, likeCount]);

  const trailCoordinates = useMemo(
    () =>
      pathCoordinates.map(
        (coords) => [coords.longitude, coords.latitude] as [number, number]
      ),
    [pathCoordinates]
  );

  const startingPoint: [number, number] = useMemo(
    () => [pathCoordinates[0].longitude, pathCoordinates[0].latitude],
    [pathCoordinates]
  );

  useEffect(() => {
    const storedId = localStorage.getItem("ID");
    if (storedId) setUserId(Number(storedId));
  }, []);

  const handleLike = useCallback(async () => {
    if (userId === 0) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
      return;
    }
    try {
      const likeObj: LikesRoutesModel = {
        UserId: userId,
        RouteId: id,
        IsDeleted: false,
      };
      if (isLiked) {
        const response = await RemoveRouteLike(userId, id);
        if (response) {
          setLikedRoutes((prev) => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
          });
          setLikedCount((prev) => prev - 1);
        }
      } else {
        const response = await AddLike(likeObj);
        if (response) {
          setLikedRoutes((prev) => {
            const newSet = new Set(prev);
            newSet.add(id);
            return newSet;
          });
          setLikedCount((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.error("Error adding like:", error);
    }
  }, [userId, id, isLiked]);

  const HandleRemoveRouteLike = async () => {
    if (userId) {
      try {
        const res = await RemoveRouteLike(userId, id);
        if (res) {
          console.log("success");
          setLikedRoutes((prev) => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
          });

          setLikedCount((prev) => prev - 1);
        } else {
          console.log("failed");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  const formatDate = (date: string | Date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const commentsEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleCommentSubmit = useCallback(async () => {
    if (userId <= 0) {
      setShowCToolTip(true);
      setTimeout(() => setShowCToolTip(false), 3000);
      return;
    }

    setIsSubmitting(true);

    try {
      const commentOBJ: CommentsModelRoute = {
        UserId: userId,
        RouteId: id,
        CommentText: commentText,
        IsDeleted: false,
      };
      console.log(commentOBJ);

      const response = await AddCommentRoute(commentOBJ);

      if (response) {
        setCommentText("");
        getComments();
        scrollToBottom();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [userId, id, commentText, scrollToBottom]);

  const toggleModal = useCallback((state: boolean) => {
    setIsModalOpen(state);
    if (!state) {
      setIsCommentsOpen(false);
      setIsImageOpen(false);
      setIsMapFullscreen(false);
    }

    document.body.style.overflow = state ? "hidden" : "";
  }, []);

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isMapFullscreen) {
          setIsMapFullscreen(false);
        } else if (isImageOpen) {
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
  }, [isModalOpen, isImageOpen, isMapFullscreen, toggleModal]);

  if (!isModalOpen) {
    return (
      <article className="w-full h-full rounded-lg shadow-lg transition-all duration-300 hover:shadow-blue-500/30 border border-gray-800 hover:border-blue-500/50 flex flex-col overflow-hidden hover:shadow-lg bg-gray-900">
        {/* Map Section */}
        <header className="h-50 w-full relative">
          <MapsUserCards
            StartingPointcoordinates={startingPoint}
            zoom={9}
            trailCoordinates={trailCoordinates}
          />
        </header>

        {/* User info */}
        <section className="p-3 flex items-center gap-3">
          <Avatar className="h-5 w-5 rounded-full overflow-hidden">
            <AvatarImage
              src={
                profilePicture
                  ? profilePicture
                  : "/assets/images/defaultPicture.png"
              }
              alt={`${creatorName}'s profile`}
              className="object-cover w-full h-full"
            />
            <AvatarFallback className="bg-blue-700 text-white flex items-center justify-center">
              {creatorName?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <p className="text-white text-sm font-medium">{creatorName}</p>
        </section>

        {/* Route Info */}
        <main className="px-3 py-2 flex justify-between items-center text-white">
          <section className="flex gap-4">
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (isLiked) {
                    HandleRemoveRouteLike();
                  } else {
                    handleLike();
                  }
                }}
                className="flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer"
                aria-label={isLiked ? "Unlike route" : "Like route"}
              >
                <Heart
                  className={`transition-colors ${
                    isLiked ? "text-blue-600" : "text-white"
                  }`}
                />
                <span className="text-xs">{likedCount}</span>
              </button>

              {showTooltip && (
                <div className="absolute bottom-full mb-3 left-40 lg:left-20 transform -translate-x-1/2 z-50 animate-fade-in">
                  <div className="relative bg-gray-900 border-1 border-white text-white text-xs px-3 py-2 rounded-md shadow-lg min-w-[300px] text-center">
                    Please{" "}
                    <span
                      onClick={() => {
                        push("/pages/Login/loginPage");
                      }}
                      className="underline text-blue-200 cursor-pointer"
                    >
                      log in
                    </span>{" "}
                    or{" "}
                    <span
                      onClick={() => {
                        push("/pages/Login/loginPage");
                      }}
                      className="underline text-blue-200 cursor-pointer"
                    >
                      sign up
                    </span>{" "}
                    to like a route
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900"></div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <MessageSquareMore className="text-white" />
              <span>{commentCount}</span>
            </div>
          </section>

          <h3
            className="font-medium text-center truncate max-w-[40%]"
            title={title}
          >
            {title}
          </h3>

          <time
            className="text-xs text-gray-300"
            dateTime={new Date(dateCreated).toISOString()}
          >
            {formatDate(dateCreated)}
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
        className="w-full max-w-4xl h-[calc(100dvh-40px)] overflow-y-auto bg-gray-900 rounded-lg shadow-xl border border-blue-500 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with back button */}
        <header className="flex items-center p-3 border-b border-gray-800 flex-shrink-0">
          <BackButtonComponent onClick={() => toggleModal(false)} />
          <h2 className="ml-4 text-white font-bold text-lg truncate">
            {title}
          </h2>
        </header>

        {/* Content area - Fixed height structure for mobile */}
        <div className="flex flex-col md:flex-row flex-1 min-h-0">
          {/* Left column - Image/Map and User Info */}
          <div className="md:w-1/2 flex flex-col min-h-0">
            {/* Route Map */}
            <div
              className="relative h-48 md:h-96 cursor-pointer overflow-hidden group flex-shrink-0"
              onClick={() => {
                setIsMapFullscreen(true);
              }}
            >
              <MapsUserCards
                StartingPointcoordinates={startingPoint}
                zoom={9}
                trailCoordinates={trailCoordinates}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Fullscreen button overlay */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMapFullscreen(true);
                  }}
                  className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
                  aria-label="View map in fullscreen"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
              
              {/* Click hint */}
              <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="bg-black/60 text-white text-xs px-2 py-1 rounded">
                  Click to expand map
                </span>
              </div>
            </div>

            {/* User and stats info */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800 flex-shrink-0">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 rounded-full overflow-hidden">
                  <AvatarImage
                    src={profilePicture ? profilePicture : ""}
                    alt={creatorName}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-blue-700 text-white flex items-center justify-center">
                    {creatorName?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white text-sm font-medium">
                    {creatorName}
                  </p>
                  <time
                    className="text-xs text-gray-300"
                    dateTime={new Date(dateCreated).toISOString()}
                  >
                    {formatDate(dateCreated)}
                  </time>
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isLiked) {
                      HandleRemoveRouteLike();
                    } else {
                      handleLike();
                    }
                  }}
                  className="flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer"
                  aria-label={isLiked ? "Unlike route" : "Like route"}
                >
                  <Heart
                    className={`transition-colors ${
                      isLiked ? "text-blue-600" : "text-white"
                    }`}
                  />
                  <span className="text-xs text-white">{likedCount}</span>
                </button>

                {showTooltip && (
                  <div className="absolute bottom-full mb-3 lg:left-1 transform -translate-x-65 lg:-translate-x-1/2 z-50 animate-fade-in">
                    <div className="relative bg-gray-900 border-1 border-white text-white text-xs px-3 py-2 rounded-md shadow-lg min-w-[300px] text-center">
                      Please{" "}
                      <span
                        onClick={() => {
                          push("/pages/Login/loginPage");
                        }}
                        className="underline text-blue-200 cursor-pointer"
                      >
                        log in
                      </span>{" "}
                      or{" "}
                      <span
                        onClick={() => {
                          push("/pages/Login/loginPage");
                        }}
                        className="underline text-blue-200 cursor-pointer"
                      >
                        sign up
                      </span>{" "}
                      to like a route
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Route Description - Hidden on mobile when comments are open */}
            <div className={`flex-1 p-4 overflow-y-auto min-h-0 ${isCommentsOpen ? "hidden md:block" : ""}`}>
              <h3 className="text-white font-medium mb-2 hidden lg:block">Description</h3>
              <h3 className="text-white font-medium mb-2 lg:hidden">Title</h3>
              <p className="text-gray-300 text-sm whitespace-pre-line lg:hidden">
                {title ? title : "No title provided."}
              </p>
              <p className="text-gray-300 text-sm whitespace-pre-line hidden lg:block">
                {routeDescription ? routeDescription : "No description provided."}
              </p>
            </div>
          </div>

          {/* Right column - Comments Section */}
          <div className="md:w-1/2 border-l border-gray-800 flex flex-col min-h-0">
            {/* Comments/Description toggle - Always visible */}
            <div className="flex border-b border-gray-800 flex-shrink-0">
              <button
                onClick={() => setIsCommentsOpen(false)}
                className={`flex-1 py-3 text-center text-sm font-medium transition-colors md:hidden ${
                  !isCommentsOpen
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setIsCommentsOpen(true)}
                className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
                  isCommentsOpen
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Comments ({commentCount})
              </button>
            </div>

            {/* Mobile Description (when not showing comments) */}
            <div className={`flex-1 p-4 overflow-y-auto min-h-0 md:hidden ${isCommentsOpen ? "hidden" : ""}`}>
              <p className="text-gray-300 text-sm whitespace-pre-line">
                {routeDescription}
              </p>
            </div>

            {/* Comments Section - Always visible on desktop, toggleable on mobile */}
            <div className={`flex-1 flex flex-col min-h-0 ${!isCommentsOpen ? "hidden md:flex" : ""}`}>
              {/* Comments List */}
              <div className="flex-1 overflow-y-auto px-4 py-2 min-h-0">
                {localComments && localComments.length > 0 ? (
                  <div className="space-y-4">
                    {localComments.map((comment, index) => (
                      <div key={index} className="flex gap-3 animate-fadeIn">
                        <Avatar className="h-8 w-8 flex-shrink-0 rounded-full overflow-hidden">
                          <AvatarImage
                            src={comment.profilePictureUrl}
                            alt={comment.username}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-blue-700 text-white flex items-center justify-center">
                            {comment.username?.charAt(0)?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 max-w-full">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-white text-xs font-medium">
                              {comment.username}
                            </p>
                            <time className="text-xs text-gray-400">
                              {comment.dateCreated ? (
                                formatDate(comment.dateCreated)
                              ) : (
                                "Unknown Date"
                              )}
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

              {/* Comment Input - Always visible when comments section is open */}
              <div className="p-3 border-t border-gray-800 bg-gray-900 relative flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 flex-shrink-0 rounded-full overflow-hidden hidden sm:block">
                    <AvatarImage
                      src={
                        profilePictures
                          ? profilePictures
                          : "/assets/images/defaultPicture.png"
                      }
                      alt="Your avatar"
                      className="object-contain"
                    />
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
                {showCToolTip && (
                  <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
                    <div className="relative bg-gray-900 border-1 border-white text-white text-xs px-3 py-2 rounded-md shadow-lg min-w-[300px] text-center">
                      Please{" "}
                      <span
                        onClick={() => {
                          push("/pages/Login/loginPage");
                        }}
                        className="underline text-blue-200 cursor-pointer"
                      >
                        log in
                      </span>{" "}
                      or{" "}
                      <span
                        onClick={() => {
                          push("/pages/Login/loginPage");
                        }}
                        className="underline text-blue-200 cursor-pointer"
                      >
                        sign up
                      </span>{" "}
                      to Comment
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Button - Fixed at bottom */}
        <div className="p-4 border-t border-gray-800 flex-shrink-0">
          <button className="w-full py-3 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Lets Ride
          </button>
        </div>
      </article>

      {/* Fullscreen Map Modal */}
      {isMapFullscreen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-95 backdrop-blur-sm"
          onClick={() => setIsMapFullscreen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 z-10 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsMapFullscreen(false);
            }}
            aria-label="Close fullscreen map"
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
          
          {/* Fullscreen map container */}
          <div
            className="w-full h-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full rounded-lg overflow-hidden">
              <MapsUserCards
                StartingPointcoordinates={startingPoint}
                zoom={11}
                trailCoordinates={trailCoordinates}
              />
            </div>
          </div>
          
          {/* Map info overlay */}
          <div className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg max-w-sm">
            <h3 className="font-medium text-sm mb-1">{title}</h3>
            <p className="text-xs text-gray-300">Click anywhere to close</p>
          </div>
        </div>
      )}

      {/* Legacy Fullscreen Image Modal (keeping for backward compatibility) */}
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
            {/* Placeholder for image content */}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRoutesCard;