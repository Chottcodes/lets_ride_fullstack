"use client";
import React, { useEffect, useState } from "react";
import { handleInputChange } from "./utils/GatherInput";
//This is a reusable email component that captures the users email input
interface propTypes {
  inputTitle: string;
  imageSourcePath: string
}

const InputComponent = (props: propTypes) => {
  const [emailInput, setEmailInput] = useState("");
  const { inputTitle, imageSourcePath } = props;
  useEffect(() => {}, [emailInput]);
  return (
    <div className="w-full flex flex-col gap-5">
      <div>
        <h2>{inputTitle}</h2>
      </div>
      <div className="w-full relative flex items-center border-b-2 pb-3">
        <img
          className="absolute h-[20px]"
          src={imageSourcePath}
          alt="Mail Icon"
        />
        <input
          type="email"
          value={emailInput}
          onChange={(e) => handleInputChange(e, setEmailInput)}
          placeholder="Enter Email"
          className="pl-8 w-full focus:outline-none text-white"
        />
      </div>
    </div>
  );
};

export default InputComponent;
