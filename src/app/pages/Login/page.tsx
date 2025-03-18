"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PrimaryButton from "@/components/PrimaryButton";
import { useRouter } from "next/navigation";


const LoginPage = () => { 
  const { push } = useRouter(); 

  return (
    // Home Page
    <div className="flex flex-col justify-center items-center text-white sm:mt-10 mt-20">
      <div className="flex flex-col justify-center items-center">
        <img src="/assets/images/Logo.png" alt="logo" className="sm:w-120 w-60" />
        <h1 className="sm:text-[26px] text-[20px] mt-5">Connecting Riders, One Mile At A Time</h1>

        <div className="mt-20 flex flex-col justify-center items-center gap-3">
          <PrimaryButton buttonText="Log In" isBackgroundDark={false} onClick={() => push("/pages/Login/login-section")} />
          <PrimaryButton buttonText="Sign Up" isBackgroundDark={true} onClick={() => push("/pages/Login/signup-section")} />
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