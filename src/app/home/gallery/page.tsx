"use client";

import React, { useEffect, useState, useRef } from "react";
import NavbarHeader from "@/components/ui/NavbarHeader";
import UserCards from "@/components/ui/UserCards";
import { IUserCardType, RouteGetTypes } from "@/components/utils/Interface";
import OpenPostModal from "@/components/inputs/cardTestInput";

import { getGalleryPosts } from "@/components/utils/DataServices";

// const typedUserCards: IUserCardType[] = cardData;
// const typedUserRoutes: IUserCardType[] = cardRoute;

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  // Drag Scroll Wheel

  // For Push Fetch
  const [userCardsDataArr, setUserCardsDataArr] = useState<IUserCardType[]>([]);
 

  // Data population (commented out for dummy data)
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getGalleryPosts();
      const data = await res;
      console.log(data);
      setUserCardsDataArr(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const storedId = localStorage.getItem("ID");
    if (storedId) setUserId(Number(storedId));
  }, []);

  return (
    <div className="h-[100dvh] w-full">
      <header>
        <NavbarHeader />
      </header>
        <section className="w-[90%] h-[10%] m-auto flex justify-between items-center">
          <h1 className="text-[30px] text-white ">Gallery</h1>
          <div className="hidden lg:flex">
            {userId !== null && (
              <OpenPostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            )}
          </div>
        </section>
      <main className="sm:w-full lg:w-full lg:h-full flex justify-center">
        <section className="w-[90%] h-[50%]">
          <div className="w-[30%] flex flex-row gap-2 ">
            {
              userCardsDataArr.map((card, index) => (
                <div className="w-[90%] h-[50%] flex-shrink-0" key={index}>
                  <UserCards
                    imageUrl={card.imageUrl}
                    UserprofilePicture={card.creator.profilePicture}
                    title={card.title}
                    // description={card.description}
                    description='sdfgggggggggggggggggggggggggggggggggggfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg'
                    dateCreated={new Date(
                      card.dateCreated
                    ).toLocaleDateString("en-CA")}
                    UserProfileName={card.creator.userName} username={""}                  />
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;
