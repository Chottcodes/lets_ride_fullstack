"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Home, MapPin, Image as GalleryIcon } from "lucide-react";
import { useProfilePicture } from "@/hooks/useProfilePicture";

const MobileNavBar = () => {
  const [isHomeOn, setIsHomeOn] = useState<boolean>(true);
  const [isLocationOn, setIsLocationOn] = useState<boolean>(false);
  const [isGalleryOn, setIsGalleryOn] = useState<boolean>(false);
  const [isProfileOn, setIsProfileOn] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const pathname = usePathname();
  const profilePicture = useProfilePicture();
  const { push } = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-hide functionality
  const startAutoHideTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 3000); // Hide after 3 seconds
  }, []);

  const resetAutoHideTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (isExpanded) {
      startAutoHideTimer();
    }
  }, [isExpanded, startAutoHideTimer]);

  const handleProfileToggle = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      startAutoHideTimer();
    } else if (!isProfileOn) {
      handleProfileButton();
    }
  };

  const handleHomeButton = () => {
    setIsHomeOn(true);
    setIsLocationOn(false);
    setIsGalleryOn(false);
    setIsProfileOn(false);
    push("/home");
    resetAutoHideTimer();
  };

  const handleLocationButton = () => {
    setIsHomeOn(false);
    setIsLocationOn(true);
    setIsGalleryOn(false);
    setIsProfileOn(false);
    push("/home/map");
    resetAutoHideTimer();
  };

  const handleGalleryButton = () => {
    setIsHomeOn(false);
    setIsLocationOn(false);
    setIsGalleryOn(true);
    setIsProfileOn(false);
    push("/home/gallery");
    resetAutoHideTimer();
  };

  const handleProfileButton = () => {
    setIsHomeOn(false);
    setIsLocationOn(false);
    setIsGalleryOn(false);
    setIsProfileOn(true);
    push("/home/profile");
    resetAutoHideTimer();
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

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
   <div className="lg:hidden">
  {/* Floating Profile Picture (always visible) */}
  <div className="fixed bottom-6 right-6 z-20">
    <button
      onClick={handleProfileToggle}
      className={`transition-all duration-300 ease-out hover:scale-105 active:scale-95  ${
        isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative">
        <div
          className={`w-14 h-14 rounded-full overflow-hidden shadow-2xl border-2 transition-all duration-200 ${
            isProfileOn
              ? "border-blue-400 shadow-blue-400/20"
              : "border-white/20 shadow-black/50"
          }`}
        >
          <Image
            className="w-full h-full object-cover"
            src={profilePicture ?? "/assets/images/defaultPicture.png"}
            width={56}
            height={56}
            alt="Profile"
          />
        </div>
        <div className="absolute inset-0 rounded-full bg-white/10 animate-ping opacity-20"></div>

        {(isHomeOn || isLocationOn || isGalleryOn || isProfileOn) && (
          <div
            className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-black transition-colors ${
              isHomeOn
                ? "bg-blue-400"
                : isLocationOn
                ? "bg-green-400"
                : isGalleryOn
                ? "bg-purple-400"
                : "bg-blue-400"
            }`}
          ></div>
        )}
      </div>
    </button>
  </div>

  {/* Expanded Navbar (only rendered when expanded) */}
  {isExpanded && (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={() => setIsExpanded(false)}
      />

      {/* Floating Nav */}
      <div
        className="fixed bottom-6 right-6 z-50 transition-all duration-300 ease-out"
        style={{
          marginBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div className="flex items-center gap-3 bg-black/90 backdrop-blur-xl rounded-full px-4 py-3 shadow-2xl border border-white/10">
          <button
            onClick={handleHomeButton}
            className="p-2 rounded-full transition-all duration-200 hover:bg-white/10 active:scale-95"
          >
            <Home
              className={`w-6 h-6 transition-colors ${
                isHomeOn ? "text-blue-400" : "text-white/80"
              }`}
            />
          </button>
          <button
            onClick={handleLocationButton}
            className="p-2 rounded-full transition-all duration-200 hover:bg-white/10 active:scale-95"
          >
            <MapPin
              className={`w-6 h-6 transition-colors ${
                isLocationOn ? "text-blue-400" : "text-white/80"
              }`}
            />
          </button>
          <button
            onClick={handleGalleryButton}
            className="p-2 rounded-full transition-all duration-200 hover:bg-white/10 active:scale-95"
          >
            <GalleryIcon
              className={`w-6 h-6 transition-colors ${
                isGalleryOn ? "text-blue-400" : "text-white/80"
              }`}
            />
          </button>
          <button
            onClick={handleProfileButton}
            className={`relative p-1 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 ${
              isProfileOn
                ? "ring-2 ring-blue-400 ring-offset-2 ring-offset-black/90"
                : ""
            }`}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                className="w-full h-full object-cover"
                src={profilePicture ?? "/assets/images/defaultPicture.png"}
                width={32}
                height={32}
                alt="Profile"
              />
            </div>
          </button>
        </div>
      </div>
    </>
  )}
</div>

  );
};

export default MobileNavBar;