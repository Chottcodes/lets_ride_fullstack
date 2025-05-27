"use client";
import MapDisplay from "@/components/mapDisplay";
import UserRoutesCard from "@/components/ui/UserRoutesCard";
import { GetRoute } from "@/components/utils/DataServices";
import { GetLocalStorageId } from "@/components/utils/helperFunctions";
import { GetRoutes } from "@/components/utils/Interface";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MapPage = () => {
  const [activeTab, setActiveTab] = useState("map");
  const [allRoutes, setAllRoutes] = useState<GetRoutes[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewportHeight, setViewportHeight] = useState(0);
  const pageSize = 4;

  const [isLoading, setIsLoading] = useState(true);

  // Handle dynamic viewport height for mobile
  useEffect(() => {
    const updateViewportHeight = () => {
      // Use the smaller of window.innerHeight and visualViewport.height for mobile compatibility
      const height = window.visualViewport 
        ? Math.min(window.innerHeight, window.visualViewport.height)
        : window.innerHeight;
      setViewportHeight(height);
      
      // Set CSS custom property for dynamic height
      document.documentElement.style.setProperty('--viewport-height', `${height}px`);
    };

    updateViewportHeight();
    
    // Listen for both resize and visual viewport changes
    window.addEventListener('resize', updateViewportHeight);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateViewportHeight);
    }

    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateViewportHeight);
      }
    };
  }, []);

  // Switch between map and community views
  const handleTabChange = (tab: string) => {
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
          const res = await GetRoute(userId, currentPage, pageSize);
          setAllRoutes(res);
        } catch (error) {
          console.error("Error fetching routes:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchRoutes();
  }, [activeTab, userId, currentPage]);

  const publicRoutes = allRoutes.filter((route) => route.isPrivate === false);

  return (
    <div 
      className="flex flex-col w-full bg-gray-50 lg:pb-0 overflow-hidden"
      style={{
        height: viewportHeight ? `${viewportHeight}px` : '100vh',
        maxHeight: viewportHeight ? `${viewportHeight}px` : '100vh'
      }}
    >
      {/* Header with Navigation Tabs */}
      <header className="bg-gray-800 shadow-md w-full py-3 px-4 flex-shrink-0 min-h-0">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Route <span className="text-blue-600">Explorer</span></h1>

          <div className="flex gap-2 sm:gap-4">
            <button
              onClick={() => handleTabChange("map")}
              className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-all text-sm sm:text-base lg:hidden ${
                activeTab === "map"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              } lg:${
                activeTab === "map"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Map
            </button>
            <button
              onClick={() => handleTabChange("community")}
              className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
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

      <main className="flex flex-1 w-full min-h-0 overflow-hidden">
        {/* Map Section */}
        <div
          className={`${
            activeTab === "map" ? "flex" : "hidden lg:flex"
          } w-full lg:w-1/2 h-full min-h-0`}
        >
          <div className="w-full h-full">
            <MapDisplay />
          </div>
        </div>

        {/* Community Routes Section */}
        <div
          className={`${
            activeTab === "community" ? "flex" : "hidden lg:flex"
          } w-full lg:w-1/2 flex-col h-full bg-gray-800 min-h-0 overflow-hidden`}
        >
          <div className="flex flex-col h-full p-3 sm:p-4">
            {/* Header & Pagination */}
            <div className="flex justify-between items-center mb-3 sm:mb-4 flex-shrink-0">
              <h2 className="text-base sm:text-lg font-semibold text-white">
                Community Routes
              </h2>

              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1 || isLoading}
                  className="text-white bg-gray-600 p-1.5 sm:p-2 rounded-full disabled:opacity-30 hover:bg-gray-500"
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={14} className="sm:w-4 sm:h-4" />
                </button>
                <span className="text-white text-xs sm:text-sm px-1 sm:px-2">
                  Page {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={isLoading || publicRoutes.length < pageSize}
                  className="text-white bg-gray-600 p-1.5 sm:p-2 rounded-full disabled:opacity-30 hover:bg-gray-500"
                  aria-label="Next Page"
                >
                  <ChevronRight size={14} className="sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Content with proper scrolling */}
            <div className="flex-1 min-h-0 overflow-hidden">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-600"></div>
                </div>
              ) : publicRoutes.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <p className="text-sm sm:text-base">No community routes available</p>
                </div>
              ) : (
                <div className="h-full overflow-y-auto overscroll-contain">
                  <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2 pb-4">
                    {publicRoutes.map((route) => (
                      <div key={route.id} className="h-fit">
                        <UserRoutesCard {...route} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile notice on desktop - positioned to avoid overlap */}
      <div className="hidden lg:block fixed bottom-4 right-4 bg-gray-100 p-3 rounded-lg shadow-md max-w-xs">
        <p className="text-gray-600 text-xs sm:text-sm">
          Route creation is only available on mobile
        </p>
      </div>
    </div>
  );
};

export default MapPage;