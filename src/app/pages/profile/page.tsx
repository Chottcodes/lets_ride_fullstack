"use client";
import DesktopNavBar from "@/components/DesktopNavBar";
import MobileNavBar from "@/components/MobileNavBar";
import PrimaryButton from "@/components/PrimaryButton";
import ProfileDisplay from "@/components/ProfileDisplay";
import ProfileWithDescription from "@/components/ProfileWithDescription";
import React from "react";

const page = () => {
  return (
    <div className="h-screen w-full relative">
        <nav className="bg-green-600 w-[120px] h-full absolute">
            <DesktopNavBar /> 
        </nav>
      <section className="h-[35%] w-full">
        <ProfileWithDescription
          Name="Christopher Wells-Hott"
          Username="Chott"
          Location="Stockton,CA"
        />
      </section>
      <main className=" m-auto w-[80%] h-[55%] flex flex-col lg:flex-wrap lg:justify-start lg:items-center lg:w-[65%] lg:h-[50%] gap-10 text-white overflow-y-auto">
        <section className=" h-[20%] w-full lg:w-[40%]">
          <ProfileDisplay
            header="Name"
            src="/assets/images/user.png"
            text="Christopher Wells-Hott"
          />
        </section>
        <section className=" h-[20%] w-full lg:w-[40%]">
          <ProfileDisplay
            header="Bike Type"
            src="/assets/images/motorbike.png"
            text="Harley Davidson Road Glide"
          />
        </section>
        <section className=" h-[20%] w-full lg:w-[40%]">
          <ProfileDisplay
            header="Ride Frequency"
            src="/assets/images/motorbike.png"
            text="Daily"
          />
        </section>
        <section className=" h-[20%] w-full lg:w-[40%]">
          <ProfileDisplay
            header="Location"
            src="/assets/images/location.png"
            text="Stockton"
          />
        </section>
        <section className=" h-[20%] w-full lg:w-[40%]">
          <ProfileDisplay
            header="Riding Preferences"
            src="/assets/images/motorbike.png"
            text="Cruising"
          />
        </section>
        <section className=" h-[20%] w-full lg:w-[40%]">
          <ProfileDisplay
            header="Experience Level"
            src="/assets/images/motorbike.png"
            text="Intermediate"
          />
        </section>
      </main>
      <section className="flex lg:w-[60%] lg:h-[6%] lg:m-auto lg:justify-between">
        <div className="w-[40%]">
          <PrimaryButton buttonText="Edit" isBackgroundDark={true} />
        </div>
        <div className="w-[40%]">
          <PrimaryButton buttonText="Logout" isBackgroundDark={false} />
        </div>
      </section>
      <footer className="w-full h-[5%] lg:hidden bg-black flex justify-center items-end">
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

export default page;
