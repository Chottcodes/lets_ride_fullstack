"use client";
import React, { useEffect, useState } from "react";
import InputComponent from "@/components/inputs/InputComponent";
import PasswordInputComponent from "@/components/inputs/PasswordInputComponent";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useRouter } from "next/navigation";
import { createAccount } from "@/components/utils/DataServices";
import { Progress } from "@/components/ui/progress";
import { CreateUserReturnOBJ } from "@/components/utils/Interface";
const SignUpPage = () => {
  const { push } = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [finalAnswer, SetFinalAnswer] = useState<string>("");
  const [finalQuestion, setFinalQuestion] = useState<string>("");
  const [emailTitle, setEmailTitle] = useState<string>("Email");
  const [passwordTitle, setPasswordTitle] = useState<string>("Enter Password");
  const [seconds, setSeconds] = useState<number>(0);
   const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isPasswordVisiable, setIsPasswordVisiable] = useState(false);
  const [isTheSame, setIsTheSame] = useState<boolean>(false);
  const [isOptionsShowing, setIsOptionsShowing] = useState<boolean>(true);
  const [isSignUpComplete, setIsSignUpComplete] = useState<boolean>(false); // change back to false
  const [isFetchSuccessfull, setIsFetchSuccessFull] = useState<boolean>(false); //change back to false
 
  const handleQuestionSubmit = async () => {
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
    secondTimer();
  };
  const handleBackButton = () => {
    setIsSignUpComplete(false);
  };

  const handleSignUp = () => {
    if (email && password == confirmPassword) {
      setIsSignUpComplete(true);
      setIsOptionsShowing(true);
    } else if (!email && !password && !confirmPassword) {
      setIsTheSame(true);
      setEmailTitle("Invalid all fields must be filled");
    } else if (password != confirmPassword) {
      setIsTheSame(true);
      setPasswordTitle("Passwords don't match");
    }
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisiable((prev) => !prev);
  };
  const SaveToLocalStorage = (Token:string, ID:number)=>{
    if(typeof window!=="undefined")
    {
      localStorage.setItem("Token", Token);
      localStorage.setItem("ID", JSON.stringify(ID));
    }
  }
  useEffect(() => {
    if (seconds == 100 && email && password && finalAnswer && finalQuestion) {
      const Userobj = {
        Email: email,
        Password: password,
        Question: finalQuestion,
        Answer: finalAnswer,
      };
      const SendData = async () => {
        try {
          const CreateAccount = await createAccount(Userobj);
          if (CreateAccount) {
            const {result}:CreateUserReturnOBJ = CreateAccount;
            SaveToLocalStorage(result.token,result.id);
            console.log(CreateAccount)
            setIsFetchSuccessFull(true);
            audioRef.current?.play();
            setTimeout(()=>{
              push('/pages/Login/signupPage/aboutyou')
            },2000)
          } else {
            setIsSignUpComplete(false);
            setIsTheSame(false);
            setEmail("Somthing went wrong try again later.")
          }
        } catch (error) {
          console.error(error);
          alert("Something Went Wrong or Account Already Exist");
        }
      };
      SendData();
    }else{
      
    }
  }, [seconds, email, password, finalAnswer, finalQuestion]);

  // End of logic
  return (
    <div className="h-screen bg-gradient-to-b from-gray-800 to-black">
      <main className="h-[90%] md:h-[80%] md:justify-center lg:h-[90%]  flex flex-col justify-start items-center lg:justify-center md:gap-10 lg:gap-2 text-white transform-all duration-300 ">
        <header className="w-[40%] h-[20%] gap-3 md:h-[10%] md:w-[40%] lg:h-[20%] lg:w-[30%] text-4xl flex flex-col justify-center items-center lg:gap-2  transform-all duration-300 ">
          <h1>
            Lets <span className="text-blue-600 tracking-widest">Ride</span>
          </h1>
          <hr className="w-full md:w-[70%] lg:w-[50%]" />
          <h1 className="tracking-widest">Sign Up</h1>
        </header>

        <section
          className={`${
            isSignUpComplete ? "hidden" : "block"
          } h-[45%] w-[65%] md:w-[40%] md:h-[30%] lg:w-[20%] lg:h-[45%] flex flex-col gap-3 transform-all duration-300 overflow-y-auto `}
        >
          <InputComponent
            type="email"
            input={email}
            imageSourcePath="/assets/images/mail1.png"
            inputTitle={emailTitle}
            placeholderText="Enter Email"
            handleInput={(e) => setEmail(e.target.value)}
            isFieldEmpty={isTheSame}
          />
          <div className={`flex flex-col lg:gap-5 h-full`}>
            <PasswordInputComponent
              isPasswordVisible={isPasswordVisiable}
              handleToggleFunction={togglePasswordVisibility}
              placeHolderText={passwordTitle}
              passwordTitle={`${
                isTheSame
                  ? "Invalid Make sure passwords match"
                  : "Enter Password"
              }`}
              handleInput={(e) => setPassword(e.target.value)}
              input={password}
              isFieldEmpty={isTheSame}
            />
            <PasswordInputComponent
              isPasswordVisible={isPasswordVisiable}
              handleToggleFunction={togglePasswordVisibility}
              placeHolderText="Confirm password"
              passwordTitle="Confirm Password"
              handleInput={(e) => setConfirmPassword(e.target.value)}
              input={confirmPassword}
              isFieldEmpty={isTheSame}
            />
          </div>
        </section>
        <section
          className={`${
            isSignUpComplete ? "block lg:gap-5" : "hidden"
          } h-[45%] w-[65%] md:w-[40%] md:h-[30%] lg:w-[20%] lg:h-[45%] flex flex-col justify-center items-center gap-3 transform-all duration-300`}
        >
          <div
            className={` lg:w-full lg:h-[40%] flex flex-col lg:gap-5 relative ${
              isOptionsShowing ? "block" : "hidden"
            } `}
          >
            <div
              className={`${
                isFetchSuccessfull ? "block" : "hidden"
              } h-full w-full absolute `}
            >
              <Progress value={seconds} />
               <audio ref={audioRef} src="/audio/ding-126626.mp3" preload="auto" />
            </div>
            <p>Please Answer Security Question</p>
            <select
              className="w-full bg-black"
              onChange={(e) => setFinalQuestion(e.target.value)}
              value={finalQuestion}
            >
              <option value="" disabled hidden>
                Select question
              </option>
              <option value="Whats you favorite movie?">
                Whats you favorite movie?
              </option>
              <option value="What was the name of your first pet?">
                What was the name of your first pet?
              </option>
              <option value="Who was you childhood best friend?">
                Who was you childhood best friend?
              </option>
            </select>
            <input
              className="w-full h-full lg:rounded-lg bg-white text-black pl-2"
              value={finalAnswer}
              onChange={(e) => SetFinalAnswer(e.target.value)}
            />
          </div>
        </section>
        <footer className="h-[15%] w-[60%] gap-5 md:h-[15%] md:w-[40%] lg:w-[20%] lg:h-[20%] flex flex-col justify-evenly">
          <div
            className={`${
              isSignUpComplete ? "hidden" : "block"
            } h-[40%] lg:h-[40%]`}
          >
            <PrimaryButton
              buttonText="Sign Up"
              isBackgroundDark={false}
              onClick={handleSignUp}
            />
          </div>
          <div
            className={`${
              isSignUpComplete ? "hidden" : "block"
            } h-[40%] lg:h-[40%]`}
          >
            <PrimaryButton
              buttonText="Login"
              isBackgroundDark={true}
              onClick={() => push("/pages/Login/loginPage")}
            />
          </div>
          <div
            className={`${
              isSignUpComplete ? "block" : "hidden"
            } h-[40%] lg:h-[40%]`}
          >
            <PrimaryButton
              isBackgroundDark={true}
              onClick={handleQuestionSubmit}
              buttonText="Submit"
            />
          </div>
          <div
            className={`${
              isSignUpComplete ? "block" : "hidden"
            } h-[40%] lg:h-[40%]`}
          >
            <PrimaryButton
              isBackgroundDark={false}
              onClick={handleBackButton}
              buttonText="Back"
            />
          </div>
        </footer>
      </main>
    </div>
  );
};
export default SignUpPage;
