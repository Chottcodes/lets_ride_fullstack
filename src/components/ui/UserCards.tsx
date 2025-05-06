"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface PopulationData {
  imageUrl: string;
  title: string;
  description: string;
  dateCreated: string;
  likes?: number;
  comments?: { text: string }[];
  username: string;
  UserprofilePicture: string;
  UserProfileName: string;
}

const UserCardsPost = (props: PopulationData) => {
  const {
    imageUrl,
    title,
    description,
    dateCreated,
    likes,
    comments,
    username,
    UserprofilePicture,
    UserProfileName,
  } = props;

  // Model Card
  const [isModel, setIsModel] = useState(false);
  const [isFullImage, setIsFullImage] = useState(false);
  const [isUserLiked, setIsUserLiked] = useState(false);
 

  const [userId, setUserId] = useState<number>();


  const handleImagePost = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    try {
      if (file) {
        const imageRef = ref(storage, `galleryPicture/${userId}_${file?.name}`);
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
       

        console.log("Uploaded gallery Post:", url);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("ID");
    if (userId) {
      setUserId(Number(userId));
    }
  }, []);

  return (
    <>
      <main className="max-w-[1570px] h-full overflow-hidden shadow-md rounded-md border-2 border-blue-500 pb-5">
        <section className="transition-transform duration-300 hover:scale-102">
          <button onClick={() => setIsModel(true)}>
            <Image
              src={imageUrl}
              width={1000}
              height={1000}
              alt="User Image"
              className=" w-[465px] h-[250px] object-cover cursor-pointer"
            />
          </button>
        </section>
        <section className="w-full h-[10%] flex items-center justify-evenly">
          <div className="h-full w-[50%]  text-white flex justify-start items-center">
            <Avatar>
              <AvatarImage
                src={UserprofilePicture}
                className="object-contain w-[30px] h-full"
              />
              <AvatarFallback>User Profile</AvatarFallback>
            </Avatar>
            <p>{`@${UserProfileName}`}</p>
          </div>
          <div className="w-[50%] h-full  flex justify-start items-center">
            <h1 className="text-white text-[16px]">{title}</h1>
          </div>
        </section>

        {/* Info Container */}
        <div className="w-full h-[20%] flex justify-between items-center px-4 py-2 text-white text-sm ">
          <div className="flex justify-center items-center space-x-4 ">
            <div className="flex justify-center items-center gap-2">
              {/* If liked */}
              {isUserLiked ? (
                <button
                  onClick={() => setIsUserLiked(false)}
                  className="w-[50%] h-[35%] flex items-center  cursor-pointer"
                >
                  <Image
                    src={
                      isUserLiked
                        ? "/assets/images/card/like (1).png"
                        : "/assets/images/card/thumbs-up.png"
                    }
                    alt="Liked"
                    width={1000}
                    height={1000}
                    className="w-[20px] h-[20px] object-contain"
                  />
                  <p className="text-lg font-medium">
                    {likes == null ? 0 : likes}
                  </p>
                </button>
              ) : (
                // Default like
                <button
                  onClick={() => setIsUserLiked(true)}
                  className="w-[50%] h-[20%] flex items-center gap-2 cursor-pointer"
                >
                  <Image
                    src="/assets/images/card/thumbs-up.png"
                    alt="Like"
                    width={1000}
                    height={1000}
                    className="object-contain w-[20px] h-[20px]"
                  />
                  <p className="text-[18px]">{likes == null ? 0 : likes}</p>
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
                {comments == null ? 0 : comments.length}
              </span>
            </button>
          </div>

          <p className="text-sm">{dateCreated}</p>
        </div>
      </main>

      {/* Expanded View / Modal */}
      {isModel && (
        <div
          className="w-[80%] h-[90%] m-auto fixed inset-0 z-50 flex justify-center items-center bg-black border-2"
          onClick={() => {
            setIsModel(false);
            setIsFullImage(false);
          }}
        >
          <div
            className="h-full bg-black rounded-xl shadow-xl max-w-4xl w-full p-6 relative overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Zoomable Image */}
            <Image
              src={imageUrl}
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
                        src={UserprofilePicture} // Profile picture
                        className="object-contain w-full h-full"
                      />
                      <AvatarFallback>Profile Picture</AvatarFallback>
                    </Avatar>
                    <p>{`@${UserProfileName}`}</p>
                  </button>

                  <div className="w-full h-full flex items-center justify-center absolute">
                    {title}
                  </div>
                  <div className="w-full h-full flex items-center justify-end absolute">
                    <p className="pr-3">{dateCreated}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="h-[15%] text-white text-lg overflow-auto break-words whitespace-pre-wrap">
                <p className="indent-8 text-lg">{description}</p>
                </div>

                {/* Likes & Comments */}
                <div className="w-full border-t bg-red-500">
                  <div className="flex items-center gap-5">
                    <button className="flex items-center space-x-2 text-gray-700">
                      <Image
                        src="/assets/images/card/thumbs-up.png"
                        width={1000}
                        height={1000}
                        alt="Like"
                        className="w-6 h-6 text-black"
                      />
                      <p className="text-[18px]">{likes == null ? 0 : likes}</p>
                    </button>

                    <button className="flex items-center space-x-2 text-gray-700">
                      <Image
                        src="/assets/images/card/coment.png"
                        alt="Comment"
                        className="w-6 h-6 mt-1 opacity-70"
                        width={1000}
                        height={1000}
                      />
                      <div className="text-lg flex gap-3 ">
                        Comments
                        {comments == null ? 0 : comments.length}
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
