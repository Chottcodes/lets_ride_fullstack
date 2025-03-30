"use client";
import React, { useEffect, useState } from "react";
import BackButtonComponent from "@/components/BackButtonComponent";
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

  const handleSubmit = async () => {
    if (password == confirmPassword) {
      const userData = { email: email, password: password };
      const success = await createAccount(userData);
      if (success) {
        alert("Account Created!");
        push("/pages/aboutyou");
      } else {
        alert("Email already in use.");
      }
    } else {
      setIsTheSame(false);
    }
  };
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisiable((prev) => !prev);
  };
  useEffect(() => {
    if (password != "") setIsTheSame(true);
  }, [password]);

  // End of logic
  return (
    <div className="h-screen">
      <main className="h-[90%] md:h-[80%] lg:h-[90%] flex flex-col justify-start items-center md:gap-10 lg:gap-2 text-white   transform-all duration-300 ">
      <nav className="h-[10%] md:h-[10%] lg:h-[10%] w-full flex items-center transform-all duration-300">
        <div className="pl-5">
          <BackButtonComponent
            onClick={() => push("/pages/Login/login-section")}
          />
        </div>
      </nav>
        <header className="w-[40%] h-[20%] gap-3 md:h-[10%] md:w-[40%] lg:h-[20%] lg:w-[30%] text-4xl flex flex-col justify-center items-center lg:gap-2  transform-all duration-300 ">
          <h1>
            Lets <span className="text-blue-600 tracking-widest">Ride</span>
          </h1>
          <hr className="w-full md:w-[70%] lg:w-[50%]" />
          <h1 className="tracking-widest">Sign Up</h1>
        </header>

        <section className="h-[45%] w-[65%] md:w-[40%] md:h-[30%] lg:w-[20%] lg:h-[45%] flex flex-col gap-3 transform-all duration-300 ">
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
              handleInput={handlePasswordInput}
              input={password}
            />
            <PasswordInputComponent
              isPasswordVisible={isPasswordVisiable}
              handleToggleFunction={togglePasswordVisibility}
              placeHolderText="Confirm password"
              passwordTitle="Confirm Password"
              handleInput={handleConfirmPasswordInput}
              input={confirmPassword}
            />
          </div>
        </section>

        <footer className="h-[15%] w-[60%] gap-5 md:h-[15%] md:w-[40%] lg:w-[20%] lg:h-[20%] flex flex-col justify-evenly">
          <div className="h-[40%] lg:h-[30%]">
            <PrimaryButton
              buttonText="Sign Up"
              isBackgroundDark={false}
              onClick={handleSubmit}
            />
          </div>
          <div className="h-[40%] lg:h-[30%]">
            <PrimaryButton
              buttonText="Login"
              isBackgroundDark={true}
              onClick={()=>push('/pages/Login/login-section')}
            />
          </div>
        </footer>
      </main>
    </div>
  );
};
export default SignUpSection;
