"use client";
import React from "react";
import PasswordInputComponent from "./PasswordInputComponent";

interface InputProps {
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    iconSrc: string;
  }

const EmailAndPassword = () => {
  return (
    <div className="w-full h-full text-white flex flex-col gap-7 ">
      <div className="w-full flex flex-col gap-5">
        <div className="">
          <h2>Enter Email</h2>
        </div>
        <div className="w-full relative flex items-center border-b-2 pb-3">
          <img
            className="absolute h-[20px]"
            src="/assets/images/mail (1).png"
            alt=""
          />
          <input
            type="text"
            placeholder="Enter Email"
            className="pl-8 w-full focus:outline-none"
          />
        </div>
      </div>
      <div className="w-full h-full">
        <div className="w-full flex flex-col gap-7">
            <h2>New Password</h2>
            <PasswordInputComponent/>
            <PasswordInputComponent/>
        </div>
      </div>
    </div>
  );
};

export default EmailAndPassword;
