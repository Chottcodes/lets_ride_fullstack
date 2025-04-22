import UserRoutesCard from "@/components/ui/UserRoutesCard";
import Image from "next/image";
import React from "react";

const profile = () => {
  return (
    <div className="h-screen flex flex-col gap-5">
      <header className="w-full h-[20%] flex flex-col items-center text-white">
        <Image
          className="w-full h-[80%] object-contain"
          src="/assets/images/Logo.png"
          alt="Description of image"
          width={900}
          height={900}
        />
        <div className="w-full h-[10%] flex justify-start items-start lg:text-2xl pl-10">
          Recents
        </div>
      </header>
      <main className=" h-[80%] flex flex-col items-center text-white">
        <section className="w-[90%] h-[50%] lg:w-[90%] lg:h-[60%] flex items-center overflow-x-auto whitespace-nowrap gap-5 custom-scrollbar pb-2">
          <div className="w-[90%] h-full lg:w-[30%] lg:h-full flex-shrink-0">
          <UserRoutesCard/>
          </div>
          <div className="w-[90%] h-full lg:w-[30%] lg:h-full flex-shrink-0">
          <UserRoutesCard/>
          </div>
          <div className="w-[90%] h-full lg:w-[30%] lg:h-full flex-shrink-0">
          <UserRoutesCard/>
          </div>
          <div className="w-[90%] h-full lg:w-[30%] lg:h-full flex-shrink-0">
          <UserRoutesCard/>
          </div>
          <div className="w-[90%] h-full lg:w-[30%] lg:h-full flex-shrink-0">
          <UserRoutesCard/>
          </div>
        </section>
      </main>
    </div>
  );
};

export default profile;
