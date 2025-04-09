"use client";
import React from "react";
import Image from "next/image";
//This Component Take in the password and the password value and is designed according to the figma. I make the eye image clickable so the use can reviel there password once clicked. The boolean can be manipulated on the parent component just created a function that changes the boolean value on click when using on parent component.
interface propTypes {
  handleToggleFunction: () => void;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPasswordVisible: boolean;
  isFieldEmpty:boolean
  placeHolderText: string;
  input: string;
  passwordTitle: string;
}
const PasswordInputComponent = (props: propTypes) => {
  const {
    isPasswordVisible,
    handleToggleFunction,
    placeHolderText,
    input,
    handleInput,
    passwordTitle,
    isFieldEmpty
  } = props;
  return (
    <div className=" w-full relative border-b-2 pb-3 flex flex-col justify-start items-center text-white gap-5">
      <header className={`${isFieldEmpty? "text-red-500":"text-white"} w-full flex justify-start items-start`}>
        <h1>{passwordTitle}</h1>
      </header>
      <form className="w-full flex ">
        <Image
          src="/assets/images/padlock (1).png"
          alt="lock icon"
          className="absolute h-[20px] w-[20px]"
          width={100}
          height={100}
        />
        <input
          type={`${isPasswordVisible ? "text" : "password"}`}
          value={input}
          onChange={handleInput}
          placeholder={placeHolderText}
          className="w-full pl-8 focus:outline-none"
        />
        <Image
          src={`${
            isPasswordVisible
              ? "/assets/images/hide.png"
              : "/assets/images/view.png"
          }`}
          alt="eyeglass icon"
          width={100}
          height={100}
          className="h-[20px] w-[20px] absolute left-[90%]"
          onClick={handleToggleFunction}
        />
      </form>
    </div>
  );
};

export default PasswordInputComponent;
