'use client'
import MapDisplay from "@/components/mapDisplay";
import MobileNavBar from "@/components/navbars/MobileNavBar";
import React, { useState } from "react";


const MapPage = () => {
  const[isMapOn, setIsMapOn] = useState(true);

  const handleMapButton = () => {
    setIsMapOn(true);
  }
  const handleCommunityButton = () => {
    setIsMapOn(false);
  }


  return (
    <div className="h-screen relative">
      <header className="bg-blue-700/5 backdrop-blur-2xl w-full h-[10%] flex justify-evenly items-center">
        <button onClick={handleMapButton} className={`${isMapOn?"text-blue-600":"text-white"} cursor-pointer`}>Map</button>
        <button onClick={handleCommunityButton} className={`${isMapOn?"text-white":"text-blue-600"} cursor-pointer `}>Community routes</button>
      </header>
      <main className="w-full h-[70%] relative">
        <div className="w-full h-full">
          <MapDisplay />
        </div>
      </main>
      <footer className="w-full h-[10%] flex items-center"> 
        <MobileNavBar
          isHomeOn={false}
          isLocationOn={true}
          isGalleryOn={false}
          isProfileOn={false}
        />
      </footer>
    </div>
  );
};

export default MapPage;
