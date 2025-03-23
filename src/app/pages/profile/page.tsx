"use client";
import MobileNavBar from "@/components/MobileNavBar";
import ProfileDisplay from "@/components/ProfileDisplay";
import ProfileWithDescription from "@/components/ProfileWithDescription";
import React from "react";

const page = () => {
  return (
    <div className="h-screen w-full">
      <section className="bg-[#506FFD] rounded-b-lg h-[35%] w-full">
        <ProfileWithDescription
          Name="Christopher Wells-Hott"
          Username="Chott"
          Location="Stockton,CA"
        />
      </section>
      <main className=" m-auto w-[80%] h-[55%] flex flex-col gap-10 text-white overflow-y-auto">
        <section className=" h-[20%] w-full pt-3">
          <ProfileDisplay
            header="Username"
            src="/assets/images/user.png"
            text="text"
          />
        </section>
        <section className=" h-[20%] w-full">
          <ProfileDisplay
            header="Username"
            src="/assets/images/user.png"
            text="text"
          />
        </section>
        <section className=" h-[20%] w-full">
          <ProfileDisplay
            header="Username"
            src="/assets/images/user.png"
            text="text"
          />
        </section>
        <section className=" h-[20%] w-full">
          <ProfileDisplay
            header="Username"
            src="/assets/images/user.png"
            text="text"
          />
        </section>
        <section className=" h-[20%] w-full">
          <ProfileDisplay
            header="Username"
            src="/assets/images/user.png"
            text="text"
          />
        </section>
        <section className=" h-[20%] w-full">
          <ProfileDisplay
            header="Username"
            src="/assets/images/user.png"
            text="text"
          />
        </section>
        <section className=" h-[20%] w-full">
          <ProfileDisplay
            header="Username"
            src="/assets/images/user.png"
            text="text"
          />
        </section>
      </main>
      <footer className="w-full h-[5%] bg-black flex justify-center items-end">
      <MobileNavBar/>
      </footer>
    </div>
  );
};

export default page;
