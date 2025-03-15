"use client";
import BackButtonComponent from "@/components/BackButtonComponent";
import React, { useEffect, useState } from "react";
import EmailAndPassword from "@/components/EmailAndPassword";
import PrimaryButton from "@/components/PrimaryButton";

const page = () => {
  const [isDark, setIsDark] = useState(true);
  const handleOnClick = () => {
    console.log("hello");
  };
  return (
    <div className="w-full h-screen fixed">
      <div className="h-[5%] w-full mt-6 pl-4">
        <BackButtonComponent onClick={handleOnClick} />
      </div>
      <div className="w-full h-[30%] flex flex-col justify-center items-center gap-4 text-white text-3xl">
        <h1>
          LETS<span className="text-[#506FFD]"> RIDE</span>
        </h1>
        <h5>Reset Password</h5>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-[90%] h-[40%] flex justify-center">
          <EmailAndPassword />
        </div>
      </div>
      <div className="w-full h-[10%] flex items-center justify-center mt-15">
        <div className="w-[90%] h-full">
          <PrimaryButton buttonText="Next" isBackgroundDark={isDark} />
        </div>
      </div>
    </div>
  );
};

export default page;
