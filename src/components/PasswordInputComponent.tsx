"use client";
import React, { useEffect, useState } from "react";
import { handleInputChange } from "./utils/GatherInput";
//This Component Take in the password and the password value and is designed according to the figma. I make the eye image clickable so the use can reviel there password once clicked. The boolean can be manipulated on the parent component just created a function that changes the boolean value on click when using on parent component.
interface propTypes {
  isPasswordVisible: boolean;
  handleToggleFunction: () => void;
  placeHolderText: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  input: string;
  passwordTitle:string
}
const PasswordInputComponent = (props: propTypes) => {
  const {
    isPasswordVisible,
    handleToggleFunction,
    placeHolderText,
    input,
    handleInput,
    passwordTitle
  } = props;
  return (
    <div className=" w-full relative border-b-2 pb-3 flex flex-col justify-start items-center text-white gap-5">
      <header className="w-full flex justify-start items-start">
        <h1>{passwordTitle}</h1>
      </header>
      <form className="w-full flex ">
      <img
        src="/assets/images/padlock (1).png"
        alt="lock icon"
        className="absolute h-[20px]"
      />
      <input
        type={`${isPasswordVisible ? "text" : "password"}`}
        value={input}
        onChange={handleInput}
        placeholder={placeHolderText}
        className="w-full pl-8 focus:outline-none"
      />
      <img
        src={`${
          isPasswordVisible
            ? "/assets/images/hide.png"
            : "/assets/images/view.png"
        }`}
        alt="eyeglass icon"
        className="h-[20px] absolute left-[90%]"
        onClick={handleToggleFunction}
      />
      </form>
    </div>
  );
};

export default PasswordInputComponent;
