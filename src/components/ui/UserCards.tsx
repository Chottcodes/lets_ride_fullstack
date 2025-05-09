"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
} from "../utils/DataServices";

const UserCardsPost = (props: IUserCardType) => {
  // Model Card
  const [isModel, setIsModel] = useState<boolean>(false);
  const [isFullImage, setIsFullImage] = useState<boolean>(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);
  const [isLiked, setIsliked] = useState<boolean>(false);
  const [isCommentPosted, setIsCommentPosted] = useState<boolean>(false);
  const [userComment, setUsercomment] = useState<string>("");
  const [userId, setUserId] = useState<number>();
  const [comments, setComments] = useState<GalleryComments[]>([]);

  useEffect(() => {
    const storedId = localStorage.getItem("ID");
    if (storedId) setUserId(Number(storedId));
  }, []);

  const handleCommentSubmit = async (
    commentText: string,
    GalleryId: number
  ) => {
    if (commentText && userId) {
      const CommentsOBj: CommentsModelGallery = {
        UserId: userId,
        GalleryPostId: GalleryId,
        CommentText: commentText,
        IsDeleted: false,
      };
      const response = await AddCommentGallery(CommentsOBj);
      if (response) {
        setIsCommentPosted(true);
        setUsercomment("");
        const updatedComments = await GetGalleryComments(GalleryId);
        setComments(updatedComments);
      }
    }
  };

  useEffect(() => {
    const GetPost = async () => {
      const getGalleryPosts = await GetGalleryComments(props.id);
      if (getGalleryPosts) {
        setComments(getGalleryPosts);
        setUsercomment("");
      }
    };
    GetPost();
  }, [isCommentPosted]);

  useEffect(() => {
    if (
      userId !== undefined &&
      props.likes?.some((like) => like.userId === userId)
    ) {
      setIsliked(true);
    }
  }, [userId, props.likes]);

  const LikeGalleryPost = async (GalleryId: number) => {
    if (userId === null) {
      console.error("UserId is null. Cannot add like.");
      return;
    }
    if (userId) {
      const likeObj: LikesGalleryModel = {
        UserId: userId,
        GalleryPostId: GalleryId,
        IsDeleted: false,
      };
      const response = await AddGalleryLike(likeObj);
      if (response) {
        console.log("Like added successfully");
        setIsliked(true);
      } else {
        console.error("Error adding like");
      }
    }
  };
  return (
    <>
      <main className="w-full max-w-[1570px] h-full overflow-hidden shadow-md rounded-md border-2 border-blue-500 pb-5">
        {/* Card image section */}
        <section className="transition-transform duration-300 hover:scale-102 w-full">
          <button onClick={() => setIsModel(true)} className="w-full">
            <div className="w-full h-auto aspect-[3/2] relative">
              <Image
                src={props.imageUrl}
                alt="User Image"
                fill
                className="object-contain w-full h-full rounded-t-md cursor-pointer"
              />
            </div>
          </button>
        </section>
        <section className="w-full h-[10%] flex items-center justify-evenly">
          <div className="h-full w-[50%] pl-2  text-white flex justify-start items-center">
            <Avatar>
              <AvatarImage
                src={props.creator.profilePicture}
                className="object-contain w-[20px] h-[20px] rounded-full"
              />
            </Avatar>
            <p>{`@${props.creator.userName}`}</p>
          </div>
          <div className="w-[50%] h-full  flex justify-start items-center">
            <h1 className="text-white text-[16px]">{props.title}</h1>
          </div>
        </section>

        {/* Info Container */}
        <div className="w-full h-[20%] flex justify-between items-center px-4 py-2 text-white text-sm ">
          <div className="flex justify-center items-center space-x-4 ">
            <div className="flex justify-center items-center gap-2">
              {/* If liked */}
              {isLiked ? (
                <button className={"flex items-center space-x-2 text-white"}>
                  <Image
                    src="/assets/images/thumbs-up-blue.png"
                    width={1000}
                    height={1000}
                    alt="Like"
                    className="w-6 h-6 text-black cursor-pointer"
                  />
                  <p className="text-[18px]">{props.likes?.length}</p>
                </button>
              ) : (
                // Default like
                <button className={"flex items-center space-x-2 text-white"}>
                  <Image
                    onClick={() => LikeGalleryPost(props.id)}
                    src="/assets/images/card/thumbs-up.png"
                    width={1000}
                    height={1000}
                    alt="Like"
                    className="w-6 h-6 text-black cursor-pointer"
                  />
                  <p className="text-[18px]">{props.likes?.length}</p>
                </button>
              )}
            </div>
            <button
              onClick={() => setIsModel(true)}
              className="w-[50%] h-[35%] flex items-center justify-center cursor-pointer gap-1"
            >
              <Image
                src="/assets/images/card/coment.png"
                width={1000}
                height={1000}
                alt="comments"
                className="object-contain w-[20px] h-[20px]"
              />
              <span className="text-lg">
                {props.comments == null ? 0 : props.comments.length}
              </span>
            </button>
          </div>

          <p className="text-sm">
            {new Date(props.dateCreated).toLocaleDateString("en-CA")}
          </p>
        </div>
      </main>

      {/* Expanded View / Modal */}
      {isModel && (
        <div
          className="w-full h-[80%] lg:h-[90%] m-auto fixed inset-0 z-50 flex justify-center items-center bg-black border-2 "
          onClick={() => {
            setIsModel(false);
            setIsFullImage(false);
          }}
        >
          <div
            className="h-full bg-black rounded-xl shadow-xl max-w-4xl w-full p-6 relative overflow-y-auto custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModel(false)}
              className="absolute top-4 right-4 text-white text-3xl font-bold z-50 hover:text-red-500 transition"
              aria-label="Close modal"
            >
              &times;
            </button>
            {/* Zoomable Image */}
            <Image
              src={props.imageUrl}
              width={1000}
              height={1000}
              alt="Motorbike POV"
              onClick={() => setIsFullImage(!isFullImage)}
              className={`transition-all duration-300 cursor-pointer object-contain ${
                isFullImage
                  ? "fixed top-0 left-0 w-full h-full object-contain z-50 bg-black"
                  : "w-full h-[400px] object-contain"
              }`}
            />

            {!isFullImage && (
              <>
                {/* User Name Account */}
                <div className="w-full h-[10%] flex text-white relative">
                  <button className="w-[35%] lg:w-[20%] flex justify-start items-center  overflow-hidden cursor-pointer ">
                    <Image
                      src={props.creator.profilePicture} 
                      className="object-contain w-[25px] h-[25px] rounded-full"
                      alt={""}
                      height={100}
                      width={100}
                    />

                    <p>{`${props.creator.userName}`}</p>
                  </button>

                  <div className="w-full h-full flex items-center justify-center absolute">
                    {props.title}
                  </div>
                </div>

                {/* Description */}
                <div
                  className={`w-full text-white text-lg break-words whitespace-pre-wrap ${
                    isCommentsOpen ? "h-[50%]" : "h-[15%]"
                  } transition-all duration-300 ease-in-out`}
                >
                  {isCommentsOpen ? (
                    <div className="h-full w-full text-lg text-white relative">
                      <div className="h-[80%] w-full flex flex-col  gap-2 overflow-y-auto custom-scrollbar">
                        {comments.map((comment, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 bg-gray-800 px-4 py-3 rounded-lg shadow-md w-[90%] lg:w-[50%] "
                          >
                            {/* Avatar */}
                            <Avatar className="w-[30px] h-[30px] rounded-full overflow-hidden">
                              <AvatarImage
                                src={
                                  comment.user.profilePicture ||
                                  "/assets/images/default-avatar.png"
                                }
                                alt="Profile Picture"
                                className="object-cover w-full h-full"
                              />
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>

                            {/* Comment Content */}
                            <div className="flex flex-col text-white w-full">
                              <div className="flex justify-between items-center w-full">
                                <p className="text-sm font-semibold text-white">
                                  @{comment.user.userName || "Unknown User"}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {comment.createdAt
                                    ? new Date(
                                        comment.createdAt
                                      ).toLocaleDateString("en-CA")
                                    : "Unknown Date"}
                                </p>
                              </div>
                              <p className="text-sm text-gray-200 mt-1 break-words">
                                {comment.commentText}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <section className="w-full h-[25%] flex justify-center items-center absolute bottom-0">
                        <div className="w-full h-[50%] flex items-center ">
                          <div className="h-[25px] w-[25px] lg:h-[55px] lg:w-[55px] rounded-full ">
                            <Image
                              src={props.creator.profilePicture}
                              className="object-contain w-full h-full rounded-full"
                              alt={"Profile picture"}
                              height={200}
                              width={200}
                            />
                          </div>
                          <input
                            type="text"
                            value={userComment}
                            placeholder="Comment..."
                            className="w-[85%] h-full text-sm pl-2 focus:border-none"
                            onChange={(e) => setUsercomment(e.target.value)}
                          />
                          <div className="w-[10%] h-full flex justify-center items-center">
                            <Image
                              onClick={() =>
                                handleCommentSubmit(userComment, props.id)
                              }
                              src={"/assets/images/send.png"}
                              width={500}
                              height={500}
                              alt={"send icon"}
                              className="object-contain h-[20px] w-[20px] cursor-pointer"
                            />
                          </div>
                        </div>
                      </section>
                    </div>
                  ) : (
                    <p className="indent-8 text-lg">{props.description}</p>
                  )}
                </div>

                {/* Likes & Comments */}
                <div className="w-full border-t">
                  <div className="flex items-center gap-5">
                    {isLiked ? (
                      <button
                        className={"flex items-center space-x-2 text-white"}
                      >
                        <Image
                          src="/assets/images/thumbs-up-blue.png"
                          width={1000}
                          height={1000}
                          alt="Like"
                          className="w-6 h-6 text-black cursor-pointer"
                        />
                        <p className="text-[18px]">{props.likes?.length}</p>
                      </button>
                    ) : (
                      <button
                        className={"flex items-center space-x-2 text-white"}
                      >
                        <Image
                          src="/assets/images/card/thumbs-up.png"
                          onClick={() => LikeGalleryPost(props.id)}
                          width={1000}
                          height={1000}
                          alt="Like"
                          className="w-6 h-6 text-black cursor-pointer"
                        />
                        <p className="text-[18px]">{props.likes?.length}</p>
                      </button>
                    )}

                    <button className="w-[90%] flex items-center space-x-2 text-white">
                      <Image
                        onClick={() => setIsCommentsOpen(!isCommentsOpen)}
                        src="/assets/images/card/coment.png"
                        alt="Comment"
                        className="w-6 h-6 mt-1 cursor-pointer"
                        width={1000}
                        height={1000}
                      />
                      <div className="w-[15%] text-lg flex gap-2">
                        <p>Comments</p>
                        {props.comments == null ? 0 : props.comments.length}
                      </div>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserCardsPost;
