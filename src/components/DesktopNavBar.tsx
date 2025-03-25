"use client";
import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
interface propTypes {
  isHomeOn: boolean;
  isLocationOn: boolean;
  isGalleryOn: boolean;
  isProfileOn: boolean;
}
const DesktopNavBar = (prop: propTypes) => {
  const { isHomeOn, isLocationOn, isGalleryOn, isProfileOn } = prop;
  const handleHomeButton = () => {
    //Redirect to home
  };
  const handleLocationButton = () => {
    //Redirect to Location page
  };
  const handleGalleryButton = () => {
    //reditrect to Gallery Page
  };
  const handleProfileButton = () => {
    //redirect to profile page
  };

  return (
    <nav className="w-full h-full hidden lg:flex lg:flex-col  justify-evenly items-center">
      <section className="h-[50%] w-full flex flex-col justify-evenly items-center">
      <button onClick={handleHomeButton} className="cursor-pointer">
        <Image
          className="h-[35px] w-[35px] lg:h-[25px] lg:w-[25px]"
          src={
            isHomeOn
              ? "/assets/images/home(2).png"
              : "/assets/images/home(1).png"
          }
          width={100}
          height={100}
          alt="Home Icon"
        />
      </button>
      <button onClick={handleLocationButton} className="cursor-pointer">
        <Image
          className="h-[35px] w-[35px] lg:h-[25px] lg:w-[25px]"
          src={
            isLocationOn
              ? "/assets/images/location(1).png"
              : "/assets/images/location.png"
          }
          width={100}
          height={100}
          alt="Location Icon"
        />
      </button>
      <button onClick={handleGalleryButton} className="cursor-pointer">
        <Image
          className="h-[35px] w-[35px] lg:h-[25px] lg:w-[25px]"
          src={
            isGalleryOn
              ? "/assets/images/gallery(1).png"
              : "/assets/images/gallery.png"
          }
          width={100}
          height={100}
          alt="Gallery Icon"
        />
      </button>
      </section>
      <section className="w-full h-[50%] flex justify-center items-end">
      <button
        onClick={handleProfileButton}
        className={`${
          isProfileOn ? "border-2 border-blue-700" : "border-none"
        } rounded-full overflow-hidden mb-32 cursor-pointer`}
      >
        <Avatar className="w-[55px] h-full lg:h-[30px] lg:w-[30px]">
          <AvatarImage src="/assets/images/motorcycle-tires.jpg" />
          <AvatarFallback>Profile Picture</AvatarFallback>
        </Avatar>
      </button>
      </section>
    </nav>
  );
};

export default DesktopNavBar;
