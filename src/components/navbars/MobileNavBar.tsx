"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Home, MapPin, Image as GalleryIcon,} from "lucide-react";
import { useProfilePicture } from "@/hooks/useProfilePicture";

const MobileNavBar = () => {
  const [isHomeOn, setIsHomeOn] = useState<boolean>(true);
  const [isLocationOn, setIsLocationOn] = useState<boolean>(false);
  const [isGalleryOn, setIsGalleryOn] = useState<boolean>(false);
  const [isProfileOn, setIsProfileOn] = useState<boolean>(false);


  const pathname = usePathname();

  const profilePicture = useProfilePicture();

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
        <Home className={`${isHomeOn ? "text-blue-700" : "text-white"} `} />
      </button>
      <button onClick={handleLocationButton}>
        <MapPin
          className={`${isLocationOn ? "text-blue-700" : "text-white"}`}
        />
      </button>
      <button onClick={handleGalleryButton}>
        <GalleryIcon
          className={`${isGalleryOn ? "text-blue-700" : "text-white"}`}
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
            profilePicture ? profilePicture : "/assets/images/defaultPicture.png"
          }
          width={30}
          height={30}
          alt="Profile Icon"
        />
      </button>
    </nav>
  );
};

export default MobileNavBar;
