"use client";

import React, { useEffect, useState } from "react";
import DesktopNavBar from "@/components/navbars/DesktopNavBar";
import MobileNavBar from "@/components/navbars/MobileNavBar";
import NavbarHeader from "@/components/ui/NavbarHeader";
import UserCards from "@/components/ui/UserCards";
import CardPostModal from "@/components/inputs/cardTestInput";
import { IUserCardType } from "@/components/utils/Interface";
import cardData from "@/data/cardData.json";

const typedUserCards: IUserCardType[] = cardData;

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

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
        <div className="mx-40 text-white">
          <h1 className="text-[30px] pb-10">Recent Posted Routes</h1>
          <div className="grid grid-cols-1 2xl:grid-cols-3 lg:grid-cols-2 gap-4 place-items-center mb-10 mx-40 sm:mx-20 max-w-full no-shrink">
            {typedUserCards.map((card, index) => (
              <UserCards key={index} card={card} />
            ))}
          </div>

          <hr />

          <h1 className="text-[30px] pb-10">Recent Posted Pictures</h1>
          <div className="grid grid-cols-1 2xl:grid-cols-3 lg:grid-cols-2 gap-4 place-items-center mb-10 mx-40 sm:mx-20 max-w-full no-shrink">
            {typedUserCards.map((card, index) => (
              <UserCards key={index} card={card} />
            ))}
          </div>
        </div>

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
