"use client";
import BackButtonComponent from "@/components/BackButtonComponent";
import React, { useEffect, useState } from "react";
import InputComponent from "@/components/InputComponent";
import PrimaryButton from "@/components/PrimaryButton";
import PasswordInputComponent from "@/components/PasswordInputComponent";

const page = () => {
  const [isDark, setIsDark] = useState(true);
  const [isPasswordVisiable,setIsPasswordVisiable]=useState(false)
    const togglePasswordVisibility = () => {
      setIsPasswordVisiable(prev => !prev)
  }
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
        <div className="w-[90%] h-[40%] flex flex-col justify-center gap-15">
        <InputComponent inputTitle="Email" imageSourcePath="/assets/images/mail1.png/" placeholderText="Enter Email" type="email" />
        <PasswordInputComponent  handleToggleFunction={togglePasswordVisibility} isPasswordVisible={isPasswordVisiable} placeHolderText="Enter New Password"/>
        <PasswordInputComponent handleToggleFunction={togglePasswordVisibility} isPasswordVisible={isPasswordVisiable} placeHolderText="Confirm Password"/>
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
