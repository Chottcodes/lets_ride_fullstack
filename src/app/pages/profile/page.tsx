"use client";
import React, { useEffect, useState } from "react";
import DesktopNavBar from "@/components/navbars/DesktopNavBar";
import MobileNavBar from "@/components/navbars/MobileNavBar";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import ProfileDisplay from "@/components/ProfileDisplay";
import ProfileWithDescription from "@/components/ProfileWithDescription";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GetUserProfile } from "@/components/utils/DataServices";
import { UserProfileReturnTypes } from "@/components/utils/Interface";

const ProfilePage = () => {
  const { push } = useRouter();
  const [name, setName] = useState<string>("");
  const [userId, setUserId] = useState<number>();
  const [username, setUserName] = useState<string>("");
  const [profilePicture,setProfilePicture]=useState<string>("")
  const [bikeType, setBikeType] = useState<string>("");
  const [ridingFrequency, setRidingFrequency] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [ridePreference, setRidePreference] = useState<string>("");
  const [experienceLevel, setExperienceLevel] = useState<string>("");
  const GetLocalStorageId = () => {
    const getId = localStorage.getItem("ID");
    return Number(getId);
  };
  useEffect(() => {
    const getInfo = GetLocalStorageId();
    const fetchData = async () => {
      if (getInfo) {
        const id = getInfo;
        const getData = await GetUserProfile(id);
        const {
          bikeType,
          location,
          profilePicture,
          rideConsistency,
          ridingExperience,
          ridingPreference,
          userName,
          name,
        }: UserProfileReturnTypes = getData;
        setBikeType(bikeType);
        setLocation(location);
        setProfilePicture(profilePicture);
        setRidingFrequency(rideConsistency);
        setExperienceLevel(ridingExperience);
        setRidePreference(ridingPreference);
        setUserName(userName);
        setName(name)

      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen w-full relative">
      <nav className="w-[120px] hidden lg:flex h-full absolute">
        <DesktopNavBar
          isHomeOn={false}
          isLocationOn={false}
          isGalleryOn={false}
          isProfileOn={true}
        />
      </nav>
      <header className="absolute w-full h-[10%] flex justify-between items-center lg:hidden">
        <button className="pl-5 text-white">Log Out</button>
        <button className="pr-5 h-[45px] w-[45px] ">
          <Image
            src={"/assets/images/edit.png"}
            width={100}
            height={100}
            alt="Edit Icon"
          />
        </button>
      </header>
      <section className="h-[35%] w-full">
        <ProfileWithDescription
        ProfilePicture={profilePicture}
          Name={name}
          Username={username}
          Location={location}
        />
      </section>
      <main className=" m-auto w-[80%] h-[55%] flex flex-col lg:flex-wrap lg:justify-start lg:items-center lg:w-[65%] lg:h-[50%] gap-10 text-white overflow-y-auto">
        <section className=" h-[20%] w-full lg:w-[40%]">
          <ProfileDisplay
            header="Name"
            src="/assets/images/user.png"
            text={name}
          />
        </section>
        <section className=" h-[20%] w-full lg:w-[40%]">
          <ProfileDisplay
            header="Bike Type"
            src="/assets/images/motorbike.png"
            text={bikeType}
          />
        </section>
        <section className=" h-[20%] w-full lg:w-[40%]">
          <ProfileDisplay
            header="Ride Frequency"
            src="/assets/images/motorbike.png"
            text={ridingFrequency}
          />
        </section>
        <section className=" h-[20%] w-full lg:w-[40%]">
          <ProfileDisplay
            header="Location"
            src="/assets/images/location.png"
            text={location}
          />
        </section>
        <section className=" h-[20%] w-full lg:w-[40%]">
          <ProfileDisplay
            header="Riding Preferences"
            src="/assets/images/motorbike.png"
            text={ridePreference}
          />
        </section>
        <section className=" h-[20%] w-full lg:w-[40%]">
          <ProfileDisplay
            header="Experience Level"
            src="/assets/images/motorbike.png"
            text={experienceLevel}
          />
        </section>
      </main>
      <section className="hidden lg:flex lg:w-[60%] lg:h-[6%] lg:m-auto lg:justify-between">
        <div className="w-full lg:w-[40%]">
          <PrimaryButton
            buttonText="Logout"
            isBackgroundDark={false}
            onClick={() => push("/")}
          />
        </div>
        <div className="lg:w-[40%] lg:flex">
          <PrimaryButton buttonText="Edit" isBackgroundDark={true} />
        </div>
      </section>
      <footer className="w-full h-[5%] lg:hidden flex justify-center items-end">
        <MobileNavBar
          isHomeOn={false}
          isLocationOn={false}
          isGalleryOn={false}
          isProfileOn={true}
        />
      </footer>
    </div>
  );
};

export default ProfilePage;
