"use client";
import HandleFileInput from "@/components/inputs/HandleFileInput";
import React, { useEffect } from "react";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputComponent from "@/components/inputs/InputComponent";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { UserProfileTypes } from "@/components/utils/Interface";
import DropDownInputComponent from "@/components/buttons/DropDownInputComponent";
import { UserProfileSetup } from "@/components/utils/DataServices";

const AboutYouPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isUserNameEmpty, setIsUserNameEmpty] = useState<boolean>(false);
  const [isImageFilled, setIsImageFilled] = useState<boolean>(false);
  const [isFirstQuestionsComplete, setIsFirstQuestionsComplete] =
    useState<boolean>(false);
  const [userId, setUserID] = useState<number>();
  const [userToken, setUserToken] = useState<string | null>();
  const [userName, setUserName] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [bikeType, setBikeType] = useState<string>("");
  const [ridingExperience, setRidingExperience] = useState<string>("");
  const [preferences, setPreferences] = useState<string>("");
  const [ridingFrequency, setRidingFrequency] = useState<string>("");
  const { push } = useRouter();


  const handleImagePost = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    try {
      if (file) {
        const imageRef = ref(storage, `profilePicture/${userId}_${file?.name}`);
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        setImage(url);
        setIsImageFilled(true);
        console.log("Uploaded profile picture URL:", url);
      } else {
        uploadDefaultPicture();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const uploadDefaultPicture = async () => {
    const defaultImagePath = "/assets/images/defaultUserPicture.png";
    const defaultImageRef = ref(
      storage,
      `profilePictures/${userId}_${defaultImagePath}`
    );
    try {
      const defaultImage = await fetch(defaultImagePath);
      const blob = await defaultImage.blob();
      await uploadBytes(defaultImageRef, blob);
      const url = await getDownloadURL(defaultImageRef);
      setImage(url);
    } catch (error) {
      console.error("Error uploading default images:", error);
    }
  };

  const handleNextButton = async () => {
    if (!userName) setIsUserNameEmpty(true);
    if (!name) setName("N/A");
    if (!location) setLocation("N/A");
    if (!bikeType) setBikeType("N/A");
    else setIsFirstQuestionsComplete(true);
  };
  const handleSubmitButton = async () => {
    if (userId) {
      console.log(userToken);
      if (image) {
        const UserInfoObj: UserProfileTypes = {
          UserName: userName,
          UserId: userId,
          Name: name,
          Location: location,
          BikeType: bikeType,
          RidingExperience: ridingExperience,
          RidingPreference: preferences,
          RideConsistency: ridingFrequency,
          ProfilePicture: image,
        };
        try {
          const sendProfileData = await UserProfileSetup(UserInfoObj);
          push("/pages/profile");
          if (sendProfileData) {
            console.log("success");
            push("/home");
          } else console.log("failed");
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  const GetLocalStorage = () => {
    const Token = localStorage.getItem("Token");
    const UserId = localStorage.getItem("ID");

    if (Token && UserId) {
      const UsersOBJ: { id: number; token: string | null } = {
        id: Number(UserId),
        token: Token,
      };
      return UsersOBJ;
    }
    return null;
  };
  useEffect(() => {
    const userToken_ID = GetLocalStorage();
    if (userToken_ID) {
      setUserID(userToken_ID.id);
      setUserToken(userToken_ID.token);
    } else {
      push("pages/Login");
    }
  }, []);

  return (
    <div className="text-white h-screen flex flex-col justify-center items-center">
      <header className="w-full h-[10%] flex flex-col items-center justify-center gap-5 lg:gap-7 lg:mt-0">
        <h1 className="text-4xl">
          Tell Us About <span className="text-[#506FFD]">Yourself</span>
        </h1>
        <hr className="hidden lg:w-[20%] lg:block border-1" />
      </header>
      <section
        className={`${
          isFirstQuestionsComplete ? "hidden" : "block"
        } w-full h-[20%] flex flex-col justify-center items-center gap-2 mt-10 lg:mt-0`}
      >
        <div className="h-30 w-30 rounded-full lg:h-24 lg:w-24 lg:rounded-full border-2 transform-all duration-300">
          <HandleFileInput
            onChange={handleImagePost}
            isFileUploaded={isImageFilled}
            imageURL={image}
          />
        </div>
        <h5>Add Profile Pictures</h5>
      </section>
      <main className="w-[100%] h-[80%] md:h-[60%]  lg:w-[35%] flex flex-col justify-center items-center transform-all duration-300  overflow-y-auto">
        <div
          className={`${
            isFirstQuestionsComplete ? "hidden" : "block"
          } w-[90%] h-full md:w-[60%] lg:w-[60%] lg:h-[85%] lg:gap-0 gap-5  flex flex-col justify-evenly items-center transform-all duration-300`}
        >
          <InputComponent
            inputTitle={
              isUserNameEmpty ? "Required, please enter username" : "User Name"
            }
            imageSourcePath="/assets/images/user.png"
            placeholderText="Enter user name"
            type="string"
            input={userName}
            handleInput={(e) => setUserName(e.target.value)}
            isFieldEmpty={isUserNameEmpty}
          />
          <InputComponent
            inputTitle="Name"
            imageSourcePath="/assets/images/user.png"
            placeholderText="Enter name"
            type="string"
            input={name}
            handleInput={(e) => setName(e.target.value)}
            isFieldEmpty={false}
          />
          <InputComponent
            inputTitle="What city are you based"
            imageSourcePath="/assets/images/location.png"
            placeholderText="Enter your city"
            type="string"
            input={location}
            handleInput={(e) => setLocation(e.target.value)}
            isFieldEmpty={false}
          />
          <InputComponent
            inputTitle="What brand of motorcycle do you ride?"
            imageSourcePath="/assets/images/motorbike.png"
            placeholderText="Enter you bike brand"
            type="string"
            input={bikeType}
            handleInput={(e) => setBikeType(e.target.value)}
            isFieldEmpty={false}
          />
        </div>
        <div
          className={`${
            isFirstQuestionsComplete ? "block" : "hidden"
          } w-[90%] h-full md:w-[80%] lg:w-[60%] lg:h-[85%] gap-2 flex flex-col justify-evenly items-center transform-all duration-300 overflow-hidden `}
        >
          <section
            className={` w-full lg:h-[10%] gap-5 flex flex-col justify-center  text-lg`}
          >
            <h1>Riding Experience Level</h1>
            <DropDownInputComponent
              onChange={(e) => setRidingExperience(e.target.value)}
              titleOne="Beginner (6 months or less)"
              optionOne="Beginner"
              titleTwo="Intermediate (6 months to 2 years)"
              optionTwo="Intermediate"
              titleThree=" Advanced (2 years or more)"
              optionThree="Advanced"
              titleFour={null}
              optionFour={null}
            />
          </section>
          <section
            className={` w-full h-[10%] gap-5 flex flex-col justify-center text-lg`}
          >
            <h1>Riding Preferences</h1>
            <DropDownInputComponent
              onChange={(e) => setPreferences(e.target.value)}
              titleOne="Cruising"
              optionOne="Cruising"
              titleTwo="Long Distance"
              optionTwo="Long Distance"
              titleThree="Off Road"
              optionThree="Off Road"
              titleFour="Track Riding/Fast Riding"
              optionFour="Track Riding"
            />
          </section>
          <section
            className={` w-full h-[15%] gap-5 flex flex-col justify-center text-lg`}
          >
            <h1>How often do you ride?</h1>
            <DropDownInputComponent
              onChange={(e) => setRidingFrequency(e.target.value)}
              titleOne="A few times a year"
              optionOne="Rarely"
              titleTwo="A few times a month"
              optionTwo="Occasionally"
              titleThree="Every week"
              optionThree="Regularly"
              titleFour="Daily"
              optionFour="Daily"
            />
          </section>
        </div>
        <footer
          className={`${
            isFirstQuestionsComplete
              ? "h-[20%] md:h-[40%]"
              : "h-[30%] md:h-[40%]"
          } w-full flex justify-center items-center transform-all duration-300`}
        >
          <div
            className={`${
              isFirstQuestionsComplete ? "hidden" : "block"
            } h-[70%] w-[80%] md:h-[40%] md:w-[50%] lg:w-[60%]`}
          >
            <PrimaryButton
              buttonText="Next"
              isBackgroundDark={false}
              onClick={handleNextButton}
            />
          </div>
          <div
            className={`${
              isFirstQuestionsComplete ? "block" : "hidden"
            } h-[70%] w-[80%] md:h-[40%] md:w-[50%] lg:w-[60%]`}
          >
            <PrimaryButton
              buttonText="submit"
              isBackgroundDark={false}
              onClick={() => {
                handleSubmitButton();
              }}
            />
          </div>
        </footer>
      </main>
    </div>
  );
};

export default AboutYouPage;
