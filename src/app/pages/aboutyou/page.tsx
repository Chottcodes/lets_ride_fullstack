"use client";
import HandleFileInput from "@/components/HandleFileInput";
import React, { useEffect } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputComponent from "@/components/InputComponent";

const page = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isUserNameEmpty, setIsUserNameEmpty] = useState(false);
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isLocationEmpty, setIsLocationEmpty] = useState(false);
  const [isBikeTypeEmpty, setIsBikeTypeEmpty] = useState(false);

  const { push } = useRouter();
  const [userName, setUserName] = React.useState("");
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [bikeType, setBikeType] = React.useState("");
  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) {
      setImage(URL.createObjectURL(selectedImage));
      console.log(image);
    }
  };
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
  const handleNextButton = () => {
    if (userName === "") {
      setIsUserNameEmpty(true);
    }
    if (name === "") {
      setIsNameEmpty(true);
    }
    if (location === "") {
      setIsLocationEmpty(true);
    }
    if (bikeType === "") {
      setIsBikeTypeEmpty(true);
    } else {
      push("./aboutyourride");
    }
  };
  useEffect(() => {
    console.log("image", image);
  }, [image]);
  return (
    <div className="text-white h-screen flex flex-col justify-center items-center">
      <header className="w-full h-[10%] flex flex-col items-center justify-center gap-5 lg:gap-7 lg:mt-0">
        <h1 className="text-4xl">
          Tell Us About <span className="text-[#506FFD]">Yourself</span>
        </h1>
        <hr className="hidden lg:w-[20%] lg:block border-1" />
      </header>
      <section className="w-full h-[20%] flex flex-col justify-center items-center gap-2 mt-10 lg:mt-0">
        <div className="h-30 w-30 rounded-full lg:h-24 lg:w-24 lg:rounded-full border-2 transform-all duration-300">
          <HandleFileInput onChange={handleImageInput} />
        </div>
        <h5>Add Profile Pictures</h5>
      </section>
      <main className="w-[100%] h-[80%] md:h-[60%]  lg:w-[35%] flex flex-col justify-center items-center transform-all duration-300  overflow-y-auto">
        <div className="w-[90%] h-full md:w-[60%] lg:w-[60%] lg:h-[85%] lg:gap-0 gap-5  flex flex-col justify-evenly items-center transform-all duration-300">
          <InputComponent
            inputTitle={
              isUserNameEmpty ? "Invalid, please enter username" : "User Name"
            }
            imageSourcePath="/assets/images/user.png"
            placeholderText=""
            type="string"
            input={userName}
            handleInput={handleUserName}
            isFieldEmpty={isUserNameEmpty}
          />
          <InputComponent
            inputTitle={isNameEmpty ? "Invalid, please enter name" : "Name"}
            imageSourcePath="/assets/images/user.png"
            placeholderText=""
            type="string"
            input={name}
            handleInput={handleName}
            isFieldEmpty={isNameEmpty}
          />
          <InputComponent
            inputTitle={
              isLocationEmpty ? "Invalid, please enter city" : "City Name"
            }
            imageSourcePath="/assets/images/location.png"
            placeholderText=""
            type="string"
            input={location}
            handleInput={handleLocation}
            isFieldEmpty={isLocationEmpty}
          />
          <InputComponent
            inputTitle={
              isBikeTypeEmpty ? "Invalid, please enter city" : "Bike Type"
            }
            imageSourcePath="/assets/images/motorbike.png"
            placeholderText=""
            type="string"
            input={bikeType}
            handleInput={handleBikeType}
            isFieldEmpty={isBikeTypeEmpty}
          />
        </div>
        <footer className="h-[30%] w-full flex justify-center items-center transform-all duration-300 ">
          <div className="h-[70%] w-[80%] md:h-[40%] md:w-[50%] lg:w-[60%]">
            <PrimaryButton
              buttonText="Next"
              isBackgroundDark={false}
              onClick={handleNextButton}
            />
          </div>
        </footer>
      </main>
    </div>
  );
};

export default page;
