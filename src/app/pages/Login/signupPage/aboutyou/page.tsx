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

import { UserProfileSetup } from "@/components/utils/DataServices";
import DropDownInputComp from "@/components/inputs/DropdownComp";
import { uploadBytesResumable } from "firebase/storage";

const AboutYouPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isUserNameEmpty, setIsUserNameEmpty] = useState<boolean>(false);
  const [isNameEmpty, setIsNameEmpty] = useState<boolean>(false);
  const [isLocationEmpty, setIsLocationEmpty] = useState<boolean>(false);
  const [isBikeTypeEmpty, setIsBikeTypeEmpty] = useState<boolean>(false);
  const [isImageFilled, setIsImageFilled] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  
  // Upload progress states
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [isFirstQuestionsComplete, setIsFirstQuestionsComplete] =
    useState<boolean>(false);
  const [userId, setUserID] = useState<number>(0);

  const [userName, setUserName] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [bikeType, setBikeType] = useState<string>("");
  const [ridingExperience, setRidingExperience] = useState<string>("");
  const [preferences, setPreferences] = useState<string>("");
  const [ridingFrequency, setRidingFrequency] = useState<string>("");
  const { push } = useRouter();

  // Image compression function
  const compressImage = (file: File, maxWidth: number = 800, quality: number = 0.8): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions maintaining aspect ratio
        let { width, height } = img;
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxWidth) {
            width = (width * maxWidth) / height;
            height = maxWidth;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        }, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImagePost = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Check file size (max 10MB for profile pictures)
    const maxFileSize = 10 * 1024 * 1024;
    if (file.size > maxFileSize) {
      alert("File size must be under 10MB.");
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);
      setUploadStatus("Compressing image...");

      // Compress image for faster upload
      const compressedFile = file.type.startsWith("image/") 
        ? await compressImage(file, 800, 0.8)
        : file;

      setUploadStatus("Preparing upload...");

      const imageRef = ref(storage, `profilePictures/${userId}_${Date.now()}_${compressedFile.name}`);
      const uploadTask = uploadBytesResumable(imageRef, compressedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(Math.round(progress));
          setUploadStatus(`Uploading... ${Math.round(progress)}%`);
          console.log("Upload is " + progress.toFixed(2) + "% done");
        },
        (error) => {
          setIsUploading(false);
          setUploadProgress(0);
          setUploadStatus("Upload failed");
          console.error("Upload error:", error);
          setTimeout(() => setUploadStatus(""), 3000);
        },
        async () => {
          setUploadStatus("Processing...");
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImage(downloadURL);
          setIsImageFilled(true);
          setIsUploading(false);
          setUploadProgress(100);
          setUploadStatus("Upload complete!");
          console.log("File available at", downloadURL);
          setTimeout(() => setUploadStatus(""), 2000);
        }
      );
    } catch (error) {
      console.error("Unexpected error during upload:", error);
      setIsUploading(false);
      setUploadProgress(0);
      setUploadStatus("Upload failed");
      setTimeout(() => setUploadStatus(""), 3000);
    }
  };

  const uploadDefaultPicture = async (id: number) => {
    try {
      setUploadStatus("Loading default image...");
      const response = await fetch("/assets/images/defaultPicture.png");
      const blob = await response.blob();
      const imageRef = ref(
        storage,
        `profilePictures/${id}_defaultUserPicture.png`
      );
      await uploadBytes(imageRef, blob);
      const url = await getDownloadURL(imageRef);
      setImage(url);
      setIsImageFilled(true);
      setUploadStatus("");
    } catch (error) {
      console.error("Error uploading default image:", error);
      setUploadStatus("Failed to load default image");
      setTimeout(() => setUploadStatus(""), 3000);
    }
  };

  const validateFirstPageFields = () => {
    let isValid = true;
    
    if (!userName.trim()) {
      setIsUserNameEmpty(true);
      isValid = false;
    } else {
      setIsUserNameEmpty(false);
    }
    
    if (!name.trim()) {
      setIsNameEmpty(true);
      isValid = false;
    } else {
      setIsNameEmpty(false);
    }
    
    if (!location.trim()) {
      setIsLocationEmpty(true);
      isValid = false;
    } else {
      setIsLocationEmpty(false);
    }
    
    if (!bikeType.trim()) {
      setIsBikeTypeEmpty(true);
      isValid = false;
    } else {
      setIsBikeTypeEmpty(false);
    }
    
    return isValid;
  };

  const handleNextButton = async () => {
    if (!validateFirstPageFields()) {
      return;
    }
    
    setIsFirstQuestionsComplete(true);
  };

  const validateSecondPageFields = () => {
    return ridingExperience && preferences && ridingFrequency;
  };

  const handleSubmitButton = async () => {
    if (!validateSecondPageFields()) {
      alert("Please fill out all fields before submitting.");
      return;
    }
    
    if (userId && image && !isUploading) {
      setIsSubmitting(true);
      setUploadStatus("Creating profile...");
      
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
        if (sendProfileData) {
          setUploadStatus("Profile created successfully!");
          setTimeout(() => {
            push("/home");
          }, 1000);
        }
      } catch (error) {
        console.error(error);
        setUploadStatus("Failed to create profile");
        setIsSubmitting(false);
        setTimeout(() => setUploadStatus(""), 3000);
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
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        const userToken_ID = GetLocalStorage();
        if (userToken_ID) {
          setUserID(userToken_ID.id);
        } else {
          push("/pages/Login");
        }
      });
    } else {
      // fallback for unsupported browsers
      setTimeout(() => {
        const userToken_ID = GetLocalStorage();
        if (userToken_ID) {
          setUserID(userToken_ID.id);
        } else {
          push("/pages/Login");
        }
      }, 1);
    }
  }, []);

  useEffect(() => {
    if (userId > 0) {
      uploadDefaultPicture(userId);
    }
  }, [userId]);

  // Check if first page is complete
  const isFirstPageComplete = userName.trim() && name.trim() && location.trim() && bikeType.trim() && isImageFilled && !isUploading;
  
  // Check if second page is complete
  const isSecondPageComplete = ridingExperience && preferences && ridingFrequency && !isUploading && !isSubmitting;

  return (
    <div className="text-white h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-800 to-black">
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
        
        {/* Upload Progress Display */}
        {(isUploading || uploadStatus) && (
          <div className="w-64 max-w-[80%] mt-2">
            {isUploading && (
              <div className="mb-2">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-blue-300">{uploadStatus}</span>
                  <span className="text-blue-200">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
            {!isUploading && uploadStatus && (
              <div className={`text-sm text-center ${
                uploadStatus.includes('failed') || uploadStatus.includes('Failed') 
                  ? 'text-red-400' 
                  : uploadStatus.includes('complete') || uploadStatus.includes('success')
                  ? 'text-green-400'
                  : 'text-gray-400'
              }`}>
                {uploadStatus}
              </div>
            )}
          </div>
        )}
      </section>

      <main className="w-[100%] h-[80%] md:h-[60%]  lg:w-[35%] flex flex-col justify-center items-center transform-all duration-300  overflow-y-auto">
        <div
          className={`${
            isFirstQuestionsComplete ? "hidden" : "block"
          } w-[90%] h-full md:w-[60%] lg:w-[60%] lg:h-[85%] lg:gap-0 gap-5  flex flex-col justify-evenly items-center transform-all duration-300`}
        >
          <InputComponent
            inputTitle={
              isUserNameEmpty ? "Required, please enter username" : "User Name *"
            }
            imageSourcePath="/assets/images/user.png"
            placeholderText="Enter user name"
            type="string"
            input={userName}
            handleInput={(e) => setUserName(e.target.value)}
            isFieldEmpty={isUserNameEmpty}
          />
          <InputComponent
            inputTitle={
              isNameEmpty ? "Required, please enter name" : "Name *"
            }
            imageSourcePath="/assets/images/user.png"
            placeholderText="Enter name"
            type="string"
            input={name}
            handleInput={(e) => setName(e.target.value)}
            isFieldEmpty={isNameEmpty}
          />
          <InputComponent
            inputTitle={
              isLocationEmpty ? "Required, please enter city" : "What city are you based *"
            }
            imageSourcePath="/assets/images/location.png"
            placeholderText="Enter your city"
            type="string"
            input={location}
            handleInput={(e) => setLocation(e.target.value)}
            isFieldEmpty={isLocationEmpty}
          />
          <InputComponent
            inputTitle={
              isBikeTypeEmpty ? "Required, please enter bike brand" : "What brand of motorcycle do you ride? *"
            }
            imageSourcePath="/assets/images/motorbike.png"
            placeholderText="Enter you bike brand"
            type="string"
            input={bikeType}
            handleInput={(e) => setBikeType(e.target.value)}
            isFieldEmpty={isBikeTypeEmpty}
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
            <h1>Riding Experience Level *</h1>
            <DropDownInputComp
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
            <h1>Riding Preferences *</h1>
            <DropDownInputComp
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
            <h1>How often do you ride? *</h1>
            <DropDownInputComp
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
          
          {/* Profile Submission Progress */}
          {isSubmitting && (
            <div className="w-full mt-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-center text-blue-300 mb-2">{uploadStatus}</div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          )}
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
              buttonText={isUploading ? "Uploading..." : "Next"}
              isBackgroundDark={false}
              onClick={handleNextButton}
              disabled={!isFirstPageComplete}
            />
          </div>
          <div
            className={`${
              isFirstQuestionsComplete ? "block" : "hidden"
            } h-[70%] w-[80%] md:h-[40%] md:w-[50%] lg:w-[60%]`}
          >
            <PrimaryButton
              buttonText={
                isSubmitting ? "Creating Profile..." : 
                isUploading ? "Uploading..." : 
                "Submit"
              }
              isBackgroundDark={true}
              onClick={handleSubmitButton}
              disabled={!isSecondPageComplete}
            />
          </div>
        </footer>
      </main>
    </div>
  );
};

export default AboutYouPage;