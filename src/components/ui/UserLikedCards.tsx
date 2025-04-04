import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import React from "react";

const UserLikedCards = () => {
  return (
    <div>
      <div className="w-[465px] h-[386px] overflow-hidden shadow-md  rounded-md border-2 bg-[#1E1E1E] border-black ">
        <img
          src="/assets/testImages/bikeTest2.webp"
          alt="Motorbike POV"
          className="transition-transform duration-300 hover:scale-105 w-[465px] h-[250px] object-cover  rounded-md border-2 border-blue-500 cursor-pointer"
        />
        <div className="text-white flex justify-between px-3 mt-3">
          <div className="text-white flex justify-between ">
            <div className="flex items-center space-x-2">
              <button className="border-none rounded-full overflow-hidden cursor-pointer">
                <Avatar className="w-[55px] h-[55px] lg:h-[1px] lg:w-[1px]">
                  <AvatarImage
                    src="/assets/images/motorcycle-tires.jpg"
                    className="object-cover w-[45px] h-[40px]"
                  />
                  <AvatarFallback>Profile Picture</AvatarFallback>
                </Avatar>
              </button>
              <span className="pt-4">@userName</span>
            </div>
          </div>

          <div className="pt-[1rem]">This bike is so EPIC!!!</div>
        </div>
        <div className="text-stone-500 flex justify-center">
          This is The Description
        </div>

        <div className="flex justify-between items-center px-4 mt-5 text-white text-sm ">
          <div className="flex items-center space-x-4 ">
            <div className="flex items-center space-x-1 cursor-pointer">
              <div>
                <img
                  src="/assets/images/thumbs-up.png"
                  alt="comments"
                  className="w-5 h-5"
                />
              </div>
              <span>20</span>
            </div>

            <div className="flex items-center space-x-1 cursor-pointer">
              <div>
                <img
                  src="/assets/images/coment.png"
                  alt="comments"
                  className="w-5 h-5 mt-1"
                />
              </div>
              <span className="">2</span>
            </div>
          </div>

          <span className="text-[18px] text-gray-400">2/18/2025</span>
        </div>
      </div>
    </div>
  );
};

export default UserLikedCards;
