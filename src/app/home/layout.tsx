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
      <div className="flex h-full relative">
        {/* Desktop Sidebar - will only show on lg screens */}
        <div className="hidden lg:block">
          <DesktopNavBar />
        </div>
        
        {/* Main Content - will take remaining width */}
        <main className="flex-1 h-full overflow-auto">
          {children}
        </main>
        
        {/* Mobile Navigation - will only show below lg screens */}
        <div className="lg:hidden fixed bottom-0 left-0 w-full h-[64px] bg-black flex justify-center items-center z-50">
          <MobileNavBar />
        </div>
      </div>
    </div>
  );
}