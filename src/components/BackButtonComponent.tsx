"use client";
import React from "react";
//This component is a simple back button componet that redirects the user to the prievious page and is styled accordingly. on click funtion can be created on the parent
interface propsTypes {
  onClick: () => void;
}
const BackButtonComponent = (props: propsTypes) => {
  const { onClick } = props;

  return (
    <div>
      <div className="w-full h-full flex justify-start">
        <button
          className="h-full flex justify-center items-center cursor-pointer"
          onClick={onClick}
        >
          <img
            className={"h-[50px] hover:h-[60px] transition-all duration-300"}
            src="/assets/images/left.png"
            alt="backicon"
          />
        </button>
      </div>
    </div>
  );
};

export default BackButtonComponent;
