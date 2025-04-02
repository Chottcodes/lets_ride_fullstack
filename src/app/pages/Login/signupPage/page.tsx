"use client";
import React, { useState } from "react";
import InputComponent from "@/components/InputComponent";
import PasswordInputComponent from "@/components/PasswordInputComponent";
import PrimaryButton from "@/components/PrimaryButton";
import { useRouter } from "next/navigation";
import { createAccount } from "@/components/utils/DataServices";
const SignUpPage = () => {
  const { push } = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [finalAnswer, SetFinalAnswer] = useState<string>("");
  const [finalQuestion, setFinalQuestion] = useState<string>("");
  const [isPasswordVisiable, setIsPasswordVisiable] = useState(false);
  const [isTheSame, setIsTheSame] = useState<boolean>(true);
  const [isOptionOneShowing, setIsOptionOneShowing] = useState<boolean>(false);
  const [isSignUpComplete, setIsSignUpComplete] = useState<boolean>(false);

  const handleQuestionSubmit = async () => {
    const Userobj = {
      Email: email,
      Password: password,
      Question: finalQuestion,
      Answer: finalAnswer,
    };
    try {
      const CreateAccount = await createAccount(Userobj);
      if (CreateAccount) {
        alert("Account Created");
      } else {
        alert("Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something Went Wrong or Account Already Exist")
    }
  };
  const handleBackButton = () => {
    setIsSignUpComplete(false);
  };

  const handleSignUp = () => {
    if (password == confirmPassword && email != "") {
      setIsSignUpComplete(true);
      setIsOptionOneShowing(true);
    } else {
      setIsTheSame(false);
    }
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisiable((prev) => !prev);
  };

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
            isSignUpComplete ? "hidden" : "block"
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
            isSignUpComplete ? "block lg:gap-5" : "hidden"
          } h-[45%] w-[65%] md:w-[40%] md:h-[30%] lg:w-[20%] lg:h-[45%] flex flex-col justify-center items-center gap-3 transform-all duration-300`}
        >
          <div
            className={` lg:w-full lg:h-[40%] flex flex-col lg:gap-5 ${
              isOptionOneShowing ? "block" : "hidden"
            } `}
          >
            <p>Please Answer Security Question</p>
            <select
              className="w-full bg-black"
              onChange={(e) => setFinalQuestion(e.target.value)}
              value={finalQuestion}
            >
              <option value="" disabled hidden>
                Select question
              </option>
              <option value="Whats you favorite movie?">
                Whats you favorite movie?
              </option>
              <option value="What was the name of your first pet?">
                What was the name of your first pet?
              </option>
              <option value="Who was you childhood best friend?">
                Who was you childhood best friend?
              </option>
            </select>
            <input
              className="w-full h-full lg:rounded-lg bg-white text-black pl-2"
              value={finalAnswer}
              onChange={(e) => SetFinalAnswer(e.target.value)}
            />
          </div>
        </section>
        <footer className="h-[15%] w-[60%] gap-5 md:h-[15%] md:w-[40%] lg:w-[20%] lg:h-[20%] flex flex-col justify-evenly">
          <div
            className={`${
              isSignUpComplete ? "hidden" : "block"
            } h-[40%] lg:h-[40%]`}
          >
            <PrimaryButton
              buttonText="Sign Up"
              isBackgroundDark={false}
              onClick={handleSignUp}
            />
          </div>
          <div
            className={`${
              isSignUpComplete ? "hidden" : "block"
            } h-[40%] lg:h-[40%]`}
          >
            <PrimaryButton
              buttonText="Login"
              isBackgroundDark={true}
              onClick={() => push("/pages/Login/loginPage")}
            />
          </div>
          <div
            className={`${
              isSignUpComplete ? "block" : "hidden"
            } h-[40%] lg:h-[40%]`}
          >
            <PrimaryButton
              isBackgroundDark={true}
              onClick={handleQuestionSubmit}
              buttonText="Submit"
            />
          </div>
          <div
            className={`${
              isSignUpComplete ? "block" : "hidden"
            } h-[40%] lg:h-[40%]`}
          >
            <PrimaryButton
              isBackgroundDark={false}
              onClick={handleBackButton}
              buttonText="Back"
            />
          </div>
        </footer>
      </main>
    </div>
  );
};
export default SignUpPage;
