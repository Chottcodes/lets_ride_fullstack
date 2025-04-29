"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter, usePathname } from "next/navigation";
import { GetUserProfile } from "../utils/DataServices";

const DesktopNavBar = () => {
  const [isHomeOn, setIsHomeOn] = useState<boolean>(true);
  const [isLocationOn, setIsLocationOn] = useState<boolean>(false);
  const [isGalleryOn, setIsGalleryOn] = useState<boolean>(false);
  const [isProfileOn, setIsProfileOn] = useState<boolean>(false);
  const [haveProfilePicture, setHaveProfilePicture] = useState<boolean>(false);
  const [userPicture, setUserPicture] = useState<string>("");

  const { push } = useRouter();

  const pathname = usePathname();

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
    <nav className="w-full h-full hidden lg:flex lg:flex-col justify-evenly items-center bg-[#161616] border rounded-xl p-4">
      <section className="pt-[10rem] h-[70%] w-full flex flex-col space-y-20 items-center">
        <button onClick={handleHomeButton} className="cursor-pointer">
          <Image
            className="h-[25px] w-[25px] lg:h-[27px] lg:w-[27px]"
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
            className="h-[35px] w-[35px] lg:h-[27px] lg:w-[27px]"
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
        <button
          onClick={handleGalleryButton}
          className={`overflow-hidden mb-5 cursor-pointer`}
        >
          <Image
            className="h-[35px] w-[35px] lg:h-[27px] lg:w-[27px]"
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
          <Avatar className="w-[55px] h-[55px] lg:h-[27px] lg:w-[27px]">
            <AvatarImage
              src={
                haveProfilePicture && userPicture
                  ? userPicture
                  : "/assets/images/defaultUserPicture.png"
              }
              className="object-left-bottom"
            />
            <AvatarFallback>Profile Picture</AvatarFallback>
          </Avatar>
        </button>
      </section>
    </nav>
  );
};

export default DesktopNavBar;
