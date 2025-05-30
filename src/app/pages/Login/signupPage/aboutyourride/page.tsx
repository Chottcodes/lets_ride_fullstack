"use client";
import DropDownInputComponent from "@/components/buttons/DropDownInputComponent";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import React, { useEffect, useState } from "react";

const AboutYourRidePage = () => {
  const [beginner, setBeginner] = useState("");
  const [preferences, setPreferences] = useState("");
  const [ridingFrequency, setRidingFrequency] = useState("");
  const handleBeginnerChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBeginner(event.target.value);
  };
  const handlePreferencesChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPreferences(event.target.value);
  };

  const handleRidingFrequencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRidingFrequency(event.target.value);
  };
  useEffect(() => {
    console.log("beginner", beginner);
    console.log('preferences',preferences)
    console.log('Frequency',ridingFrequency)
  }, [beginner,preferences,ridingFrequency]);
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-black">
      <nav className="w-full  lg:h-[10%] flex flex-col items-center justify-center lg:gap-5 lg:mt-0">
        <h1 className="text-4xl text-white">
          Tell Us About <span className="text-[#506FFD]">Your Ride</span>
        </h1>
        <hr className="hidden lg:w-[20%] lg:block border-1" />
      </nav>
      <main className="lg:h-[50%] lg:w-[20%] h-[60%] w-[80%] flex flex-col justify-evenly text-white transform-all duration-300">
        <section className="lg:w-full lg:h-[10%] gap-5  flex flex-col justify-center text-xl">
          <h1>Riding Experience Level</h1>
          <DropDownInputComponent
            onChange={handleBeginnerChange}
            options={[
              { label: "Beginner (6 months or less)", value: "Beginner" },
              { label: "Intermediate (6 months to 2 years)", value: "Intermediate" },
              { label: "Advanced (2 years or more)", value: "Advanced" }
            ]} placeholder={""}          />
        </section>
        <section className="w-full h-[10%] gap-5 flex flex-col justify-center text-xl">
          <h1>Riding Preferences</h1>
          <DropDownInputComponent
            onChange={handlePreferencesChange}
            options={[
              { label: "Cruising", value: "Cruising" },
              { label: "Long Distance", value: "Long Distance" },
              { label: "Off Road", value: "Off Road" },
              { label: "Track Riding/Fast Riding", value: "Track Riding" }
            ]} placeholder={""}          />
        </section>
        <section className="w-full h-[15%] gap-5 flex flex-col justify-center text-xl">
          <h1>How often do you ride?</h1>
          <DropDownInputComponent
            onChange={handleRidingFrequencyChange}
            options={[
              { label: "A few times a year", value: "Rarely" },
              { label: "A few times a month", value: "Occasionally" },
              { label: "Every week", value: "Regularly" },
              { label: "Daily", value: "Daily" }
            ]} placeholder={""}          />
        </section>
      </main>
      <footer className="lg:w-[20%] lg:h-[15%] h-[20%] w-[80%] flex justify-start items-center">
        <div className="w-full h-[45%]">
          <PrimaryButton buttonText="Next" isBackgroundDark={false} />
        </div> 
      </footer>
    </div>
  );
};

export default AboutYourRidePage;
