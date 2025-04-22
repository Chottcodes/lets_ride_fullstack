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
        const response:IToken = await logIn(userData);
        const { id, token } = response.result;
        if (token) {
          console.log(token);
          if (typeof window !== "undefined") {
            localStorage.setItem("Token", token);
            localStorage.setItem("ID", id.toString());
           
          }
          console.log("Login Successful");
          push("/home/profile");
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
    <div className=" h-screen flex flex-col justify-center items-center">
      <main className="w-full h-[90%] md:h-[60%]  lg:h-[80%] flex flex-col justify-center items-center text-white transform-all duration-300 ">
        <header className=" h-[20%] w-[50%] gap-2 text-3xl lg:h-[40%] lg:w-[20%]   flex flex-col justify-center items-center lg:gap-3 transform-all duration-300 ">
          <h1>
            Lets<span className="text-[#5070fd] tracking-widest"> Ride</span>
          </h1>
          <hr className="w-[70%]" />
          <h1 className="tracking-widest">Login</h1>
        </header>
        <section className="w-[70%] h-[34%]  md:h-[35%] md:w-[50%] lg:w-[20%] lg:h-[55%] flex flex-col transform-all duration-300 ">
          <div className="w-full h-full flex flex-col gap-2 lg:gap-5">
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
            <h1>
              forgot{" "}
              <button
                onClick={() => push("/pages/Login/resetPage")}
                className="text-[#506FFD] hover:text-[#2e53fc] cursor-pointer"
              >
                {" "}
                password
              </button>
            </h1>
          </div>
        </section>
        <footer className="w-[70%] h-[25%] md:w-[50%] md:h-[30%] lg:w-[20%] lg:h-[35%] flex flex-col justify-center items-center ">
          <div className="w-full h-[70%] md:h-full ">
            <PrimaryButton
              buttonText="Log In"
              isBackgroundDark={true}
              onClick={handleLogIn}
            />
          </div>
          <br />
          <div className=""></div>
          <h1 className="inline-flex ">
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
          <div className="w-full h-[70%] md:h-full">
            <PrimaryButton
              buttonText="Sign up"
              isBackgroundDark={false}
              onClick={() => push("/pages/Login/signupPage")}
            />
          </div>
        </footer>
      </main>
    </div>
  );
};
export default LoginSectionPage;
