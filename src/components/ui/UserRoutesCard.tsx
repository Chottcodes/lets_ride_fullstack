"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import BackButtonComponent from "../buttons/BackButtonComponent";
import MapsUserCards from "../mapsUserCards";
import "mapbox-gl/dist/mapbox-gl.css";
interface RTypes {
  LikesNumber: number;
  RouteName: string;
  RouteDate: string | undefined;
  RouteComments?: number;
  RouteLikes?: number;
  RouteImage?: string | undefined;
  UserprofilePicture?: string;
  ProfileName: string;
  RouteDescription?: string;
  RouteStartingPoint: [number, number] | undefined;
  TrailCoords: [number, number][] | undefined;
  handleLike?: () => void;
  handleDislike?: () => void;
  isLiked?: boolean;
  comments?: CommentType[];
}
interface CommentType {
  CommentText?: string;
  CreatedAt?: string;
  User: [UserName: string, ProfilePicture: string];
}
const UserRoutesCard = (props: RTypes) => {
  const {
    RouteName,
    RouteDate,
    RouteImage,
    LikesNumber,
    UserprofilePicture,
    ProfileName,
    RouteDescription,
    RouteStartingPoint,
    TrailCoords,
    handleLike,
    handleDislike,
    isLiked,
    comments,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isImageOpen, setIsImageOpen] = useState<boolean>(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);

  if (!isModalOpen)
    return (
      <article className="w-full h-full shadow-md rounded-md border-2 border-blue-500 flex flex-col justify-start overflow-hidden">
        <header className="h-full lg:w-full lg:h-full">
          {RouteStartingPoint && (
            <MapsUserCards
              StartingPointcoordinates={RouteStartingPoint}
              zoom={10}
              trailCoordinates={TrailCoords}
            />
          )}
        </header>
        <section className="w-full h-[10%] flex justify-start items-center gap-2">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden pl-5">
            <Avatar>
              <AvatarImage
                src={UserprofilePicture}
                className="object-contain w-full h-full"
              />
              <AvatarFallback>User Profile</AvatarFallback>
            </Avatar>
          </div>
          <div className="text-white">
            <p>{ProfileName}</p>
          </div>
        </section>
        <main className="h-[10%] w-full lg:w-full lg:h-[20%]  flex justify-between items-center text-white text-sm">
          <section className="flex justify-center items-center gap-5 w-[25%] h-full">
            <div className="flex items-center gap-1 cursor-pointer">
              <button
                onClick={handleLike}
                className={`${
                  isLiked ? "hidden" : "block"
                } cursor-pointer h-[15px] w-[15px] flex justify-center items-center gap-2`}
              >
                <Image
                  src="/assets/images/card/thumbs-up.png"
                  width={900}
                  height={900}
                  alt="comments"
                  className="w-full h-full"
                />
                {LikesNumber == null ? 0 : LikesNumber}
              </button>
              <button
                onClick={handleDislike}
                className={`${
                  isLiked ? "block" : "hidden"
                } cursor-pointer h-[15px] w-[15px] flex justify-center items-center gap-2`}
              >
                <Image
                  src="/assets/images/thumbs-up-blue.png"
                  width={900}
                  height={900}
                  alt="comments"
                  className="w-full h-full"
                />
                {LikesNumber == null ? 0 : LikesNumber}
              </button>
            </div>

            <div className="flex items-center gap-1 cursor-pointer">
              <button className="cursor-pointer h-[15px] w-[15px] flex justify-center items-center gap-2">
                <Image
                  src="/assets/images/card/coment.png"
                  width={900}
                  height={900}
                  alt="comments"
                  className="w-full h-full"
                />
                {LikesNumber == null ? 0 : LikesNumber}
              </button>
            </div>
          </section>

          <h3 className="w-[50%] h-full  flex justify-center items-center lg:text-[15px]">
            {RouteName}
          </h3>
          <time className="w-[25%] h-full flex justify-center items-center lg:text-[15px] text-white">
            {RouteDate}
          </time>
        </main>
        <footer className="h-[30%] lg:w-full lg:h-[25%] rounded-xl flex justify-center items-center lg:pb-2 ">
          <button
            onClick={() => setIsModalOpen(true)}
            className="h-[70%] w-[50%] lg:w-[60%] lg:h-full bg-blue-600 rounded-lg hover:bg-blue-800 text-lg text-white"
          >
            More
          </button>
        </footer>
      </article>
    );

  if (isModalOpen)
    return (
      <article className="fixed top-0 left-0 w-screen h-[90%] bg-black bg-opacity-80 z-50 flex justify-center items-center">
        <div className="w-[90%] h-[80%]  shadow-md rounded-md border-2 border-blue-500 flex flex-col overflow-hidden pl-2">
          <nav className="w-full h-10 flex justify-start items-center">
            <BackButtonComponent onClick={() => setIsModalOpen(false)} />
          </nav>
          <header className="h-[50%] lg:w-full lg:h-[40%]">
            <Image
              onClick={() => setIsImageOpen(true)}
              src={
                RouteImage && RouteImage !== ""
                  ? RouteImage
                  : "/assets/images/card/motorbike.png"
              }
              width={900}
              height={900}
              alt="Motorbike POV"
              className="h-full w-full object-contain cursor-pointer"
            />
            {isImageOpen && (
              <div
                className="fixed top-0 left-0  w-screen h-[100dvh] bg-black bg-opacity-90 flex justify-center items-start z-50"
                onClick={() => setIsImageOpen(false)}
              >
                <Image
                  src={
                    RouteImage && RouteImage !== ""
                      ? RouteImage
                      : "/assets/images/card/motorbike.png"
                  }
                  width={1200}
                  height={800}
                  alt="Full Image"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </header>
          <main className="h-[90%] w-full flex flex-col justify-center items-center">
            <header
              className={`${
                isCommentsOpen ? "hidden" : "block"
              } w-full h-[30%] flex justify-evenly items-center gap-2`}
            >
              <div className="w-[50%] flex justify-start items-center">
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden pl-5">
                  <Avatar>
                    <AvatarImage
                      src={UserprofilePicture}
                      className="object-contain w-full h-full"
                    />
                    <AvatarFallback>User Profile</AvatarFallback>
                  </Avatar>
                </div>
                <div className="text-white">
                  <p>{ProfileName}</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1 cursor-pointer w-[20%] h-[60%]">
                <button
                  onClick={handleLike}
                  className={`${
                    isLiked ? "hidden" : "block"
                  } cursor-pointer h-[15px] w-[15px] flex justify-center items-center gap-2`}
                >
                  <Image
                    src="/assets/images/card/thumbs-up.png"
                    width={900}
                    height={900}
                    alt="comments"
                    className="w-full h-full"
                  />
                  {LikesNumber == null ? 0 : LikesNumber}
                </button>
                <button
                  onClick={handleDislike}
                  className={`${
                    isLiked ? "block" : "hidden"
                  } cursor-pointer h-[15px] w-[15px] flex justify-center items-center gap-2`}
                >
                  <Image
                    src="/assets/images/thumbs-up-blue.png"
                    width={900}
                    height={900}
                    alt="comments"
                    className="w-full h-full"
                  />
                  {LikesNumber == null ? 0 : LikesNumber}
                </button>
              </div>
            </header>
            <section
              className={`${
                isCommentsOpen ? "hidden" : "block"
              } w-[90%] h-[50%] flex flex-col justify-start items-start gap-2 text-white`}
            >
              <div className="w-full h-[15%] flex justify-center items-center text-2xl">
                {RouteName}
              </div>
              <div className="overflow-y-auto pl-2 text-lg">
                {RouteDescription}
              </div>
            </section>
            <section
              onClick={() => setIsCommentsOpen(!isCommentsOpen)}
              className={`${
                isCommentsOpen ? "h-[100%] w-full" : "w-[90%] h-[20%]"
              }  cursor-pointer `}
            >
              {isCommentsOpen ? "Back" : `Comments ${comments?.length}`}
              {isCommentsOpen && (
                <section className=" w-full h-full relative">
                  <main className="overflow-y-auto max-h-[80%] px-4 py-2 text-white space-y-3">
                    {comments && comments.length > 0 ? (
                      comments.map((comment, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Avatar>
                            <AvatarImage
                              src={comment.User[1]}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <AvatarFallback>{comment.User[0]}</AvatarFallback>
                          </Avatar>
                          <div className="bg-gray-700 px-3 py-2 rounded-lg max-w-[80%]">
                            <p className="text-sm font-semibold">
                              {comment.User[0]}
                            </p>
                            <p className="text-sm">{comment.CommentText}</p>
                            <p className="text-xs text-gray-400">
                              {comment.CreatedAt
                                ? new Date(
                                    comment.CreatedAt
                                  ).toLocaleDateString("en-CA")
                                : "Unknown Date"}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm">No comments yet.</p>
                    )}
                  </main>

                  <footer className="w-full h-[20%] bottom-5 absolute flex justify-evenly items-center gap-1 pl-5">
                    <div className="w-[25px] h-[25px] flex justify-center items-center rounded-full overflow-hidden bg-gray-600 ">
                      <Avatar>
                        <AvatarImage
                          src={UserprofilePicture}
                          className="object-contain w-full h-full"
                        />
                        <AvatarFallback>User Profile</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="w-[80%] h-[80%] bg-gray-500 rounded-lg">
                      <input
                        className="w-full h-full  pl-2 text-white"
                        placeholder="Comment..."
                        type="text"
                      />
                    </div>
                    <div className="w-[10%] h-[10%] flex justify-center items-center">
                      <Image
                        src="/assets/images/send.png"
                        className="object-contain"
                        alt="send icon"
                        width={100}
                        height={100}
                      />
                    </div>
                  </footer>
                </section>
              )}
            </section>
          </main>
          <footer
            className={`${
              isCommentsOpen ? "hidden" : "block"
            } h-[20%]  lg:w-full lg:h-[40%] rounded-xl flex justify-center items-center pb-2 lg:pb-2`}
          >
            <button className="h-full w-[50%] bg-blue-600 rounded-lg hover:bg-blue-800 text-lg text-white">
              Lets Ride
            </button>
          </footer>
        </div>
      </article>
    );
};

export default UserRoutesCard;
