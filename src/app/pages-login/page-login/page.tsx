"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmailAndPassword from "@/components/EmailAndPassword";
import BackButtonComponent from "@/components/BackButtonComponent";
import PrimaryButton from "@/components/PrimaryButton";
import { useRouter } from "next/navigation";


const LoginPage = () => { 
  const { push } = useRouter(); 

  return (
    // Home Page
    <div className="flex flex-col justify-center items-center text-white mt-25">
      <div className="flex flex-col justify-center items-center">
        <img src="/assets/images/Logo.png" alt="logo" className="w-120" />
        <h1 className="text-[26px]">Connecting Riders, One Mile At A Time</h1>

        <div className="mt-40 flex flex-col justify-center items-center gap-5">
          <PrimaryButton buttonText="Log In" isBackgroundDark={false} onClick={() => push("/login")} />
          <PrimaryButton buttonText="Sign Up" isBackgroundDark={true} />
        </div>
      </div>
      {/* Login Section */}
      <div className="flex flex-col justify-center items-center mt-20 ">

        <div className="text-[46px] pb-8">
          <h1>
            Let's <span className="text-blue-600 tracking-widest">Ride</span>
          </h1>
        </div>

        <hr className="w-[20rem] pt-16" />
        <h1 className="text-4xl tracking-widest mb-30">Login</h1>
        
      {/* Let's Ride Section */}
      {/* Enter Email */}
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
          
          <h1>forgot <span className="text-[#506FFD] hover:text-[#2e53fc] cursor-pointer"> password</span></h1>

          <PrimaryButton buttonText="Log In" isBackgroundDark={true}/> 
      </div>
      </div>

    </div>

    
  );
      
  
}

export default LoginPage

// Code for overlay animation, use later

 // const [showNextCard, setShowNextCard] = useState(false);

  // Animation for switching overlays
  // const slideAnimation = {
  //   hidden: { x: "100%", opacity: 0 }, // Start off-screen (right)
  //   visible: { x: "0%", opacity: 1, transition: { duration: 0.5 } }, // Slide in
  //   exit: { x: "-100%", opacity: 0, transition: { duration: 0.5 } }, // Slide out (left)
  // }


{/* <AnimatePresence>
          {!showNextCard ? (
            <motion.div key="login-card"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideAnimation}
            className="p-6 rounded-lg shadow-md w-full h-full flex flex-col items-center justify-center"
            >             
            <div className="mt-40 flex flex-col justify-center items-center gap-5">
            <PrimaryButton buttonText="Log In" isBackgroundDark={false}  />
            <PrimaryButton buttonText="Sign Up" isBackgroundDark={true} />
            </div>
            
            </motion.div>
          ) : ( // Syntax for transition to another stlye
            <motion.div
              key="next-card"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={slideAnimation}
              className="absolute bg-white p-6 rounded-lg shadow-md w-full h-full flex flex-col items-center justify-center"
            >
              <h2 className="text-lg font-bold mb-4">Welcome!</h2>
              <p className="text-gray-600">You are now logged in.</p>
            </motion.div>
          )}
        </AnimatePresence> */}