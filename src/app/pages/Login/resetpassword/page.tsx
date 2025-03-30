"use client";
import BackButtonComponent from "@/components/BackButtonComponent";
import React, { useState } from "react";
import InputComponent from "@/components/InputComponent";
import PrimaryButton from "@/components/PrimaryButton";
import PasswordInputComponent from "@/components/PasswordInputComponent";
import { useRouter } from "next/navigation";

const ResetPage = () => {
  const { push } = useRouter();
  const [isPasswordVisiable, setIsPasswordVisiable] = useState(false);
  const [isFieldEmpty, setIsFieldEmpty] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const togglePasswordVisibility = () => {
    setIsPasswordVisiable((prev) => !prev);
  };
  
  const handleSubmit=()=>{
    if(password==''||confirmPassword == ''||email=='')
    {
      setIsFieldEmpty(true)
    }
    push("./Login/login-section")
  }

  return (
    <div className="h-screen flex flex-col justify-start items-center">
      <nav className="w-full h-[10%] flex items-center">
        <div className="pl-5">
          <BackButtonComponent
            onClick={() => push("/pages/Login/login-section")}
          />
        </div>
      </nav>
      <header className="w-full h-[20%] flex flex-col justify-center items-center gap-4 text-white text-3xl transition-all duration-300 lg:text-4xl">
        <h1>
          LETS<span className="text-[#506FFD]"> RIDE</span>
        </h1>
        <h5>Reset Password</h5>
      </header>
      <main className="w-[85%] md:w-[50%] lg:w-[25%] flex flex-col justify-center items-center">
        <section className="w-[90%] h-[40%] flex flex-col justify-center gap-15">
          <InputComponent
            inputTitle="Email"
            imageSourcePath="/assets/images/mail1.png"
            placeholderText="Enter Email"
            type="email"
            input={email}
            handleInput={(e)=>setEmail(e.target.value)}
            isFieldEmpty={isFieldEmpty}
          />
          <PasswordInputComponent
            handleInput={(e)=>setPassword(e.target.value)}
            handleToggleFunction={togglePasswordVisibility}
            isPasswordVisible={isPasswordVisiable}
            placeHolderText="Enter New Password"
            input={password}
            passwordTitle="Enter Password"
          />
          <PasswordInputComponent
            handleInput={(e)=>setConfirmPassword(e.target.value)}
            handleToggleFunction={togglePasswordVisibility}
            isPasswordVisible={isPasswordVisiable}
            placeHolderText="Confirm Password"
            input={confirmPassword}
            passwordTitle="Enter Password"
          />
        </section>
      </main>
      <footer className="w-[80%] h-[15%] md:w-[50%] lg:w-[20%] flex items-center justify-center ">
        <div className="w-[70%] h-[40%]">
          <PrimaryButton
            buttonText="Submit"
            isBackgroundDark={true}
            onClick={handleSubmit}
          />
        </div>
      </footer>
    </div>
  );
};

export default ResetPage;
