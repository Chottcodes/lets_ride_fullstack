"use client";
import React from "react";
import Image from "next/image";
//This component is a simple back button componet that redirects the user to the prievious page and is styled accordingly. on click funtion can be created on the parent
interface propsTypes {
  onClick: () => void;
}
const BackButtonComponent = (props: propsTypes) => {
  const { onClick } = props;

  return (
    <nav>
      <section className="flex justify-center items-center ">
        <button
          className="h-full flex justify-center items-center cursor-pointer"
          onClick={onClick}
        >
          <Image
            className={"h-[35px] w-[35px] md:h-[40px] md:w-[40px] lg:h-[40px] lg:w-[40px] hover:bg-stone-800"}
            width={100}
            height={100}
            src="/assets/images/left.png"
            alt="backicon"
          />
        </button>
      </section>
    </nav>
  );
};

export default BackButtonComponent;
