"use client";
import React, { useEffect, useState } from "react";
import InputComponent from "@/components/InputComponent";
import PasswordInputComponent from "@/components/PasswordInputComponent";
import PrimaryButton from "@/components/PrimaryButton";
import { createAccount } from "@/components/utils/DataServices";
import { useRouter } from "next/navigation";

const SignUpSection = () => {
  const { push } = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTheSame, setIsTheSame] = useState<boolean>(true);
  const [isPasswordVisiable, setIsPasswordVisiable] = useState(false);
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
  const [isSignUpComplete, setIsSignUpComplete] = useState<boolean>(false);


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
  const handleQuestionSubmit = () => {
    if (!answer1 && !answer2 && !answer3) {
      setIsQuestionOneEmpty(true);
      setIsQuestionTwoEmpty(true);
      setIsQuestionThreeEmpty(true);
    }
  };

  const handleSubmit = async () => {
    if (password == confirmPassword) {
      // const userData = { email: email, password: password };
      // const success = await createAccount(userData);
      // if (success) {
      //   alert("Account Created!");
      //   push("/pages/aboutyou");
      // } else {
      //   alert("Email already in use.");
      // }
      setIsSignUpComplete(true);
    } else {
      setIsTheSame(false);
    }
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisiable((prev) => !prev);
  };
  useEffect(() => {
    if (password != "") setIsTheSame(true);
    console.log(answer1)
    console.log(answer2)
    console.log(answer3)
  
  }, [password,answer1,answer2,answer3]);

  // End of logic
  return (
    <div className="h-screen">
      <main className="h-[90%] md:h-[80%] lg:h-[90%] flex flex-col justify-start items-center lg:justify-center md:gap-10 lg:gap-2 text-white   transform-all duration-300 ">
        <header className="w-[40%] h-[20%] gap-3 md:h-[10%] md:w-[40%] lg:h-[20%] lg:w-[30%] text-4xl flex flex-col justify-center items-center lg:gap-2  transform-all duration-300 ">
          <h1>
            Lets <span className="text-blue-600 tracking-widest">Ride</span>
          </h1>
          <hr className="w-full md:w-[70%] lg:w-[50%]" />
          <h1 className="tracking-widest">Sign Up</h1>
        </header>

        <section
          className={`${
            isSignUpComplete ? "block" : "hidden"
          } h-[45%] w-[65%] md:w-[40%] md:h-[30%] lg:w-[20%] lg:h-[45%] flex flex-col gap-3 transform-all duration-300 overflow-y-auto `}
        >
          <InputComponent
            type="email"
            input={email}
            imageSourcePath="/assets/images/mail1.png"
            inputTitle="Enter Email"
            placeholderText="Enter Email"
            handleInput={(e) => setEmail(e.target.value)}
            isFieldEmpty={false}
          />
          <div
            className={`${
              isTheSame ? "border-none" : " border-red-500 border-2"
            } flex flex-col lg:gap-5 h-full`}
          >
            <PasswordInputComponent
              isPasswordVisible={isPasswordVisiable}
              handleToggleFunction={togglePasswordVisibility}
              placeHolderText="Enter your password"
              passwordTitle={`${
                isTheSame ? "Enter Password" : "Invalid Passwords Do Not Match"
              }`}
              handleInput={(e) => setPassword(e.target.value)}
              input={password}
            />
            <PasswordInputComponent
              isPasswordVisible={isPasswordVisiable}
              handleToggleFunction={togglePasswordVisibility}
              placeHolderText="Confirm password"
              passwordTitle="Confirm Password"
              handleInput={(e) => setConfirmPassword(e.target.value)}
              input={confirmPassword}
            />
          </div>
        </section>
        <section
          className={`${
            isSignUpComplete ? "hidden" : "block lg:gap-5"
          } h-[45%] w-[65%] md:w-[40%] md:h-[30%] lg:w-[20%] lg:h-[45%] flex flex-col justify-center items-center gap-3 transform-all duration-300`}
        >
          <section
            className={` lg:w-full ${isOptionOneShowing ? "block" : "hidden"} `}
          >
            <InputComponent
              inputTitle="Whats is the name of your first pet?"
              type="text"
              placeholderText="Enter answer"
              imageSourcePath={"/assets/images/padlock (1).png"}
              handleInput={(e)=>setAnswer1(e.target.value)}
              input={answer1}
              isFieldEmpty={isQuestionOneEmpty}
            />
          </section>
          <section
            className={`${isOptionTwoShowing ? "block" : "hidden"} lg:w-full `}
          >
            <InputComponent
              inputTitle="Who was you childhood best friend?"
              type="text"
              placeholderText="Enter answer"
              imageSourcePath={"/assets/images/padlock (1).png"}
              handleInput={(e)=>setAnswer2(e.target.value)}
              input={answer2}
              isFieldEmpty={isQuestionTwoEmpty}
            />
          </section>
          <section
            className={`${
              isOptionThreeShowing ? "block" : "hidden"
            } lg:w-full `}
          >
            <InputComponent
              inputTitle="What's your favorite movie?"
              type="text"
              placeholderText="Enter answer"
              imageSourcePath={"/assets/images/padlock (1).png"}
              handleInput={(e)=>setAnswer3(e.target.value)}
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
        </section>

        <footer className="h-[15%] w-[60%] gap-5 md:h-[15%] md:w-[40%] lg:w-[20%] lg:h-[20%] flex flex-col justify-evenly">
          <div
            className={`${
              isSignUpComplete ? "block" : "hidden"
            } h-[40%] lg:h-[30%]`}
          >
            <PrimaryButton
              buttonText="Sign Up"
              isBackgroundDark={false}
              onClick={handleSubmit}
            />
          </div>
          <div
            className={`${
              isSignUpComplete ? "block" : "hidden"
            } h-[40%] lg:h-[30%]`}
          >
            <PrimaryButton
              buttonText="Login"
              isBackgroundDark={true}
              onClick={() => push("/pages/Login/login-section")}
            />
          </div>
          <div
            className={`${
              isSignUpComplete ? "hidden" : "block"
            } h-[40%] lg:h[30%]`}
          >
            <PrimaryButton
              isBackgroundDark={true}
              onClick={handleQuestionSubmit}
              buttonText="Submit"
            />
          </div>
        </footer>
      </main>
    </div>
  );
};
export default SignUpSection;
