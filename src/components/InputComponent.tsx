"use client";
import React, { useEffect, useState } from "react";
import { handleInputChange } from "./utils/GatherInput";
//This is a reusable email component that captures the users email input
interface propTypes {
  inputTitle: string;
  imageSourcePath: string
  placeholderText:string
  type:string
  handleInput:(e: React.ChangeEvent<HTMLInputElement>) => void
  input:string
  isFieldEmpty:boolean
  email: string
}



const InputComponent = (props: propTypes) => {
  const { inputTitle, imageSourcePath, placeholderText, type, handleInput, input, isFieldEmpty } = props;

  return (
    <div className="w-full flex flex-col gap-5 ">
      <div>
        <h2 className={`${isFieldEmpty ? 'text-red-500' : 'text-white'}`}>{inputTitle}</h2>
      </div>
      <div className="w-full relative flex items-center border-b-2 pb-3">
        <img
          className="absolute h-[20px]"
          src={imageSourcePath}
          alt="Mail Icon"
        />
        <input
          type={type}
          value={input}
          onChange={handleInput}
          placeholder={placeholderText}
          required
          className="pl-8 w-full focus:outline-none text-white "
        />
      </div>
    </div>
  );
};

export default InputComponent;
