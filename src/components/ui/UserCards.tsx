"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { useState } from "react";

interface UserCard {
  userImage: string;
  userTitle: string;
  userLikes: number;
  userDate: string;
  userDescription: string;
  userName: string;
  userComments: string[];
}

const BikeCard = () => {
  // Model Card
  const [isModel, setIsModel] = useState(false);
  const [isFullImage, setIsFullImage] = useState(false);

  // User Card Blob
  const [userProfile, setUserProfile] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userDate, setUserDate] = useState("");
  const [userTitle, setUserTitle] = useState("");
  const [userDescription, setUserDescription] = useState("");

  // User Interact section
  const [userName, setUserName] = useState("");
  const [isUserLiked, setIsUserLiked] = useState(false);
  const [userComments, setUserComments] = useState(false);

  return (
    <>
      {/* Main Card */}
      <div className="max-w-[1570px] h-full overflow-hidden shadow-md rounded-md border-2 border-black">
        {/* Image */}
        <button onClick={() => setIsModel(true)}>
          <img
            src="/assets/testImages/BikeTest1.jpg"
            alt="Motorbike POV"
            className="transition-transform duration-300 hover:scale-105 w-[465px] h-[250px] object-cover rounded-md border-2 border-blue-500 cursor-pointer"
          />
        </button>

        {/* Info Container */}
        <div className="flex justify-between items-center px-4 py-2 text-white text-sm">
          <div className="flex items-center space-x-4">
            <div>
              {isUserLiked ? (
                // If user has liked
                <div
                  onClick={() => setIsUserLiked(false)}
                  className="flex items-center space-x-1 cursor-pointer"
                >
                  <img
                    src="/assets/images/card/like (1).png"
                    alt="Liked"
                    className="w-8 h-6 ps-1 text-black"
                  />
                  <span className="text-lg font-medium">20</span>
                </div>
              ) : (
                // Default like
                <button
                  onClick={() => setIsUserLiked(true)}
                  className="flex items-center space-x-1 cursor-pointer"
                >
                  <img
                    src="/assets/images/card/thumbs-up.png"
                    alt="Like"
                    className="w-6 h-6"
                  />
                  <span className="text-[18px] ps-1 ">20</span>
                </button>
              )}
            </div>

            <button
              onClick={() => setIsModel(true)}
              className="flex items-center space-x-1 cursor-pointer"
            >
              <img
                src="/assets/images/card/coment.png"
                alt="comments"
                className="w-6 h-6 mt-1"
              />
              <span className="text-xl ps-1">2</span>
            </button>
          </div>

          <span className="text-[18px]">2/18/2025</span>
        </div>
      </div>

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
            {/* Close Button */}
            {/* <button
              onClick={() => {
                setIsModel(false);
                setIsFullImage(false);
              }}
              className="absolute top-1 right-2 text-gray-700 hover:text-black text-2xl"
            >
              &times;
            </button> */}

            {/* Zoomable Image */}
            <img
              src="/assets/testImages/BikeTest1.jpg"
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
                {/* Avatar */}
                <div className="flex space-x-2">
                  <button className="border-none rounded-full overflow-hidden cursor-pointer">
                    <Avatar className="w-[55px] h-[55px] lg:h-[1px] lg:w-[1px]">
                      <AvatarImage
                        src="/assets/images/motorcycle-tires.jpg"
                        className="object-cover w-[45px] h-[40px]"
                      />
                      <AvatarFallback>Profile Picture</AvatarFallback>
                    </Avatar>
                  </button>

                  <h2 className="text-2xl font-bold self-end ">Bike Title</h2>
                </div>

                {/* Info */}
                <div className="text-black space-y-2">
                  <p className="text-lg">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Aut exercitationem id adipisci amet mollitia fuga porro
                    dignissimos hic nisi eos perspiciatis facere harum ipsam
                    ipsa doloremque sunt, nobis vero. Perferendis.
                  </p>
                  <p className="text-gray-500">Date: 2/18/2025</p>
                </div>

                {/* Likes & Comments */}
                <div className="mt-6 border-t pt-4">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-700">
                      <img
                        src="/assets/images/card/thumbs-up-black.png"
                        alt="Like"
                        className="w-6 h-6 text-black"
                      />
                      <span className="text-lg font-medium">20 Likes</span>
                    </button>

                    <button className="flex items-center space-x-2 text-gray-700">
                      <img
                        src="/assets/images/card/comment-black.png"
                        alt="Comment"
                        className="w-6 h-6"
                      />
                      <span className="text-lg font-medium">2 Comments</span>
                    </button>
                  </div>
                  {/* Comments Section */}
                  <div className="mt-4 space-y-2">
                    <div className="bg-gray-100 p-2 rounded">
                      <p className="text-sm">
                        <span>User 1:</span> That ride looks epic!
                      </p>
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                      <p className="text-sm">
                        <span>User 2:</span> Wow nice car bro!
                      </p>
                    </div>
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

export default BikeCard;
