"use client";

import React, { useEffect, useState } from "react";

import NavbarHeader from "@/components/ui/NavbarHeader";
import UserCards from "@/components/ui/UserCards";

import { IUserCardType} from "@/components/utils/Interface";
import OpenPostModal from "@/components/inputs/cardTestInput";

import cardData from "@/data/cardData.json" assert { type: "json" };


// const typedUserCards: IUserCardType[] = cardData;
// const typedUserRoutes: IUserCardType[] = cardRoute;

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  

  // Drag Scroll Wheel 


  // For Push Fetch
    const [userCardsDataArr, setUserCardsDataArr] = useState<IUserCardType[]>([]);
    useEffect(()=>{
      setUserCardsDataArr(cardData as IUserCardType[])
    },[])

  // Data population (commented out for dummy data)
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await getGalleryPosts();
  //     const data = await res;
  //     console.log(data);
  //     setUserCardsDataArr(data);
  //   };

  //   fetchPosts();
  // }, []);


  useEffect(() => {
    const storedId = localStorage.getItem("ID");
    if (storedId) setUserId(Number(storedId));
  }, []);

  return (
    <div className="mt-10 ">
      <div className="sm:w-full lg:w-full w-full ">
        {/* Left Nav */}
        {/* <div className="fixed top-0 left-0 min-h-screen w-19">
          <DesktopNavBar
          />
        </div> */}

        {/* Header */}
        <NavbarHeader/>

        {/* Upload*/}
          <section className="flex justify-between sm:mx-40 mx-0 pb-10">
            <h1 className="text-[30px] text-white ">Recent Post</h1>
          {/* Modal */}
          <div className="hidden lg:flex">
          {userId !== null && (
            <OpenPostModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
          )}
        </div>
          </section>
          
          {/* Cards Section*/}
        <section className="sm:mx-40 mx-0 grid grid-rows-1 sm:grid-rows-2 md:grid-rows-2 overflow-x-auto custom-scrollbar">
          <div className="flex gap-4 sm:px-10 px-0 min-w-fit">
            {/* <div className="flex gap-4 px-10 min-w-fit">
              {userCardsDataArr.map((card, index) => (
                <div className="min-w-[350px] flex-shrink-0" key={index}>
                  <UserRoutesCard card={card} />
                </div>
              ))}
            </div> */}
            {Array.isArray(userCardsDataArr) && userCardsDataArr.map((card, index) => (
                <div className="min-w-[300px] flex-shrink-0" key={index}>
                  <UserCards imageUrl={card.imageUrl} title={card.title} description={card.description} dateCreated={card.dateCreated} username={card.username}/>
                </div>
              ))}
              {Array.isArray(userCardsDataArr) && userCardsDataArr.map((card, index) => (
                <div className="min-w-[350px] flex-shrink-0" key={index}>
                  <UserCards imageUrl={card.imageUrl} title={card.title} description={card.description} dateCreated={card.dateCreated} username={card.username}/>
                </div>
              ))}
              {Array.isArray(userCardsDataArr) && userCardsDataArr.map((card, index) => (
                <div className="min-w-[350px] flex-shrink-0" key={index}>
                  <UserCards imageUrl={card.imageUrl} title={card.title} description={card.description} dateCreated={card.dateCreated} username={card.username}/>
                </div>
              ))}
              {Array.isArray(userCardsDataArr) && userCardsDataArr.map((card, index) => (
                <div className="min-w-[350px] flex-shrink-0" key={index}>
                  <UserCards imageUrl={card.imageUrl} title={card.title} description={card.description} dateCreated={card.dateCreated} username={card.username}/>
                </div>
              ))}
              {Array.isArray(userCardsDataArr) && userCardsDataArr.map((card, index) => (
                <div className="min-w-[350px] flex-shrink-0" key={index}>
                  <UserCards imageUrl={card.imageUrl} title={card.title} description={card.description} dateCreated={card.dateCreated} username={card.username}/>
                </div>
              ))}
            
          </div>
          
          <div className="">
            <div className="flex gap-4 sm:px-10 px-0 min-w-fit">
              {Array.isArray(userCardsDataArr) && userCardsDataArr.map((card, index) => (
                <div className="min-w-[350px] flex-shrink-0" key={index}>
                  <UserCards imageUrl={card.imageUrl} title={card.title} description={card.description} dateCreated={card.dateCreated} username={card.username}/>
                </div>
              ))}
              {Array.isArray(userCardsDataArr) && userCardsDataArr.map((card, index) => (
                <div className="min-w-[350px] flex-shrink-0" key={index}>
                  <UserCards imageUrl={card.imageUrl} title={card.title} description={card.description} dateCreated={card.dateCreated} username={card.username}/>
                </div>
              ))}
              {Array.isArray(userCardsDataArr) && userCardsDataArr.map((card, index) => (
                <div className="min-w-[350px] flex-shrink-0" key={index}>
                  <UserCards imageUrl={card.imageUrl} title={card.title} description={card.description} dateCreated={card.dateCreated} username={card.username}/>
                </div>
              ))}
              {Array.isArray(userCardsDataArr) && userCardsDataArr.map((card, index) => (
                <div className="min-w-[350px] flex-shrink-0" key={index}>
                  <UserCards imageUrl={card.imageUrl} title={card.title} description={card.description} dateCreated={card.dateCreated} username={card.username}/>
                </div>
              ))}
              {Array.isArray(userCardsDataArr) && userCardsDataArr.map((card, index) => (
                <div className="min-w-[350px] flex-shrink-0" key={index}>
                  <UserCards imageUrl={card.imageUrl} title={card.title} description={card.description} dateCreated={card.dateCreated} username={card.username}/>
                </div>
              ))}
            </div>
          </div>
        </section>
            

        <div className="mb-20 flex lg:hidden">
          {userId !== null && (
            <OpenPostModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
