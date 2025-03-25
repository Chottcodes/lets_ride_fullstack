"use client";
import React, { useState } from "react";
import BackButtonComponent from "@/components/BackButtonComponent";
import PrimaryButton from "@/components/PrimaryButton";
import { useRouter } from "next/navigation";
import PasswordInputComponent from "@/components/PasswordInputComponent";

const LoginSection = () => {
  const { push } = useRouter();
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisiable, setIsPasswordVisiable] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisiable((prev) => !prev);
  };
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <BackButtonComponent onClick={() => push("/")} />

      <div className="flex flex-col justify-center items-center text-white mt-10">
        <div className="text-[46px] pb-8">
          <h1>
            Let's <span className="text-blue-600 tracking-widest">Ride</span>
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center">
          <hr className="w-[20rem] pt-10" />
          <h1 className="text-4xl tracking-widest mb-20">Login</h1>
        </div>

        <div className="w-100 flex flex-col gap-5">
          <div className="">
            <h2>Enter Email</h2>
          </div>
          <div className=" flex items-center border-b-2 pb-3">
            <img
              className="absolute h-[20px]"
              src="/assets/images/mail1.png"
              alt="email logo"
            />
            <input
              type="text"
              placeholder="Enter Email"
              className="pl-8 w-100 focus:outline-none"
            />
          </div>
          {/* Enter Password */}
          <div className="">
            <h2>Enter Password</h2>
          </div>
          <div className="relative w-full pb-3 flex items-center">
            <PasswordInputComponent
              isPasswordVisible={isPasswordVisiable}
              handleToggleFunction={togglePasswordVisibility}
              placeHolderText="Enter Password"
              handleInput={handlePasswordInput}
              input={password}
            />
          </div>

          <h1>
            forgot{" "}
            <button
              onClick={() => push("/")}
              className="text-[#506FFD] hover:text-[#2e53fc] cursor-pointer"
            >
              {" "}
              password
            </button>
          </h1>

          <div className="flex flex-col justify-center items-center">
            <PrimaryButton
              buttonText="Log In"
              isBackgroundDark={true}
              onClick={() => push("/home/your-profile")}
            />
            <br />
            <h1 className="inline-flex">
              {" "}
              <span>
                {" "}
                <hr />{" "}
              </span>{" "}
              Or{" "}
              <span>
                <hr />
              </span>
            </h1>
            <br />
            <PrimaryButton
              buttonText="Back To Sign In"
              isBackgroundDark={false}
              onClick={() => push("/home/your-profile")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;
