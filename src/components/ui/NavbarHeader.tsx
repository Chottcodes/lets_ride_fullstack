"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

interface propTypes {
  isRoutes: boolean;
  isYourLikes: boolean;
  isMyPictures: boolean;
  isMyRoutes: boolean;
}

const NavbarHeader = (prop: propTypes) => {
  const { isYourLikes, isMyPictures, isMyRoutes } = prop;
  const { push } = useRouter();

  return (
    <div className="w-full ">
      <nav className="text-white mt-10 mb-15">
        <div className="flex flex-col gap-6 mb-10 lg:mx-10 mx-6">
          <div>
            <Image
              src="/assets/images/Logo.png"
              alt="Lets Ride"
              width={1000}
              height={1000}
              className="h-40 w-80 mx-auto relative"
              priority
            />
          </div>

          {/* Nav links */}
          {/* <div className="flex justify-around sm:gap-x-1 gap-x-10 gap-y-4 md:text-[25px] sm:text-3xl font-light cursor-pointer">


      <div onClick={() => push("/home/yourlikes") } className={`hover:text-blue-500 ${isYourLikes ? "text-blue-500" : "text-white"}`}>
        Your Likes
      </div>

      <div onClick={() => push("/home/mypictures") } className={`hover:text-blue-500 ${isMyPictures ? "text-blue-500" : "text-white"}`}>
        My Pictures
      </div>

      <div onClick={() => push("/home/myroutes") } className={`hover:text-blue-500 ${isMyRoutes ? "text-blue-500" : "text-white"}`}>
        My Routes
      </div>
      </div> */}
        </div>

        {/* <div className="border-b border-stone-500/40 mx-5 sm:mx-30"></div> */}
      </nav>
    </div>
  );
};

export default NavbarHeader;
