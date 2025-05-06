"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import React, { useState } from "react";

interface PopulationData {
  imageUrl: string;
  title: string;
  description: string;
  dateCreated: string;
  isLiked: boolean;
  likes?: Likes[];
  comments?: { text: string }[];
  UserprofilePicture: string;
  UserProfileName: string;
  handleLike: () => void;
}
interface Likes {
  id: number;
}

const UserCardsPost = (props: PopulationData) => {
  const {
    imageUrl,
    title,
    description,
    dateCreated,
    likes,
    comments,
    UserprofilePicture,
    UserProfileName,
    isLiked,
    handleLike,
  } = props;

  // Model Card
  const [isModel, setIsModel] = useState<boolean>(false);
  const [isFullImage, setIsFullImage] = useState<boolean>(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);

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
              className=" w-[465px] h-[250px] object-contain cursor-pointer"
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
              {isLiked ? (
                <button className={"flex items-center space-x-2 text-white"}>
                  <Image
                    src="/assets/images/thumbs-up-blue.png"
                    width={1000}
                    height={1000}
                    alt="Like"
                    className="w-6 h-6 text-black cursor-pointer"
                  />
                  <p className="text-[18px]">{likes?.length}</p>
                </button>
              ) : (
                // Default like
                <button className={"flex items-center space-x-2 text-white"}>
                  <Image
                    onClick={handleLike}
                    src="/assets/images/card/thumbs-up.png"
                    width={1000}
                    height={1000}
                    alt="Like"
                    className="w-6 h-6 text-black cursor-pointer"
                  />
                  <p className="text-[18px]">{likes?.length}</p>
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
                <div
                  className={`${
                    isCommentsOpen ? "h-[50%]" : "h-[15%]"
                  } w-full h-[15%] text-white text-lg overflow-auto break-words whitespace-pre-wrap`}
                >
                  {isCommentsOpen ? (
                    <div className="text-lg relative">
                      {comments?.map((comment, index) => (
                        <p key={index}>{comment.text}</p>
                      ))}
                      <div className="w-full h-full flex items-center bg-gray-600">
                        <div className="h-[35px] w-[35px] rounded-full">
                          <Avatar>
                            <AvatarImage
                              src={UserprofilePicture}
                              className="object-contain w-full h-full"
                            />
                            <AvatarFallback>User Profile</AvatarFallback>
                          </Avatar>
                        </div>
                        <input type="text" placeholder="Comment..." className="w-[90%] h-full text-sm pl-2" />
                        <div className="">
                          <Image src={'/assets/images/send.png'} width={500} height={500} alt={"send icon"} className="object-contain h-[20px] w-[20px]"/>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="indent-8 text-lg">{description}</p>
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
                        <p className="text-[18px]">{likes?.length}</p>
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
                        <p className="text-[18px]">{likes?.length}</p>
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
