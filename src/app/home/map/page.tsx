"use client";
import MapDisplay from "@/components/mapDisplay";
import UserRoutesCard from "@/components/ui/UserRoutesCard";
import { GetRoute } from "@/components/utils/DataServices";
import { RouteGetForCardTypes,} from "@/components/utils/Interface";
import React, { useEffect, useState } from "react";

const MapPage = () => {
  const [isMapOn, setIsMapOn] = useState(true);
  const [allRoutes, setAllRoutes] = useState<RouteGetForCardTypes[]>([]);

  const handleMapButton = () => {
    setIsMapOn(true);
  };
  const handleCommunityButton = () => {
    setIsMapOn(false);
  };
  useEffect(() => {
    if (isMapOn === false) {
      const getUsersRoutes = async () => {
        try {
          const res = await GetRoute();
          setAllRoutes(res);
        } catch (error) {
          console.error("Error fetching routes:", error);
        }
      };
      getUsersRoutes();
    }
  }, [isMapOn]);
  useEffect(() => {
    console.log(allRoutes);
  },[allRoutes]);

  return (
    <div className="h-[100dvh] w-full relative overflow-hidden">
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

        <section className={`${isMapOn ? "hidden" : "block"} w-full h-full flex justify-center items-center `}>
          <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="w-[90%] h-[10%] text-white flex items-center ">
              <p>Recent</p>
            </div>
            <div className="flex flex-col items-center w-full h-[90%]">
              <div className="w-[90%] h-full overflow-y-scroll flex flex-col gap-5 pb-32">
                {allRoutes .filter(route => route.isPrivate === false).map((route, index) => {
                  return (
                    <div key={index} className="w-full h-[90%]">
                      <UserRoutesCard
                        key={index}
                        LikesNumber={0}
                        UserprofilePicture={route.creator.profilePicture}
                        ProfileName={route.creator.userName}
                        RouteImage={route.imageUrl}
                        RouteName={route.routeName}
                        RouteDate={route.dateCreated}
                        RouteDescription={route.routeDescription} 
                        RouteStartingPoint={[route.pathCoordinates[0].longitude, route.pathCoordinates[0].latitude]}
                        TrailCoords={route.pathCoordinates.map(coord => [coord.longitude, coord.latitude])}                      />
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
