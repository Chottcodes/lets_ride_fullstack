"use client";

import React, { useEffect, useState, useRef } from "react";
import DesktopNavBar from "@/components/navbars/DesktopNavBar";
import MobileNavBar from "@/components/navbars/MobileNavBar";
import NavbarHeader from "@/components/ui/NavbarHeader";
import UserCards from "@/components/ui/UserCards";
import CardPostModal from "@/components/inputs/cardTestInput";
import { IUserCardType } from "@/components/utils/Interface";
import cardData from "@/data/cardData.json";
import cardRoute from "@/data/CardRoute.json";
import UserRoutesCard from "@/components/ui/UserRoutesCard";

const typedUserCards: IUserCardType[] = cardData;
const typedUserRoutes: IUserCardType[] = cardRoute;

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  // Drag Scroll Wheel
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // For Push Fetch
  //   const [userCards, setUserCards] = useState<IUserCardType[]>([]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await fetch(url + "RideTables/GetGalleryPosts");
  //     const data = await res.json();
  //     setUserCards(data);
  //   };

  //   fetchPosts();
  // }, []);

  useEffect(() => {
    const storedId = localStorage.getItem("ID");
    if (storedId) setUserId(Number(storedId));
  }, []);

  return (
    <div className="">
      <div className="sm:w-full md:w-20 lg:w-full w-full">
        {/* Left Nav */}
        <div className="fixed top-0 left-0 min-h-screen w-19">
          <DesktopNavBar
            isHomeOn={false}
            isLocationOn={false}
            isGalleryOn={true}
            isProfileOn={false}
          />
        </div>

        {/* Header */}
        <NavbarHeader
          isRoutes={false}
          isYourLikes={true}
          isMyPictures={false}
          isMyRoutes={false}
        />

        {/* Modal Trigger + Modal */}
        <div className="ms-40">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded mb-4 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            + Add Ride Post
          </button>

          {userId !== null && (
            <CardPostModal
              userId={userId}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>

        {/* Card Sections */}
        <section className="mx-40 overflow-x-auto scroll-smooth scrollbar-hide mb-10">

          <h1 className="text-[30px] pb-10 text-white">Recent Posted Routes</h1>
          <div className="overflow-x-auto custom-scrollbar mb-10">
            <div className="flex gap-4 px-10 min-w-fit">
              {typedUserRoutes.map((card, index) => (
                <div className="min-w-[350px] flex-shrink-0" key={index}>
                  <UserRoutesCard card={card} />
                </div>
              ))}
            </div>
          </div>

          <h1 className="text-[30px] pb-10 text-white">
            Recent Posted Pictures
          </h1>
          <div className="overflow-x-auto custom-scrollbar mb-10">
            <div className="flex gap-4 px-10 min-w-fit">
              {typedUserCards.map((card, index) => (
                <div className="min-w-[350px] flex-shrink-0" key={index}>
                  <UserCards card={card} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* For Grid: grid grid-cols-1 2xl:grid-cols-3 lg:grid-cols-2 gap-4 place-items-center mb-10 mx-40 sm:mx-20 max-w-full no-shrink" */}

        {/* Bottom Mobile Nav */}
        <div>
          <MobileNavBar
            isHomeOn={true}
            isLocationOn={false}
            isGalleryOn={false}
            isProfileOn={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
