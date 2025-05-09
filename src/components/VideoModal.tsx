"use client";
import React, { useEffect, useState } from "react";
import {
  AddCommentVideo,
 
  AddVideoLike,
  GetVideoComments,
} from "./utils/DataServices";
import {
  CommentsModelVideo,
  GalleryComments,
  Likes,
  LikesVideoModel,
} from "./utils/Interface";
import Image from "next/image";

interface VideoModalProps {
  videoUrl: string;
  videoId: number | null;
  videoLikes: number;
  videoLikeArr: Likes[];
  onClose: () => void;
}

const VideoModal = ({
  videoUrl,
  videoId,
  videoLikes,
  videoLikeArr,
  onClose,
}: VideoModalProps) => {
  const [comments, setComments] = useState<GalleryComments[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [userId, setUserId] = useState<number>(0);
  const [videoLikesArr, setVideoLikeArr] = useState<Likes[]>(videoLikeArr);
  const [isAlreadyLikes, setIsAlreadyLike] = useState<boolean>(false);

  const LikeVideoPost = async (VideoId: number) => {
    if (userId === null) {
      console.error("UserId is null. Cannot add like.");
      return;
    }
   
   

    if (userId && VideoId) {
      const likeObj: LikesVideoModel = {
        UserId: userId,
        VideoId: VideoId,
        IsDeleted: false,
      };
      const response = await AddVideoLike(likeObj);
      if (response) {
        console.log("Like added successfully");
        setVideoLikeArr((prevArr) => [
          ...prevArr,
          { userId, routeId: 0, isDeleted: false, createdAt: new Date().toISOString() },
        ]);
        setIsAlreadyLike(true);
      } else {
        console.error("Error adding like");
      }
    }
  };
  const handleCommentSubmit = async (commentText: string, VideoId: number) => {
    if (commentText && userId && videoId) {
      const CommentsOBj: CommentsModelVideo = {
        UserId: userId,
        VideoId: videoId,
        CommentText: newComment,
        IsDeleted: false,
      };
      const response = await AddCommentVideo(CommentsOBj);
      if (response) {
        const updatedComments = await GetVideoComments(VideoId);
        setComments(updatedComments);
      }
    }
  };
  useEffect(() => {
    const GetId = localStorage.getItem("ID");
    if (GetId) setUserId(Number(GetId));
  }, []);
  useEffect(() => {
    
    if(videoLikesArr.some((like) => like.userId === userId))
        {
            setIsAlreadyLike(true)
        }
  }, [userId,videoLikeArr]);

  useEffect(() => {
    const vidComents = async () => {
      if (videoId !== null) {
        const updatedComments = await GetVideoComments(videoId);
        setComments(updatedComments);
      }
    };
    vidComents();
  }, [videoId]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="w-[90vw] h-[90vh] max-w-[600px] relative bg-black rounded-lg p-4"
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
            onClick={() => videoId !== null && LikeVideoPost(videoId)}
            className={`${isAlreadyLikes?"hidden":"block"} p-2 bg-blue-500 text-white rounded-md flex justify-center items-center gap-2 cursor-pointer`}>
            <Image
              src={"/assets/images/card/thumbs-up.png"}
              width={100}
              height={100}
              alt={"Thumbs up"}
              className="w-[15px] h-[15px]"
            />
            {videoLikes}
          </button>
          <button
           
            className={`${isAlreadyLikes?"block":"hidden"} p-2 bg-blue-500 text-white rounded-md flex justify-center items-center gap-2`}
          >
            <Image
              src={"/assets/images/card/like (1).png"}
              width={100}
              height={100}
              alt={"Thumbs up"}
              className="w-[15px] h-[15px]"
            />
            {videoLikes}
          </button>
          <button className="p-2 bg-green-500 text-white rounded-md flex justify-center items-center gap-2 text-sm">
            <Image
              src={"/assets/images/card/coment.png"}
              width={100}
              height={100}
              alt={"comments logo"}
              className="h-[15px] w-[15px]"
            />
            {comments.length}
          </button>
        </div>

        {/* Comments List */}
        <div className="mt-2 flex flex-col justify-evenly gap-2 overflow-y-auto custom-scrollbar">
          {comments.map((comment, index) => (
            <div
              className="flex justify-between items-center text-white"
              key={index}
            >
              <div className="w-[20%] h-[10%] flex gap-2">
                <Image
                  src={comment.user.profilePicture}
                  width={500}
                  height={500}
                  alt={"profile"}
                  className="w-[25px] h-[25px] rounded-full"
                />
                <p className="text-sm">{comment.user.userName}</p>
              </div>
              <p className="text-sm">{comment.commentText}</p>
              <p className="text-sm">
                {comment.createdAt
                  ? new Date(comment.createdAt).toLocaleDateString("en-CA")
                  : "N/A"}
              </p>
            </div>
          ))}
        </div>
        {/* Comment Section */}
        <div className="mt-4">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 border  rounded-md text-white"
          />
          <button
            onClick={() =>
              videoId !== null && handleCommentSubmit(newComment, videoId)
            }
            className="mt-2 p-2 bg-blue-500 text-white rounded-md"
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
