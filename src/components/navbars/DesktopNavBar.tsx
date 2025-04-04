"use client";
import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
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
    <nav className="w-full h-full hidden lg:flex lg:flex-col justify-evenly items-center bg-[#161616] border border-slate-600 rounded-xl p-4">
      <section className="h-[50%] w-full flex flex-col justify-evenly items-center space-y-10">
      <button onClick={handleHomeButton} className="cursor-pointer">
        <Image
          className="h-[35px] w-[35px] lg:h-[47px] lg:w-[47px]"
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
          className="h-[35px] w-[35px] lg:h-[47px] lg:w-[47px]"
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
          className="h-[35px] w-[35px] lg:h-[47px] lg:w-[47px]"
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
      <section className="w-full h-[50vh] flex justify-center items-end">
  <button
    onClick={handleProfileButton}
    className={`${
      isProfileOn ? "border-2 border-blue-700" : "border-none"
    } rounded-full overflow-hidden mb-5 cursor-pointer`}
  >
    <Avatar className="w-[55px] h-[55px] lg:h-[40px] lg:w-[80px]">
      <AvatarImage src="/assets/images/motorcycle-tires.jpg" className="object-left-bottom"/>
      <AvatarFallback>Profile Picture</AvatarFallback>
    </Avatar>
  </button>
</section>
    </nav>
  );
};

export default DesktopNavBar;
