import MapDisplay from "@/components/mapDisplay";
import MobileNavBar from "@/components/navbars/MobileNavBar";
import React from "react";

const page = () => {
  return (
    <div className="h-screen relative">
      <header className="bg-blue-700/5 backdrop-blur-2xl w-full h-[10%] flex justify-center items-center">
        <button className="cursor-pointer text-white">Community routes</button>
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

export default page;
