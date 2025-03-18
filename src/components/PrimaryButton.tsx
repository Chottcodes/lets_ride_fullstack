"use client";
import React from "react";
// this button is styled for the login, reset ,password and profile set up pages. The button takes the full width and hieght of the parent div.
//If you want to change the background of the button you can set a boolean to switch between black and blue backgrounds. For ex: const [isDark, setIsDark] = useState(true) (dark) and false would be blue bg;
interface propTypes {
  buttonText: string;
  isBackgroundDark: boolean;
  onClick?: () => void;
}
const PrimaryButton = (props: propTypes) => {
  const { buttonText, isBackgroundDark, onClick } = props;
  return (
    <button
      className={`${
        isBackgroundDark ? "bg-black border-2 border-white hover:border-stone-400 " : "bg-[#5070fd] hover:bg-[#2e53fc] "
      } w-full h-full sm:w-85 sm:h-13 flex justify-center items-center text-white text-2xl rounded-[.5rem] cursor-pointer`}
      onClick={onClick}
    >
      <h1>{buttonText}</h1>
    </button>
  );
};

export default PrimaryButton;
