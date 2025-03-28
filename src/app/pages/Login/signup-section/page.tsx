"use client"
import BackButtonComponent from '@/components/BackButtonComponent';
import PasswordInputComponent from '@/components/PasswordInputComponent';
import PrimaryButton from '@/components/PrimaryButton'
import { createAccount } from '@/components/utils/DataServices';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const SignUpSection = () => {
  const { push } = useRouter(); 
    
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async () => {
      const userData = { email: email, password: password };
      const success = await createAccount(userData);
    
      if (success) {
        alert("Account Created!");
        push("/pages/aboutyou")
      } else {
        alert("Email already in use.");
      }
    };
          
  // End of logic
  return (
    <div>
      <BackButtonComponent onClick={() => push("/")}/>
<div className='flex flex-col justify-center items-center text-white mt-10'>

<div className="text-[46px] pb-8">
<h1>
Let's <span className="text-blue-600 tracking-widest">Ride</span>
</h1>
</div>

<hr className="w-[20rem] pt-10" />
<h1 className="text-4xl tracking-widest mb-20">Sign Up</h1>
  <div className="w-100 flex flex-col gap-3">
      <div className="">
        <h2>Enter Email</h2>
      </div>
      <div className="w-full relative flex items-center border-b-2 pb-3">
        <img
          className="absolute h-[20px]"
          src="/assets/images/mail1.png"
          alt="email logo"
        />
        <input
          type="text"
          placeholder="Enter Email Here"
          className="pl-8 w-full focus:outline-none"
          required 
          onChange={(e) => setEmail(e.target.value)}
        />
        
      </div>

      {/* Enter Password */}
       <div className="">
        <h2>Enter Password</h2>
      </div>
      <div className="w-full relative flex items-center border-b-2 pb-3">
        <img
          className="absolute h-[20px]"
          src="/assets/images/mail1.png"
          alt="email logo"
        />
        <input
          type="text"
          placeholder="Enter Password Here"
          className="pl-8 w-full focus:outline-none"
          required 
          onChange={(e) => setPassword(e.target.value)}
        />
        
      </div>
      {/* <PasswordInputComponent
        isPasswordVisible={isPasswordVisible}
        handleToggleFunction={handleTogglePassword}
        placeHolderText="Enter your password"
        handleInput={handlePasswordChange}
        input={password}
      /> */}

      {/* Confirm Password */}
      {/* <h1>Confirm Password </h1>
      <PasswordInputComponent
        isPasswordVisible={isPasswordVisible}
        handleToggleFunction={handleTogglePassword}
        placeHolderText="Confirm your password"
        handleInput={handlePasswordChange}
        input={password}
      /> */}

      <div className='flex justify-center pt-5'>
      <PrimaryButton  buttonText="Sign Up" isBackgroundDark={false} onClick={handleSubmit}/>
      </div>

  </div>
</div>
</div>
  )
}


export default SignUpSection
