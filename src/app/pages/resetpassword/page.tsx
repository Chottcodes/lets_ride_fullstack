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
    <div className="w-full h-screen ">
      <div className="h-[5%] w-full mt-6 pl-4">
        <BackButtonComponent onClick={handleOnClick} />
      </div>
      <div className="w-full h-[30%] flex flex-col justify-center items-center gap-4 text-white text-3xl">
        <h1>
          LETS<span className="text-[#506FFD]"> RIDE</span>
        </h1>
        <h5>Reset Password</h5>
      </div>
      <div className="w-full  h-[40%] flex justify-center">
        <EmailAndPassword />
      </div>
      <div className="w-[90%] h-[9%] m-auto">
        <PrimaryButton buttonText="Next" isBackgroundDark={isDark} />
      </div>
    </div>
  );
};

export default page;
