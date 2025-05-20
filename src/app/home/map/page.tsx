"use client";
import MapDisplay from "@/components/mapDisplay";
import UserRoutesCard from "@/components/ui/UserRoutesCard";
import { GetRoute } from "@/components/utils/DataServices";
import { GetLocalStorageId } from "@/components/utils/helperFunctions";
import { GetRoutes } from "@/components/utils/Interface";
import React, { useEffect, useState } from "react";

const MapPage = () => {
  const [activeTab, setActiveTab] = useState("map");
  const [allRoutes, setAllRoutes] = useState<GetRoutes[]>([]);
  const [userId, setUserId] = useState<number>(0);
 
  const [isLoading, setIsLoading] = useState(true);

  // Switch between map and community views
  const handleTabChange = (tab:string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // Get user ID from local storage
   const getInfo = GetLocalStorageId();
  if (getInfo && getInfo > 0) {
    setUserId(getInfo);
  } else {
    setUserId(0);
  }
    

    // Set default view based on screen size
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // On larger screens, show both map and community routes
        setActiveTab("community");
      } else {
        // On mobile, default to map view
        setActiveTab("map");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
  const fetchRoutes = async () => {

    if (activeTab === "community" || window.innerWidth >= 1024) {
      setIsLoading(true);
      try {
        const res = await GetRoute(userId);
        setAllRoutes(res);
      } catch (error) {
        console.error("Error fetching routes:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  fetchRoutes();
}, [activeTab, userId]);

  const publicRoutes = allRoutes.filter((route) => route.isPrivate === false);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-gray-50 pb-[80px] lg:pb-0">
      {/* Header with Navigation Tabs */}
      <header className="bg-gray-700 shadow-md w-full py-4 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Route Explorer</h1>
          
          <div className="flex gap-4">
            <button
              onClick={() => handleTabChange("map")}
              className={`px-6 py-2 rounded-lg font-medium transition-all lg:hidden ${
                activeTab === "map"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              } lg:${activeTab === "map" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
            >
              Map
            </button>
            <button
              onClick={() => handleTabChange("community")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === "community"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Community
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 w-full overflow-hidden">
        {/* Map Section */}
        <div 
          className={`${
            activeTab === "map" ? "flex" : "hidden lg:flex"
          } w-full lg:w-1/2 h-full`}
        >
          <div className="w-full h-full">
            <MapDisplay />
          </div>
        </div>

        {/* Community Routes Section */}
        <div 
          className={`${
            activeTab === "community" ? "flex" : "hidden lg:flex"
          } w-full lg:w-1/2 flex-col h-full bg-gray-800`}
        >
          <div className="p-4 overflow-y-hidden h-full"> 
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Community Routes</h2>
              <div className="text-sm text-white">
                {publicRoutes.length} {publicRoutes.length === 1 ? 'route' : 'routes'} available
              </div> 
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            ) : publicRoutes.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <p>No community routes available</p>
              </div>
            ) : (
              <div className="overflow-y-auto h-full pb-15 grid gap-4 grid-cols-1 md:grid-cols-2">
                {publicRoutes.map((route) => (
                  <div key={route.id} className="h-full ">
                    <UserRoutesCard {...route}  />
                  </div> 
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile notice on desktop */}
      <div className="hidden lg:block fixed bottom-0 right-0 bg-gray-100 p-4 m-4 rounded-lg shadow-md">
        <p className="text-gray-600 text-sm">Route creation is only available on mobile</p>
      </div>
    </div>
  );
};

export default MapPage;