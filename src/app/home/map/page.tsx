"use client";
import MapDisplay from "@/components/mapDisplay";
import UserRoutesCard from "@/components/ui/UserRoutesCard";
import {
  
  // AddLike,
  GetRoute,
} from "@/components/utils/DataServices";
import { GetLocalStorageId } from "@/components/utils/helperFunctions";
import {

  // LikesRoutesModel,
  RouteGetForCardTypes,
} from "@/components/utils/Interface";
import React, { useEffect, useState } from "react";

const MapPage = () => {
  const [isMapOn, setIsMapOn] = useState(true);
  const [allRoutes, setAllRoutes] = useState<RouteGetForCardTypes[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const [likedRoutes, setLikedRoutes] = useState<Set<number>>(new Set());
  console.log(likedRoutes)
  const handleMapButton = () => {
    setIsMapOn(true);
  };
  const handleCommunityButton = () => {
    setIsMapOn(false);
  };
  // const LikeRoute = async (routeId: number) => {
  //   const likeObj: LikesRoutesModel = {
  //     UserId: userId,
  //     RouteId: routeId,
  //     IsDeleted: false,
  //   };
  //   const response = await AddLike(likeObj);
  //   if (response) {
  //     console.log("Like added successfully");
  //   } else {
  //     console.error("Error adding like");
  //   }
  // };

  // const handleLikes = (routeId: number) => {
  //   LikeRoute(routeId);
  //   setLikedRoutes((prev) => new Set(prev).add(routeId));
  // };
  useEffect(() => {
    const getInfo = GetLocalStorageId();
    if (getInfo) setUserId(getInfo);
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMapOn(false);
      } else {
        setIsMapOn(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMapOn && userId !== 0) {
      const getUsersRoutes = async () => {
        try {
          const res = await GetRoute();
          setAllRoutes(res);

          const likedByUser = new Set<number>();
          res.forEach((route: RouteGetForCardTypes) => {
            route.likes.forEach((like) => {
              if (like.userId === userId && !like.isDeleted) {
                likedByUser.add(route.id);
              }
            });
          });
          setLikedRoutes(likedByUser);
        } catch (error) {
          console.error("Error fetching routes:", error);
        }
      };
      getUsersRoutes();
    }
  }, [isMapOn, userId]);

  return (
    <div className="h-[100dvh] w-full relative overflow-hidden">
      <div className="w-full h-[10%] fixed bottom-0 flex justify-end items-center text-gray-500">
        <p className="pe-30">Route creation is only available on mobile</p>
      </div>
      <header className="bg-blue-700/5 backdrop-blur-2xl w-full h-[10%] flex justify-evenly items-center">
        <button
          onClick={handleMapButton}
          className={`${
            isMapOn ? "text-blue-600" : "text-white"
          } cursor-pointer lg:hidden`}
        >
          Map
        </button>
        <button
          onClick={handleCommunityButton}
          className={`${
            isMapOn ? "text-white" : "text-blue-600"
          } cursor-pointer `}
        >
          Community routes
        </button>
      </header>

      <main className="w-full h-full relative">
        <div
          className={`${
            isMapOn ? "block" : "hidden"
          } lg:hidden w-full h-[80%] `}
        >
          <MapDisplay />
        </div>

        <section
          className={`${
            isMapOn ? "hidden" : "block"
          } w-full h-full flex justify-center items-center `}
        >
          <div className="h-full w-full flex flex-col justify-center items-center ">
            <div className="flex flex-col items-center w-full h-[90%] overflow-y-scroll ">
              <div className="w-[90%]  flex flex-1 flex-col lg:flex-row justify-center lg:overflow-x-auto gap-5 pb-32 ">
                {allRoutes
                  .filter((route) => route.isPrivate === false)
                  .map((route, index) => {
                    // const handleCommentSubmit = async (commentText: string) => {
                    //   if (commentText) {
                    //     const CommentsOBj: CommentsModelRoute = {
                    //       UserId: userId,
                    //       RouteId: route.id,
                    //       CommentText: commentText,
                    //       IsDeleted: false,
                    //     };
                    //     const response = await AddCommentRoute(CommentsOBj);
                    //     console.log(response);
                    //   }
                    // };
                    return (
                      <div
                        key={index}
                        className="w-full min-h-[350px] lg:w-[25%] lg:h-[70%] "
                      >
                        <UserRoutesCard
                          key={index}
                          {...route}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MapPage;
