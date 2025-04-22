"use client";
import MapDisplay from "@/components/mapDisplay";
import UserRoutesCard from "@/components/ui/UserRoutesCard";
import React, { useState } from "react";

const MapPage = () => {
  const [isMapOn, setIsMapOn] = useState(true);

  const handleMapButton = () => {
    setIsMapOn(true);
  };
  const handleCommunityButton = () => {
    setIsMapOn(false);
  };

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
        <div className={`${isMapOn ? "block" : "hidden"} lg:hidden w-full h-[80%] `}>
          <MapDisplay />
        </div>

        <section
          className={`${
            isMapOn ? "hidden" : "block"
          } w-full h-[95%]`}
        >
          <div className="h-[90%] w-full text-white ">
            <title className="w-full h-[10%] flex items-center">
              <p>Recent</p>
            </title> 
            <div className="flex flex-col items-center overflow-y-auto gap-4 w-full h-[90%]">
              <div className="flex-shrink-0 w-[90%] h-[65%]">
                <UserRoutesCard />
              </div>
            </div>
          </div>
        </section>



      </main>
    </div>
  );
};

export default MapPage;
