"use client";
import React, { useEffect } from "react";
import InputComponent from "./InputComponent";

export const AboutYouComponent = () => {
  const inputArr: { title: string; icon: string }[] = [
    { title: "User Name", icon: "/assets/images/user.png" },
    { title: "Name", icon: "/assets/images/user.png" },
    { title: "Location", icon: "/assets/images/location.png" },
    { title: "Bike Type", icon: "/assets/images/motorbike.png" },
  ];
  const [inputValue, setInputValue] = React.useState("");
  const handleinput= ()=>{
    setInputValue(inputValue)
  }
  useEffect(() => {
    console.log(inputValue);
  },[inputValue]);
  return (
    <div className="w-full h-full flex flex-col gap-3">
      {inputArr.map((input, index) => (
        <InputComponent
          key={index}
          inputTitle={input.title}
          imageSourcePath={input.icon}
          placeholderText=""
          type="text"
          input={inputValue}
          handleInput={handleinput}
        />
      ))}
    </div>
  );
};
