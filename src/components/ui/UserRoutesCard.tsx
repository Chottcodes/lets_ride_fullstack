"use client";
import React from "react";

import Image from "next/image";

const UserRoutesCard = () => {
  return (
    <div className="w-full h-full shadow-md rounded-md border-2 border-blue-500 flex flex-col ">
      <section className="lg:w-full lg:h-[70%]">
        <Image
          src="/assets/testImages/ExampleMap.webp"
          width={900}
          height={900}
          alt="Motorbike POV"
          className=" w-full h-full object-cover"
        />
      </section>
      <main className="h-[70%] w-[90%] m-auto lg:w-full lg:h-[50%]  flex justify-between items-center text-white text-sm ">
        <section className="flex justify-center items-center gap-2 w-[25%] h-full ">
          <div className="flex items-center gap-1 cursor-pointer">
            <button className="cursor-pointer h-[15px] w-[15px] ">
              <Image
                src="/assets/images/card/thumbs-up.png"
                width={900}
                height={900}
                alt="comments"
                className="w-full h-full"
              />
            </button>
            <p className="lg:text-[15px]">20</p>
          </div>

          <div className="flex items-center gap-1 cursor-pointer">
            <button className="cursor-pointer h-[15px] w-[15px] flex justify-center items-center">
              <Image
                src="/assets/images/card/coment.png"
                width={900}
                height={900}
                alt="comments"
                className="w-full h-full"
              />
            </button>
            <p className="lg:text-[15px]">2</p>
          </div>
        </section>
        <section className="w-[50%] h-full  flex justify-center items-center lg:text-[15px]">
          Descriptions
        </section>
        <section className="w-[25%] h-full flex justify-center items-center ">
          <p className="lg:text-[15px] text-white">2/18/2025</p>
        </section>
      </main>
      <div className="h-[90%]  lg:w-full lg:h-[40%] rounded-xl  flex justify-center items-center lg:pb-2">
          <button className="h-[80%] w-[50%] lg:w-[40%] lg:h-full bg-blue-600 rounded-lg hover:bg-blue-800 text-lg">Lets Ride</button>
      </div>
    </div>
  );
};

export default UserRoutesCard;
