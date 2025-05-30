"use client";

import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter, usePathname } from "next/navigation";

import { House, MapPinned, Images } from "lucide-react";
import { useProfilePicture } from "@/hooks/useProfilePicture";

const DesktopNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const profilePicture = useProfilePicture();
  const navItems = [
    { label: "Home", icon: House, route: "/home" },
    { label: "Routes", icon: MapPinned, route: "/home/map" },
    { label: "Gallery", icon: Images, route: "/home/gallery" },
  ];

  const isActive = (route: string) => pathname === route;



  return (
    <nav className="w-full h-[10%] hidden lg:flex justify-between items-center backdrop-blur-lg fixed z-10 px-10 bg-gray-800">
      <Image
        onClick={() => router.push("/home")}
        className="w-[50px] h-[50px] object-contain cursor-pointer"
        src="/assets/images/LogoBg.png"
        alt="Logo"
        width={300}
        height={300}
      />

      <div className="flex items-center gap-8">
        {navItems.map(({ label, icon: Icon, route }) => (
          <div
            key={route}
            onClick={() => router.push(route)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Icon
              className={isActive(route) ? "text-blue-800" : "text-white"}
            />
            <p
              className={`${
                isActive(route) ? "underline text-blue-800" : "text-white"
              }`}
            >
              {label}
            </p>
          </div>
        ))}

        <Avatar
          onClick={() => router.push("/home/profile")}
          className={`cursor-pointer ${
            isActive("/home/profile") ? "ring-2 ring-blue-700" : ""
          }`}
        >
          <AvatarImage
            src={profilePicture || "/assets/images/defaultPicture.png"}
            alt="Profile"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default DesktopNavBar;
