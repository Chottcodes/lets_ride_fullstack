"use client";
import Image from "next/image";
import React from "react";
interface propTypes {
  isHomeOn: boolean;
  isLocationOn: boolean;
  isGalleryOn: boolean;
  isProfileOn: boolean;
}
const MobileNavBar = (prop: propTypes) => {
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
    <nav className="w-full h-[10%] lg:hidden flex justify-evenly items-center">
      <button onClick={handleHomeButton}>
        <Image
          className="h-[35px] w-[35px]"
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
      <button onClick={handleLocationButton}>
        <Image
          className="h-[35px] w-[35px]"
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
      <button onClick={handleGalleryButton}>
        <Image
          className="h-[35px] w-[35px]"
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
      <button
        onClick={handleProfileButton}
        className={`${
          isProfileOn ? "border-2 border-blue-700" : "border-none"
        } rounded-full overflow-hidden`}
      >
        <Image
          className="h-[35px] w-[35px]"
          src="/assets/images/motorcycle-tires.jpg"
          width={100}
          height={100}
          alt="Profile Icon"
        />
      </button>
    </nav>
  );
};

export default MobileNavBar;
