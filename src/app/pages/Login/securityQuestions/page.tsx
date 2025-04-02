"use client";
import InputComponent from "@/components/InputComponent";
import PrimaryButton from "@/components/PrimaryButton";
import React, { useEffect, useState } from "react";

const Securitypage = () => {
  const [answer1, setAnswer1] = useState<string>("");
  const [answer2, setAnswer2] = useState<string>("");
  const [answer3, setAnswer3] = useState<string>("");
  const [isQuestionOneEmpty, setIsQuestionOneEmpty] = useState<boolean>(false);
  const [isQuestionTwoEmpty, setIsQuestionTwoEmpty] = useState<boolean>(false);
  const [isQuestionThreeEmpty, setIsQuestionThreeEmpty] =
    useState<boolean>(false);
  const [isOptionOneShowing, setIsOptionOneShowing] = useState<boolean>(true);
  const [isOptionTwoShowing, setIsOptionTwoShowing] = useState<boolean>(false);
  const [isOptionThreeShowing, setIsOptionThreeShowing] =
    useState<boolean>(false);
  const handleAnswerOneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setAnswer1(inputValue);
  };
  const handleAnswerTwoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setAnswer2(inputValue);
  };
  const handleAnswerThreeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setAnswer3(inputValue);
  };
  const handleQuestionOneBool = () => {
    setIsOptionOneShowing(true);
    setIsOptionTwoShowing(false);
    setIsOptionThreeShowing(false);
  };
  const handleQuestionTwoBool = () => {
    setIsOptionOneShowing(false);
    setIsOptionTwoShowing(true);
    setIsOptionThreeShowing(false);
  };
  const handleQuestionThreeBool = () => {
    setIsOptionOneShowing(false);
    setIsOptionTwoShowing(false);
    setIsOptionThreeShowing(true);
  };
  const handleSubmit = () => {
    if (!answer1 && !answer2 && !answer3) {
      setIsQuestionOneEmpty(true);
      setIsQuestionTwoEmpty(true);
      setIsQuestionThreeEmpty(true);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <header className="w-[25%] h-[10%] flex justify-center items-end lg:text-4xl transition-all duration-300 text-white">
        <h1>Choose Security Questions</h1>
      </header>
      <main className="w-[25%] h-[70%] flex flex-col justify-center items-center lg:gap-8">
        <section
          className={` lg:w-full lg:text-lg  ${
            isOptionOneShowing ? "block" : "hidden"
          } `}
        >
          <InputComponent
            inputTitle="Whats your favorite food?"
            type="text"
            placeholderText="Enter answer"
            imageSourcePath={"/assets/images/padlock (1).png"}
            handleInput={handleAnswerOneInput}
            input={answer1}
            isFieldEmpty={isQuestionOneEmpty}
          />
        </section>
        <section
          className={`${
            isOptionTwoShowing ? "block" : "hidden"
          } lg:w-full lg:text-lg `}
        >
          <InputComponent
            inputTitle="Who was you childhood friend?"
            type="text"
            placeholderText="Enter answer"
            imageSourcePath={"/assets/images/padlock (1).png"}
            handleInput={handleAnswerTwoInput}
            input={answer2}
            isFieldEmpty={isQuestionTwoEmpty}
          />
        </section>
        <section
          className={`${
            isOptionThreeShowing ? "block" : "hidden"
          } lg:w-full lg:text-lg`}
        >
          <InputComponent
            inputTitle="What's your favorite movie?"
            type="text"
            placeholderText="Enter answer"
            imageSourcePath={"/assets/images/padlock (1).png"}
            handleInput={handleAnswerThreeInput}
            input={answer3}
            isFieldEmpty={isQuestionThreeEmpty}
          />
        </section>
        <section className="w-[50%] h-[5%]  flex justify-evenly items-center">
          <button
            onClick={handleQuestionOneBool}
            className={`${
              isOptionOneShowing ? "bg-gray-300" : "bg-gray-500"
            } lg:w-3 lg:h-3 rounded-full border-1 border-white cursor-pointer `}
          ></button>
          <button
            onClick={handleQuestionTwoBool}
            className={`${
              isOptionTwoShowing ? "bg-gray-300" : "bg-gray-500"
            } lg:w-3 lg:h-3 rounded-full border-1 border-white cursor-pointer `}
          ></button>
          <button
            onClick={handleQuestionThreeBool}
            className={`${
              isOptionThreeShowing ? "bg-gray-300" : "bg-gray-500"
            } lg:w-3 lg:h-3 rounded-full border-1 border-white cursor-pointer `}
          ></button>
        </section>
        <footer className="lg:w-full h-[10%]">
          <PrimaryButton
            isBackgroundDark={true}
            onClick={handleSubmit}
            buttonText="Submit"
          />
        </footer>
      </main>
    </div>
  );
};

export default Securitypage;
