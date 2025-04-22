'use client'
import Image from "next/image";

import React from 'react'

interface propTypes {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFileUploaded: boolean;
  imageURL: string | null;
}

const RouteImageInput = (props: propTypes) => {
    const { onChange, isFileUploaded, imageURL } = props;
  return (
    <div className="w-full h-full flex justify-center items-center ">
          <input
            type="file"
            id="upload-File"
            
            className="hidden h-full w-full"
            onChange={onChange}
          />
          <label
            htmlFor="upload-File"
            className="w-full h-full flex flex-col justify-center items-center cursor-pointer overflow-hidden gap-2"
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
            Add Route Thumbnail
          </label>
        </div>
  )
}

export default RouteImageInput