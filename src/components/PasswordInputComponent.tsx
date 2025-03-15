"use client";
import React, { useEffect, useState } from "react";
import { handleInputChange } from "./utils/GatherInput";
//This Component Take in the password and the password value and is designed according to the figma. I make the eye image clickable so the use can reviel there password once clicked. The boolean can be manipulated on the parent component just created a function that changes the boolean value on click when using on parent component.
interface propTypes {
  isPasswordVisible: boolean;
  handleToggleFunction: () => void;
  placeHolderText: string;
}
const PasswordInputComponent = (props: propTypes) => {
  const [localValue, setLocalValue] = useState("");
  const { isPasswordVisible, handleToggleFunction, placeHolderText } = props;
  return (
    <div className="relative w-full border-b-2 pb-3 flex items-center text-white">
      <img
        src="/assets/images/padlock (1).png"
        alt="lock icon"
        className="absolute h-[20px]"
      />
      <input
        type={`${isPasswordVisible ? "text" : "password"}`}
        value={localValue}
        onChange={(e) => handleInputChange(e, setLocalValue)}
        placeholder={placeHolderText}
        className="w-full pl-6 focus:outline-none"
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
    </div>
  );
};

export default PasswordInputComponent;
