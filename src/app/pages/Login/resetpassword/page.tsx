"use client";
import BackButtonComponent from "@/components/BackButtonComponent";
import React, { useEffect, useState } from "react";
import InputComponent from "@/components/InputComponent";
import PrimaryButton from "@/components/PrimaryButton";
import PasswordInputComponent from "@/components/PasswordInputComponent";
import { useRouter } from "next/navigation";

const page = () => {
  const {push} = useRouter();
  const [isDark, setIsDark] = useState(true);
  const [isPasswordVisiable, setIsPasswordVisiable] = useState(false);
  const [isFieldEmpty, setIsFieldEmpty] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const togglePasswordVisibility = () => {
    setIsPasswordVisiable((prev) => !prev);
  };
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="h-[5%] w-full mt-6 pl-4">
        <BackButtonComponent onClick={() => push("./login-section")} />
      </div>
      <div className="w-full h-[30%] flex flex-col justify-center items-center gap-4 text-white text-3xl transition-all duration-300 lg:text-4xl">
        <h1>
          LETS<span className="text-[#506FFD]"> RIDE</span>
        </h1>
        <h5>Reset Password</h5>
      </div>
      <div className="w-100 flex flex-col justify-center items-center">
        <div className="w-[90%] h-[40%] flex flex-col justify-center gap-15">
          <InputComponent
            inputTitle="Email"
            imageSourcePath="/assets/images/mail1.png/"
            placeholderText="Enter Email"
            type="email"
            input={email}
            handleInput={handleEmailInput}
            isFieldEmpty={isFieldEmpty} email={""}          />
          <PasswordInputComponent
            handleInput={handlePasswordInput}
            handleToggleFunction={togglePasswordVisibility}
            isPasswordVisible={isPasswordVisiable}
            placeHolderText="Enter New Password"
            input={password}
          />
          <PasswordInputComponent
            handleInput={handleConfirmPasswordInput}
            handleToggleFunction={togglePasswordVisibility}
            isPasswordVisible={isPasswordVisiable}
            placeHolderText="Confirm Password"
            input={confirmPassword}
          />
        </div>
      </div>
      <div className=" flex items-center justify-center mt-15">
        <div className="">
          <PrimaryButton buttonText="Next" isBackgroundDark={isDark} />
        </div>
      </div>
    </div>
  );
};

export default page;
