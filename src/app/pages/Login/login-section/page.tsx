"use client"

import BackButtonComponent from '@/components/BackButtonComponent';
import InputComponent from '@/components/InputComponent';
import PrimaryButton from '@/components/PrimaryButton'
import { logIn } from '@/components/utils/DataServices';
import { IToken } from '@/components/utils/Interface';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const LoginSection = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const handleLogIn = async () => 
    {
      const userData = { email: email, password: password };
      
      console.log(userData)


      try {
        const token: IToken = await logIn(userData);
    
        if (token) {
          if (typeof window !== "undefined") {
            localStorage.setItem("Token", token.token);
            console.log(token.token);
          }
          console.log("Login Successful");
          push("/pages/profile")
        } else {
          alert("Login unseccssful");
        }
      } catch (error) {
        alert("Something went wrong.");
      }
    }
  return (
    <div className=" h-screen ">
      <nav className="w-full h-[100px] flex justify-start items-center pl-5">
        <BackButtonComponent onClick={() => push("/")} />
      </nav>
      <main className="flex flex-col justify-center items-center text-white">
        <header className="text-[46px] h-auto w-full flex flex-col justify-center items-center gap-5">
          <h1>
            Let's<span className="text-blue-600 tracking-widest"> Ride</span>
          </h1>
          <hr className="w-[20rem]" />
          <h1 className="text-4xl tracking-widest mb-20">Login</h1>
        </header>
        <div className="w-[90%] md:h-full md:w-[50%] lg:w-[20%] flex flex-col gap-5 transform-all duration-300">
          <div className="w-full h-full flex flex-col gap-5">
            <InputComponent
              type="email"
              input={email}
              imageSourcePath="/assets/images/mail1.png"
              inputTitle="Enter Email"
              placeholderText="Enter Email"
              email={''} handleInput={function (e: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              } } isFieldEmpty={false}            />
            <input
              type="text"
              placeholder="Enter Email"
              className="pl-8 w-100 focus:outline-none"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          </div>
          {/* Enter Password */}
          <div className="">
            <h2>Enter Password</h2>
          </div>
          <div className="relative w-full border-b-2 pb-3 flex items-center">
            <img
              src="/assets/images/padlock (1).png"
              alt="lock icon"
              className="absolute h-[20px]"
            />
            <input
              type="text"
              placeholder="Enter Password"
              required 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-6 focus:outline-none"
              
            />
            <img
              src="/assets/images/hide.png"
              alt="eyeglass icon"
              className="h-[20px] absolute left-[90%] cursor-pointer"
            />
          </div>
          
          <h1>forgot <button onClick={() => push("/pages/Login/resetpassword")} className="text-[#506FFD] hover:text-[#2e53fc] cursor-pointer"> password</button></h1>

          <div className='flex flex-col justify-center items-center'>
            <PrimaryButton buttonText="Log In" isBackgroundDark={true} onClick={handleLogIn} />
              <br /> 
            <h1 className='inline-flex'> <span> <hr /> </span> Or <span><hr /></span></h1>
            <br />
          <PrimaryButton buttonText="Back To Sign In" isBackgroundDark={false} />
          </div>
          
           </main>
        </div>
  );
};
export default LoginSection;
