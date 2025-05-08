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
        setUsercomment('')
      }
    };
    GetPost();
  }, [isCommentPosted]);

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
      } else {
        console.error("Error adding like");
      }
    }
  };
  return (
    <>
      <main className="max-w-[1570px] h-full overflow-hidden shadow-md rounded-md border-2 border-blue-500 pb-5">
        <section className="transition-transform duration-300 hover:scale-102">
          <button onClick={() => setIsModel(true)}>
            <Image
              src={props.imageUrl}
              width={1000}
              height={1000}
              alt="User Image"
              className=" w-[465px] h-[250px] object-contain cursor-pointer"
            />
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
          className="w-[80%] h-[90%] m-auto fixed inset-0 z-50 flex justify-center items-center bg-black border-2 "
          onClick={() => {
            setIsModel(false);
            setIsFullImage(false);
          }}
        >
          <div
            className="h-full bg-black rounded-xl shadow-xl max-w-4xl w-full p-6 relative overflow-y-auto custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
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
                <div className="w-full flex text-white relative">
                  <button className="w-[20%] flex justify-center items-center rounded-full overflow-hidden cursor-pointer">
                    <Avatar className="w-[55px] h-[55px] lg:h-[60px] lg:w-[60px] rounded-full">
                      <AvatarImage
                        src={props.creator.profilePicture} // Profile picture
                        className="object-contain w-full h-full"
                      />
                      <AvatarFallback>Profile Picture</AvatarFallback>
                    </Avatar>
                    <p>{`@${props.creator.userName}`}</p>
                  </button>

                  <div className="w-full h-full flex items-center justify-center absolute">
                    {props.title}
                  </div>
                  <div className="w-full h-full flex items-center justify-end absolute">
                    <p className="pr-3">
                      {new Date(props.dateCreated).toLocaleDateString("en-CA")}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div
                  className={`w-full text-white text-lg break-words whitespace-pre-wrap ${
                    isCommentsOpen
                      ? "h-[50%]"
                      : "h-[15%]"
                  } transition-all duration-300 ease-in-out`}
                >
                  {isCommentsOpen ? (
                    <div className="h-full w-full text-lg text-white relative">
                      <div className="h-[80%] w-full flex flex-col  gap-2 overflow-y-auto custom-scrollbar">
                        {comments.map((comment, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 bg-gray-800 px-4 py-3 rounded-lg shadow-md w-[50%] "
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
                          <div className="h-[55px] w-[55px] rounded-full ">
                            <Avatar>
                              <AvatarImage
                                src={props.creator.profilePicture}
                                className="object-contain w-full h-full"
                              />
                            </Avatar>
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
