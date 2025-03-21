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
  const { buttonText, isBackgroundDark,onClick } = props;
  return (
    <div
      className={`${
        isBackgroundDark ? "bg-black border-2 border-white " : "bg-[#506FFD] "
      }w-full h-full flex justify-center items-center text-white text-2xl rounded-2xl`}
    >
      <button className="w-full h-full cursor-pointer" onClick={onClick}>{buttonText}</button>
    </div>
  );
};

export default PrimaryButton;
