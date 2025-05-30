"use client";

import InputComponent from "@/components/inputs/InputComponent";
import PasswordInputComponent from "@/components/inputs/PasswordInputComponent";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { logIn } from "@/components/utils/DataServices";
import { IToken } from "@/components/utils/Interface";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginSectionPage = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFieldEmpty, setIsFieldEmpty] = useState(false);
  const [emailTitle, setEmailTitle] = useState<string>("Email");
  const [enterPasswordTitle, setEnterPasswordTitle] =
    useState<string>("Password");

  const handleToggleFunction = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogIn = async () => {
    if (!email || !password) {
      setIsFieldEmpty(true);
    } else {
      const userData = { email: email, password: password };
      try {
        const response: IToken = await logIn(userData);
        const { id, token } = response.result;
        if (token) {
          if (typeof window !== "undefined") {
            localStorage.setItem("Token", token);
            localStorage.setItem("ID", id.toString());
          }
          push("/home");
        } else {
          setIsFieldEmpty(true);
          setEmailTitle("Invalid Email or Password");
          setEnterPasswordTitle("Invalid Password or Email");
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-800 to-black px-4 py-8">
      <main className="w-full max-w-sm md:max-w-md lg:max-w-lg flex flex-col justify-center items-center text-white space-y-8 md:space-y-12">
        
        {/* Header Section */}
        <header className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl">
            Lets<span className="text-[#5070fd] tracking-widest"> Ride</span>
          </h1>
          <hr className="w-32 md:w-40 mx-auto" />
          <h1 className="text-xl md:text-2xl tracking-widest">Login</h1>
        </header>

        {/* Form Section */}
        <section className="w-full space-y-4 md:space-y-6">
          <InputComponent
            type="email"
            input={email}
            imageSourcePath="/assets/images/mail1.png"
            inputTitle={emailTitle}
            placeholderText="Enter Email"
            handleInput={(e) => setEmail(e.target.value)}
            isFieldEmpty={isFieldEmpty}
          />
          
          <PasswordInputComponent
            passwordTitle={enterPasswordTitle}
            placeHolderText="Enter Password"
            isPasswordVisible={isPasswordVisible}
            handleInput={(e) => setPassword(e.target.value)}
            handleToggleFunction={handleToggleFunction}
            input={password}
            isFieldEmpty={isFieldEmpty}
          />
          
          <div className="text-left">
            <span className="text-sm md:text-base">forgot </span>
            <button
              onClick={() => push("/pages/Login/resetPage")}
              className="text-[#506FFD] hover:text-[#2e53fc] cursor-pointer text-sm md:text-base"
            >
              password
            </button>
          </div>
        </section>

        {/* Footer/Button Section */}
        <footer className="w-full space-y-4 md:space-y-6">
          <PrimaryButton
            buttonText="Log In"
            isBackgroundDark={true}
            onClick={handleLogIn}
          />
          
          {/* Divider */}
          <div className="flex items-center space-x-4">
            <hr className="flex-1" />
            <span className="text-sm text-gray-300">Or</span>
            <hr className="flex-1" />
          </div>
          
          <PrimaryButton
            buttonText="Sign up"
            isBackgroundDark={false}
            onClick={() => push("/pages/Login/signupPage")}
          />
        </footer>
      </main>
    </div>
  );
};

export default LoginSectionPage;