"use client";
import React, { useEffect, useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import { useRouter } from "next/navigation";
import PasswordInputComponent from "@/components/PasswordInputComponent";
import InputComponent from "@/components/InputComponent";

const LoginSection = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisiable, setIsPasswordVisiable] = useState<boolean>(false);
  const [isFieldEmpty, setIsFieldEmpty] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisiable((prev) => !prev);
  };
  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleLogInClick = () => {
    if (email == "" && password == "") {
      setIsFieldEmpty(true);
    } else {
      push("/pages/profile");
    }
  };
  useEffect(() => {
    console.log(email);
  }, [email]);

  return (
    <div className="h-screen flex flex-col justify-center">
      <main className="lg:h-[80%] flex flex-col justify-center items-center text-white">
        <header className="text-[46px] h-auto w-full flex flex-col justify-center items-center gap-5 lg:gap-3">
          <h1>
            Let's<span className="text-blue-600 tracking-widest"> Ride</span>
          </h1>
          <hr className="w-[20rem]" />
          <h1 className="text-4xl tracking-widest mb-20">Login</h1>
        </header>
        <div className="w-[90%] md:h-full md:w-[50%] lg:w-[20%] flex flex-col gap-5 transform-all duration-300 ">
          <section className="w-full h-full flex flex-col lg:items-start lg:justify-center lg:h-[60%] gap-5 ">
            <InputComponent
              type="email"
              input={email}
              imageSourcePath="/assets/images/mail1.png"
              inputTitle="Enter Email"
              placeholderText="Enter Email"
              handleInput={handleEmailInput}
              isFieldEmpty={isFieldEmpty}
            />
            <PasswordInputComponent
              isPasswordVisible={isPasswordVisiable}
              handleToggleFunction={togglePasswordVisibility}
              placeHolderText="Enter Password"
              handleInput={handlePasswordInput}
              input={password}
              passwordTitle="Enter Password"
            />
            <button
              onClick={() => push("/")}
              className="text-[#506FFD] hover:text-[#2e53fc] cursor-pointer"
            >
              <span className="text-white">forgot</span> password
            </button>
          </section>

          <section className="lg:h-[50%] flex flex-col justify-center items-center">
            <section className="w-full h-[30%] flex justify-center">
              <PrimaryButton
                buttonText="Log In"
                isBackgroundDark={true}
                onClick={handleLogInClick}
              />
            </section>
            <div className="w-full h-[20%] flex justify-evenly items-center">
              <hr className="w-[40%]" />
              <p>or</p>
              <hr className="w-[40%]" />
            </div>
            <section className="w-full h-[30%] flex justify-center">
              <PrimaryButton
                buttonText="Sign Up"
                isBackgroundDark={false}
                onClick={() => push("/pages/Login/signup-section")}
              />
            </section>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginSection;
