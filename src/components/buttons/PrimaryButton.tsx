"use client";
import React from "react";
// this button is styled for the login, reset ,password and profile set up pages. The button takes the full width and hieght of the parent div.
//If you want to change the background of the button you can set a boolean to switch between black and blue backgrounds. For ex: const [isDark, setIsDark] = useState(true) (dark) and false would be blue bg;
interface propTypes {
  buttonText: string;
  isBackgroundDark: boolean;
  onClick?: () => void;
  disabled?: boolean;
}
const PrimaryButton = (props: propTypes) => {
  const { buttonText, isBackgroundDark, onClick,disabled } = props;
  return (
    <button
      className={`${
        isBackgroundDark ? "bg-black border-2 border-white hover:border-stone-400 " : "bg-[#5070fd] hover:bg-[#2e53fc] "
      } w-full h-full flex justify-center items-center text-center py-2 text-white text-2xl rounded-[.5rem] cursor-pointer`}
      onClick={onClick}
      disabled={disabled}
    >
      <h1>{buttonText}</h1>
    </button>
  );
};

export default PrimaryButton;
