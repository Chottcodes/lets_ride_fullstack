"use client";
import React, { useEffect } from "react";
import InputComponent from "./InputComponent";

export const AboutYouComponent = () => {
  const [userName, setUserName] = React.useState("");
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [bikeType, setBikeType] = React.useState("");
  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };
  const handleBikeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBikeType(e.target.value);
  };
  useEffect(() => {
  }, []);
  return (
    <div className="w-full h-full flex flex-col gap-3">
      <InputComponent
        inputTitle="User name"
        imageSourcePath="/assets/images/user.png"
        placeholderText=""
        type="string"
        input={userName}
        handleInput={handleUserName}
      />
      <InputComponent
        inputTitle="Name"
        imageSourcePath="/assets/images/user.png"
        placeholderText=""
        type="string"
        input={name}
        handleInput={handleName}
      />
      <InputComponent
        inputTitle="Enter Location"
        imageSourcePath="/assets/images/location.png"
        placeholderText=""
        type="string"
        input={location}
        handleInput={handleLocation}
      />
      <InputComponent
        inputTitle="Bike Type"
        imageSourcePath="/assets/images/motorbike.png"
        placeholderText=""
        type="string"
        input={bikeType}
        handleInput={handleBikeType}
      />
    </div>
  );
};
