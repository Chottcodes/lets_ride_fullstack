"use client";
import React from "react";
import Image from "next/image";
interface propTypes {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFileUploaded: boolean;
  imageURL: string | null;
}

const HandleFileInput = (props: propTypes) => {
  const { onChange, isFileUploaded, imageURL } = props;
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File selected:", e.target.files); // Check if files are being selected
    onChange(e); // Call the passed onChange handler
  };
  return (
    <div className="w-full h-full  flex justify-center items-center rounded-full">
      <input
        type="file"
        id="upload-File"
        className="hidden h-full w-full"
        onChange={handleFileChange}
      />
      <label
        htmlFor="upload-File"
        className="w-full h-full flex justify-center items-center cursor-pointer overflow-hidden"
      >
        <Image
          width={100}
          height={100}
          className={`${
            isFileUploaded ? "w-full h-full rounded-full" : "w-5"
          }`}
          src={`${isFileUploaded ? imageURL : "/assets/images/plus.png"}`}
          alt="plus symbol"
        />
      </label>
    </div>
  );
};

export default HandleFileInput;
