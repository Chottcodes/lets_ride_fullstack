import React from "react";
import MobileNavBar from "@/components/navbars/MobileNavBar";
import DesktopNavBar from "@/components/navbars/DesktopNavBar";


export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex flex-col h-full relative">
        {/* Desktop Sidebar - will only show on lg screens */}
        <div className="w-full h-[10%] hidden lg:block">
          <DesktopNavBar />
        </div>
        
        {/* Main Content - will take remaining width */}
        <main className="flex-1 h-full overflow-auto">
          {children}
        </main>
        
        {/* Mobile Navigation - will only show below lg screens */}
        <div className="lg:hidden w-full bg-red-500  flex justify-center items-center">
          <MobileNavBar />
        </div>
      </div>
    </div>
  );
}