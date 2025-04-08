"use client";
import BackButtonComponent from "@/components/buttons/BackButtonComponent";
import React, { useEffect, useState } from "react";
import InputComponent from "@/components/inputs/InputComponent";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import PasswordInputComponent from "@/components/inputs/PasswordInputComponent";
import { useRouter } from "next/navigation";
import SecurityQuestions from "@/components/SecurityQuestions";

import { resetPassword } from "@/components/utils/DataServices";
import { IUserCreate } from "@/components/utils/Interface";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { audio } from "framer-motion/client";

const ResetPage = () => {
  const { push } = useRouter();
  const [isPasswordVisiable, setIsPasswordVisiable] = useState(false);
  const [isFieldEmpty, setIsFieldEmpty] = useState(false);
  const [isSecurityComplete, setIsSecurityComplete] = useState(false);
  const [isPasswordEmpty, setPasswordsEmpty] = useState(false);
  const [isresetComplete, setIsResetComplete] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [finalQuestion, setFinalQuestion] = useState<string>("");
  const [finalAnswer, setFinalAnswer] = useState<string>("");
  const [emailTitle, setEmailTitle] = useState<string>("Email");
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [securityBoxTitle, setSecurityBoxTitle] = useState<string>(
    "Please Answer Your Security Question"
  );
  const [seconds, setSeconds] = useState<number>(0);

  const [passwordTitle, setPasswordTitle] =
    useState<string>("Enter New Password");

  const togglePasswordVisibility = () => {
    setIsPasswordVisiable((prev) => !prev);
  };

  const secondTimer = () => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev < 100) {
          return prev + 15; 
        }
        clearInterval(interval); 
        return 100; 
      });
    }, 30); 
  };

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      setIsFieldEmpty(true);
      setPasswordsEmpty(true);
      setPasswordTitle("Required: Please Enter New Passwords");
    } else if (password != confirmPassword) {
      setPasswordTitle("Password Do Not Match");
      setPasswordsEmpty(true);
    } else {
      secondTimer();
      setIsResetComplete(true);
    }
  };
  const handleNext = () => {
    if (!email && !finalAnswer && !finalQuestion) {
      setIsFieldEmpty(true);
      setEmailTitle("Required: Please Enter Email");
      setSecurityBoxTitle("Required: Answer Your Security Question");
    } else {
      setIsSecurityComplete(true);
    }
  };
  useEffect(() => {
    if (seconds == 100) {
      const changePassword = async () => {
        const userResetDataObj: IUserCreate = {
          Email: email,
          Password: password,
          Question: finalQuestion,
          Answer: finalAnswer,
        };
        try {
          const sendUserInfo = await resetPassword(userResetDataObj);
          if (sendUserInfo) {
            setIsSuccessful(true);
            audioRef.current?.play();
            setTimeout(() => {
              push("/pages/Login/loginPage");
            }, 3000);
          } else if(sendUserInfo == false) {
            setIsFieldEmpty(true);
            setIsSecurityComplete(false);
            setEmailTitle("Error:Make Sure All Fields Are Correct");
            setSeconds(0);
          }
        } catch (error) {
          console.error(error);
        }
      };
      changePassword();
    }
  }, [seconds]);
 


  return (
    <div className="h-screen flex flex-col justify-start items-center lg:gap-5">
      <nav className="w-full h-[10%] flex items-center">
        <div className="pl-5">
          <BackButtonComponent
            onClick={() => push("/pages/Login/loginPage")}
          />
        </div>
      </nav>
      <header className="w-full h-[20%] flex flex-col justify-center items-center gap-4 text-white text-3xl transition-all duration-300 lg:text-4xl">
        <h1>
          LETS<span className="text-[#506FFD]"> RIDE</span>
        </h1>
        <h5>Reset Password</h5>
      </header>
      <main className="w-[85%] h-[35%] md:w-[50%] lg:w-[25%] flex flex-col justify-center items-center">
        <section
          className={`${isSecurityComplete ? "hidden" : "block"} ${
            isFieldEmpty ? "text-red-600" : "text-white"
          } w-[90%] h-[80%] lg:h-[90%]  flex flex-col justify-center gap-5 lg:gap-7`}
        >
          <InputComponent
            inputTitle={emailTitle}
            imageSourcePath="/assets/images/mail1.png"
            placeholderText="Email"
            type="email"
            input={email}
            handleInput={(e) => setEmail(e.target.value)}
            isFieldEmpty={isFieldEmpty}
          />
          <SecurityQuestions
            inputOnChange={(e) => setFinalAnswer(e.target.value)}
            finalAnswer={finalAnswer}
            finalQuestion={finalQuestion}
            selectOnChange={(e) => setFinalQuestion(e.target.value)}
            title={securityBoxTitle}
            isFieldEmpty={isFieldEmpty}
          />
        </section>
        <section
          className={`${
            isSecurityComplete ? "block" : "hidden"
          } w-[90%] h-[40%] lg:h-[80%] flex flex-col justify-center gap-15 lg:gap-2 relative `}
        >
          <div
            className={`${
              isresetComplete ? "block" : "hidden"
            } absolute w-full flex justify-center items-center top-0`}
          >
            <Progress value={seconds} />
            <audio ref={audioRef} src="/audio/ding-126626.mp3" preload="auto" />
          </div>
          <div
            className={`${
              isSuccessful ? "block" : "hidden"
            } w-full h-full absolute top-4 flex flex-col justify-center items-center bg-gray-200/90 rounded-2xl`}
          >
            <div className="w-[50%] h-[50%] flex justify-center items-center animate-bounce">
              <Image
                width={60}
                height={60}
                src={"/assets/images/thumbs-up-blue.png"}
                alt="Blue thumbs up"
              />
            </div>
            <div className="w-full text-blue-600 flex flex-col justify-center items-center">
              <p className="lg:text-5xl">Success!</p>
              <p>Redirecting to login</p>
            </div>
          </div>
          <PasswordInputComponent
            handleInput={(e) => setPassword(e.target.value)}
            handleToggleFunction={togglePasswordVisibility}
            isPasswordVisible={isPasswordVisiable}
            placeHolderText="Enter New Password"
            input={password}
            passwordTitle={passwordTitle}
            isFieldEmpty={isPasswordEmpty}
          />
          <PasswordInputComponent
            handleInput={(e) => setConfirmPassword(e.target.value)}
            handleToggleFunction={togglePasswordVisibility}
            isPasswordVisible={isPasswordVisiable}
            placeHolderText="Confirm Password"
            input={confirmPassword}
            passwordTitle="Enter Password"
            isFieldEmpty={isPasswordEmpty}
          />
        </section>
      </main>
      <footer className="w-[80%] h-[15%] md:w-[50%] lg:w-[20%] flex items-center justify-center ">
        <div
          className={`${
            isSecurityComplete ? "block" : "hidden"
          } w-[70%] h-[40%]`}
        >
          <PrimaryButton
            buttonText="Submit"
            isBackgroundDark={true}
            onClick={handleSubmit}
          />
        </div>
        <div
          className={`${
            isSecurityComplete ? "hidden" : "block"
          } w-[70%] h-[40%]`}
        >
          <PrimaryButton
            buttonText="Next"
            isBackgroundDark={true}
            onClick={handleNext}
          />
        </div>
      </footer>
    </div>
  );
};

export default ResetPage;
