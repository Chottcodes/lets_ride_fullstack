"use client"
import PrimaryButton from '@/components/PrimaryButton'
import { useRouter } from 'next/navigation';
import React from 'react'



// Push user's value into the backend database (email and password)
// Confirm if password is the same logic
const SignUpSection = () => {
  const { push } = useRouter(); 

  return (
    <div>
    <div className='flex flex-col justify-center items-center text-white mt-10'>


<div className="text-[46px] pb-8">
<h1>
Let's <span className="text-blue-600 tracking-widest">Ride</span>
</h1>
</div>

<hr className="w-[20rem] pt-10" />
<h1 className="text-4xl tracking-widest mb-20">Sign Up</h1>
  <div className="w-100 flex flex-col gap-5">
      <div className="">
        <h2>Enter Email</h2>
      </div>
      <div className="w-full relative flex items-center border-b-2 pb-3">
        <img
          className="absolute h-[20px]"
          src="/assets/images/mail (1).png"
          alt="email logo"
        />
        <input
          type="text"
          placeholder="Enter Email"
          className="pl-8 w-full focus:outline-none"
        />
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
          className="w-full pl-6 focus:outline-none"
        />
        <img
          src="/assets/images/hide.png"
          alt="eyeglass icon"
          className="h-[20px] absolute left-[90%] cursor-pointer"
        />
      </div>
    {/* Confirm Password */}
      <div className="">
        <h2>Confirm Password</h2>
      </div>
      <div className="relative w-full border-b-2 pb-3 flex items-center ">
        <img
          src="/assets/images/padlock (1).png"
          alt="lock icon"
          className="absolute h-[20px]"
        />
        <input
          type="text"
          placeholder="Confirm Password"
          className="w-full pl-6 focus:outline-none"
        />
        <img
          src="/assets/images/hide.png"
          alt="eyeglass icon"
          className="h-[20px] absolute left-[90%] cursor-pointer"
        />
      </div>
      
      <PrimaryButton  buttonText="Sign Up" isBackgroundDark={false} onClick={() => push("/home/your-profile")}/> 
  </div>
</div>
</div>
  )
}

export default SignUpSection
