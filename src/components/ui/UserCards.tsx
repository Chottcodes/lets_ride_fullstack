"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IUserCardType } from "../utils/Interface";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


interface PopulationData
{
   imageUrl: string;
    title: string;
    description: string;
    dateCreated: string;
    likes?: number;
    comments?: { text: string }[];
    username: string
}

const UserCardsPost = (props: PopulationData ) => {

const {imageUrl, title, description, dateCreated, likes, comments, username} = props

  // Model Card
  const [isModel, setIsModel] = useState(false);
  const [isFullImage, setIsFullImage] = useState(false);
  const [isUserLiked, setIsUserLiked] = useState(false);
  const [userId, setUserId] = useState<number>()

  const handleImagePost = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    try {
      if (file) {
        const imageRef = ref(storage, `galleryPicture/${userId}_${file?.name}`);
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        setImage(url);
        setIsImageFilled(true);
        console.log("Uploaded gallery Post:", url);
      } else {
        uploadDefaultPicture();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() =>
  {
    const userId = localStorage.getItem("ID")
    if (userId)
    {
      setUserId( Number(userId) )
    }

  }, []) 
  

  return (
    <>
      {/* Main Card */}
      <main className="max-w-[1570px] h-full overflow-hidden shadow-md rounded-md border-2 border-black pb-5">
        {/* Image */}
        <section className="transition-transform duration-300 hover:scale-102 ">
          <button onClick={() => setIsModel(true)}>
            <Image
              src={imageUrl}
              width={1000}
              height={1000}
              alt="User Image"
              className=" w-[465px] h-[250px] object-cover rounded-md border-2 border-blue-500 cursor-pointer"
              />
          </button>
        </section>
            <h1 className="text-white text-[16px] mb-1">{title}</h1>

        {/* Info Container */}
        <div className="flex justify-between items-center px-4 py-2 text-white text-sm">
          <div className="flex items-center space-x-4">
            <div>
              {/* If liked */}
              {isUserLiked ? (
                <div
                  onClick={() => setIsUserLiked(false)}
                  className="flex items-center space-x-1 cursor-pointer"
                >
                  <Image
                    src={isUserLiked ? "/assets/images/card/like (1).png" : "/assets/images/card/thumbs-up.png"} alt="Liked"
                    width={1000}
                    height={1000}
                    className={`w-6 h-6 ${isUserLiked ? "w-8 h-6 ps-1" : ""}`}
                  />
                  <span className="text-lg font-medium">{likes == null ? 0: likes}</span>
                </div>
              ) : (
                // Default like
                <button
                  onClick={() => setIsUserLiked(true)}
                  className="flex items-center space-x-1 cursor-pointer"
                >
                  <Image
                    src="/assets/images/card/thumbs-up.png"
                    alt="Like"
                    width={1000}
                    height={1000}
                    className="w-6 h-6"
                  />
                  <span className="text-[18px] ps-1 ">{comments == null ? 0 : comments.length}
                  </span>
                </button>
              )}
            </div>

            <button
              onClick={() => setIsModel(true)}
              className="flex items-center space-x-1 cursor-pointer"
            >
              <Image
                src="/assets/images/card/coment.png"
                width={1000}
                height={1000}
                alt="comments"
                className="w-6 h-6 mt-1"
              />
              <span className="text-xl ps-1">{comments == null ? 0 : comments.length}
              </span>
            </button>
          </div>

          <span className="text-[18px]">{dateCreated}</span>
        </div>
      </main>

      {/* Expanded View / Modal */}
      {isModel && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/60"
          onClick={() => {
            setIsModel(false);
            setIsFullImage(false); // Reset zoom when modal closes
          }}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-4xl w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Zoomable Image */}
            <Image
              src={imageUrl}
              width={1000}
              height={1000}
              alt="Motorbike POV"
              onClick={() => setIsFullImage(!isFullImage)}
              className={`transition-all duration-300 cursor-pointer rounded-md mb-4 hover:border-1 hover:border-black/20 ${
                isFullImage
                  ? "fixed top-0 left-0 w-full h-full object-contain z-50 bg-black"
                  : "w-full h-[400px] object-cover"
              }`}
            />

            {!isFullImage && (
              <>
                {/* User Name Account */}
                <div className="flex space-x-2">
                  <button className="border-none rounded-full overflow-hidden cursor-pointer">
                    <Avatar className="w-[55px] h-[55px] lg:h-[1px] lg:w-[1px]">
                      <AvatarImage
                        src="/assets/images/motorcycle-tires.jpg" // Profile picture
                        className="object-cover w-[45px] h-[40px]"
                      />
                      <AvatarFallback>Profile Picture</AvatarFallback>
                    </Avatar>
                  </button>
                  <div>
                    <h1 className="">{username}</h1> 
                    <h2 className="text-[24px] font-semibold self-end">{title}</h2>
                  </div>
                </div>

                {/* Date */}
                <div className="text-black space-y-2">
                  <p className="text-lg">
                   {description}
                  </p>
                  <p className="text-gray-500">Date: {dateCreated}</p>
                </div>

                {/* Likes & Comments */}
                <div className="mt-6 border-t pt-4">
                  <div className="flex items-center space-x-5">
                    <button className="flex items-center space-x-2 text-gray-700">
                      <Image
                        src="/assets/images/card/thumbs-up-black.png"
                        width={1000}
                        height={1000}
                        alt="Like"
                        className="w-6 h-6 text-black"
                      />
                      <span className="text-lg font-medium">{likes == null ? 0: likes}</span>
                    </button>

                    <button className="flex items-center space-x-2 text-gray-700">
                      <Image
                        src="/assets/images/card/comment-black.png"
                        alt="Comment"
                        className="w-6 h-6 mt-1 opacity-70"
                        width={1000}
                        height={1000}
                      />
                      <span className="text-lg font-medium">{comments == null ? 0 : comments.length}
                      Comments</span>
                    </button>
                  </div>
                  {/* Comments Section */}
                  {/* <div className="mt-4 space-y-2">
                    {comments.map((comment, index) => 
                    <div key={index} className="bg-gray-100 p-2 rounded">
                    <div className="text-sm">
                    <p key={index}>{comment.text}</p>
                    </div>
                  </div>
                    )}
                  </div> */}
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
function setImage(url: string) {
  throw new Error("Function not implemented.");
}

function setIsImageFilled(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function uploadDefaultPicture() {
  throw new Error("Function not implemented.");
}

