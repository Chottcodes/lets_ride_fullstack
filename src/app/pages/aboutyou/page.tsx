"use client";
import HandleFileInput from "@/components/HandleFileInput";
import React from "react";
import { AboutYouComponent } from "@/components/AboutYouComponent";

const page = () => {
  return (
    <div className="text-white h-screen">
      <div className="w-full h-[10%] flex items-end justify-center">
        <h1 className="text-4xl ">
          Tell Us About <span className="text-[#506FFD]">Your Ride</span>
        </h1>
      </div>
      <div className="w-full h-[20%] flex flex-col justify-center items-center gap-2 mt-10 ">
        <div className="relative h-34 w-34 rounded-50 border-2">
          <HandleFileInput />
        </div>
        <h5>Add Profile Pictures</h5>
      </div>
      <div className="w-[100%] h-[55%] flex justify-center items-center">
        <div className="w-[80%] h-full">
        <AboutYouComponent/>

        </div>
      </div>
    </div>
  );
};

export default page;
