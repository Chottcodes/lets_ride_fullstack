"use client";
import BackButtonComponent from "@/components/BackButtonComponent";
import PasswordInputComponent from "@/components/PasswordInputComponent";
import PrimaryButton from "@/components/PrimaryButton";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// Push user's value into the backend database (email and password)
// Confirm if password is the same logic
const SignUpSection = () => {
  const { push } = useRouter();

  // State to control password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // State to store input value
  const [password, setPassword] = useState("");

  // Toggle function to change password visibility
  const handleTogglePassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // Handle input changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <div className="w-full h-[100px] flex justify-start items-center pl-5">

      <BackButtonComponent onClick={() => push("/")} />
      </div>
      <div className="flex flex-col justify-center items-center text-white mt-10">
        <div className="text-[46px] pb-8">
          <h1>
            Let's <span className="text-blue-600 tracking-widest">Ride</span>
          </h1>
        </div>

        <hr className="w-[20rem] pt-10" />
        <h1 className="text-4xl tracking-widest mb-20">Sign Up</h1>
        <div className="w-100 flex flex-col gap-3">
          <div className="">
            <h2>Enter Email</h2>
          </div>
          <div className="w-full relative flex items-center border-b-2 pb-3">
            <img
              className="absolute h-[20px]"
              src="/assets/images/mail1.png"
              alt="email logo"
            />
            <input
              type="text"
              placeholder="Enter Email Here"
              className="pl-8 w-full focus:outline-none"
            />
          </div>

          {/* Enter Password */}
          <PasswordInputComponent
            isPasswordVisible={isPasswordVisible}
            handleToggleFunction={handleTogglePassword}
            placeHolderText="Enter your password"
            handleInput={handlePasswordChange}
            input={password}
            passwordTitle="Enter Password"
          />

          {/* Confirm Password */}
          <PasswordInputComponent
            isPasswordVisible={isPasswordVisible}
            handleToggleFunction={handleTogglePassword}
            placeHolderText="Confirm your password"
            handleInput={handlePasswordChange}
            input={password}
            passwordTitle="Enter Password"
          />

          <div className="flex justify-center pt-5">
            <PrimaryButton
              buttonText="Sign Up"
              isBackgroundDark={false}
              onClick={() => push("/home/your-profile")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpSection;
