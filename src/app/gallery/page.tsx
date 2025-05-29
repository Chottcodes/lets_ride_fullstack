"use client";

import React from "react";
// import DesktopNavBar from "@/components/navbars/DesktopNavBar";
// import MobileNavBar from "@/components/navbars/MobileNavBar";
// import NavbarHeader from "@/components/ui/NavbarHeader";
// import UserCards from "@/components/ui/UserCards";

// import { IUserCardType } from "@/components/utils/Interface";
// import OpenPostModal from "@/components/inputs/cardTestInput";


// import UserRoutesCard from "@/components/ui/UserRoutesCard";


// const typedUserCards: IUserCardType[] = cardData;
// const typedUserRoutes: IUserCardType[] = cardRoute;

const Page = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [userId, setUserId] = useState<number | null>(null);

//   // Drag Scroll Wheel
  

//   // For Push Fetch
//     const [userCardsDataArr, setUserCardsDataArr] = useState<IUserCardType[]>([]);
  
//   // Data population
//   useEffect(() => {
//     const fetchPosts = async () => {
//     //   const res = await getGalleryPosts();
//       const data = await res;
//       setUserCardsDataArr(data);
//     };

//     fetchPosts();
//   }, []);


//   useEffect(() => {
//     const storedId = localStorage.getItem("ID");
//     if (storedId) setUserId(Number(storedId));
//   }, []);

  return (
    <div className="">
      {/* <div className="sm:w-full md:w-20 lg:w-full w-full">
       
        <div className="fixed top-0 left-0 min-h-screen w-19">
          <DesktopNavBar
            
          />
        </div> */}

        {/* Header */}
       

        {/* Modal Trigger  */}
        {/* <div className="flex justify-start ms-40 pb-10">
          
          {userId !== null && (
            <OpenPostModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
          )}
        </div> */}

        {/* Card Sections */}
        {/* <section className="mx-40 overflow-x-auto scroll-smooth scrollbar-hide mb-10">

          <h1 className="text-[30px] pb-10 text-white">Recent Posted Routes</h1>
          <div className="overflow-x-auto custom-scrollbar mb-10">
            <div className="flex gap-4 px-10 min-w-fit">
              {userCardsDataArr.map((card, index) => (
                <div className="min-w-[350px] flex-shrink-0" key={index}>
                  <UserRoutesCard LikesNumber={0} RouteName={""} RouteDate={undefined} ProfileName={""} RouteStartingPoint={undefined} TrailCoords={undefined} />
                </div>
              ))}
            </div>
          </div>

          <h1 className="text-[30px] pb-10 text-white">
            Recent Posted Pictures
          </h1>
          <div className="overflow-x-auto custom-scrollbar mb-10">
            <div className="flex gap-4 px-10 min-w-fit">
              {Array.isArray(userCardsDataArr) && userCardsDataArr.map((card, index) => (
                <div className="min-w-[350px] flex-shrink-0" key={index}>
                  <UserCards imageUrl={card.imageUrl} title={card.title} description={card.description} dateCreated={card.dateCreated} username={card.username}/>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* For Grid: grid grid-cols-1 2xl:grid-cols-3 lg:grid-cols-2 gap-4 place-items-center mb-10 mx-40 sm:mx-20 max-w-full no-shrink" */}

        {/* Bottom Mobile Nav */}
        {/* <div>
          <MobileNavBar
            
          />
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default Page;
