"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { GetUserProfile } from "../utils/DataServices";

const MobileNavBar = () => {
  const [isHomeOn, setIsHomeOn] = useState<boolean>(true);
  const [isLocationOn, setIsLocationOn] = useState<boolean>(false);
  const [isGalleryOn, setIsGalleryOn] = useState<boolean>(false);
  const [isProfileOn, setIsProfileOn] = useState<boolean>(false);
  const [haveProfilePicture, setHaveProfilePicture] = useState<boolean>(false);
  const [userPicture, setUserPicture] = useState<string>("");

  const pathname = usePathname();

  const { push } = useRouter();

  const handleHomeButton = () => {
    setIsHomeOn(true);
    setIsLocationOn(false);
    setIsGalleryOn(false);
    setIsProfileOn(false);
    push("/home");
  };
  const handleLocationButton = () => {
    setIsHomeOn(false);
    setIsLocationOn(true);
    setIsGalleryOn(false);
    setIsProfileOn(false);
    push("/home/map");
  };
  const handleGalleryButton = () => {
    setIsHomeOn(false);
    setIsLocationOn(false);
    setIsGalleryOn(true);
    setIsProfileOn(false);
    push("/home/gallery");
  };
  const handleProfileButton = () => {
    setIsHomeOn(false);
    setIsLocationOn(false);
    setIsGalleryOn(false);
    setIsProfileOn(true);
    push("/home/profile");
  };
  useEffect(() => {
    const getProfilePicture = async () => {
      if (typeof window !== "undefined") {
        const getFromLocalStorage = localStorage.getItem("ID");
        if (getFromLocalStorage) {
          const id = Number(getFromLocalStorage);
          const userData = await GetUserProfile(id);
          setUserPicture(userData.profilePicture);
          setHaveProfilePicture(true);
        }
      }
    };
    getProfilePicture();
  }, []);
  useEffect(() => {
    if (pathname === "/home") {
      setIsHomeOn(true);
      setIsLocationOn(false);
      setIsGalleryOn(false);
      setIsProfileOn(false);
    } else if (pathname === "/home/map") {
      setIsHomeOn(false);
      setIsLocationOn(true);
      setIsGalleryOn(false);
      setIsProfileOn(false);
    } else if (pathname === "/home/gallery") {
      setIsHomeOn(false);
      setIsLocationOn(false);
      setIsGalleryOn(true);
      setIsProfileOn(false);
    } else if (pathname === "/home/profile") {
      setIsHomeOn(false);
      setIsLocationOn(false);
      setIsGalleryOn(false);
      setIsProfileOn(true);
    }
  }, [pathname]);
  return (
    <nav className="w-[80%] h-[10%] lg:hidden flex justify-between items-center">
      <button onClick={handleHomeButton}>
        <Image
          className="h-[25px] w-[25px]"
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
          className="h-[25px] w-[25px]"
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
          className="h-[25px] w-[25px]"
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
          className="h-[30px] w-[30px]"
          src={
            haveProfilePicture && userPicture
              ? userPicture
              : "/assets/images/defaultUserPicture.png"
          }
          width={900}
          height={900}
          alt="Profile Icon"
        />
      </button>
    </nav>
  );
};

export default MobileNavBar;
