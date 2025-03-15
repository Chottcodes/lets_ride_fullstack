"use client";
import React from "react";

interface InputProps {
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    iconSrc: string;
  }

const EmailAndPassword = () => {
  return (
    <div className="w-[80%] h-full text-white flex flex-col gap-7 ">
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
      <div className="w-full h-[70%]">
        <div className="w-full flex flex-col gap-5">
          <div className="">

            <h2>New Password</h2>
          </div>
          <div className="relative w-full border-b-2 pb-3 flex items-center">
            <img
              src="/assets/images/padlock (1).png"
              alt="lock icon"
              className="absolute h-[20px]"
            />
            <input
              type="text"
              placeholder="Enter Password"
              className="w-full pl-6 focus:outline-none"
            />
            <img
              src="/assets/images/hide.png"
              alt="eyeglass icon"
              className="h-[20px] absolute left-[90%]"
            />
          </div>
          <div className="relative w-full border-b-2 pb-3 flex items-center">
            <img
              src="/assets/images/padlock (1).png"
              alt="lock icon"
              className="absolute h-[20px]"
            />
            <input
              type="text"
              placeholder="Confirm Password"
              className="w-full pl-6 focus:outline-none"
            />
            <img
              src="/assets/images/hide.png"
              alt="eyeglass icon"
              className="h-[20px] absolute left-[90%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailAndPassword;
