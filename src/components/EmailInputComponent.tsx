'use client'
import React, { useEffect, useState } from 'react';
import { handleInputChange } from './utils/GatherInput';
//This is a reusable email component that captures the users email input 
const EmailInputComponent = () => {
  const [emailInput, setEmailInput] = useState('')
  useEffect(()=>{
  },[emailInput])
  return (
    <div className="w-full flex flex-col gap-5">
      <div>
        <h2>Enter Email</h2>
      </div>
      <div className="w-full relative flex items-center border-b-2 pb-3">
        <img
          className="absolute h-[20px]"
          src="/assets/images/mail1.png"
          alt="Mail Icon"
        />
        <input
          type="email"
          value={emailInput}
          onChange={(e)=> handleInputChange(e,setEmailInput)}
          placeholder="Enter Email"
          className="pl-8 w-full focus:outline-none text-white"
        />
      </div>
    </div>
  );
}

export default EmailInputComponent;
