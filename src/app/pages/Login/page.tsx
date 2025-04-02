"use client";
import Image from "next/image";

import PrimaryButton from "@/components/PrimaryButton";
import { useRouter } from "next/navigation";

const SignUpIntroPage = () => {
  const { push } = useRouter();

  return (
    // Home Page
    <div className="h-screen flex flex-col justify-center items-center md:justify-center lg:justify-start text-white  transform-all duration-300">
      <main className=" h-[80%] md:h-[70%] lg:h-[70%] lg:mt-5 flex flex-col justify-evenly items-center md:justify-start  transform-all duration-300 ">
        <div className="flex flex-col justify-center items-center gap-3 w-full  transform-all duration-300">
          <Image
            src="/assets/images/Logo.png"
            width={100}
            height={100}
            alt="logo"
            className="w-80 sm:w-120 "
          />
          <h1 className="sm:text-[26px] text-[20px]">
            Connecting Riders, One Mile At A Time
          </h1>
        </div>
        <section className="w-full h-[30%]  md:w-[70%] md:h-[20%] lg:w-[70%] lg:h-full flex flex-col justify-evenly items-center gap-1  transform-all duration-300">
          
            <div className="w-full h-[30%] md:h-[40%] lg:h-[20%] transform-all duration-300">
              <PrimaryButton
                buttonText="Log In"
                isBackgroundDark={false}
                onClick={() => push("/pages/Login/loginPage")}
              />
            </div>
            <div className="w-full h-[30%] md:h-[40%] lg:h-[20%] transform-all duration-300">
              <PrimaryButton
                buttonText="Sign Up"
                isBackgroundDark={true}
                onClick={() => push("/pages/Login/signupPage")}
              />
            </div>
          
        </section>
      </main>
    </div>
  );
};

export default SignUpIntroPage;


