"use client";
import React from "react";
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
          <img
            className={"h-[50px] hover:bg-stone-800"}
            src="/assets/images/left.png"
            alt="backicon"
          />
        </button>
      </section>
    </nav>
  );
};

export default BackButtonComponent;
