"use client";

import React from "react";
import Image from "next/image";


const NavbarHeader = () => {
  return (
    <div className="">
          <div>
            <Image
              src="/assets/images/Logo.png"
              alt="Lets Ride"
              width={1000}
              height={1000}
              className="h-40 w-80 mx-auto relative"
              priority
            />
          </div>
    </div>
  );
};

export default NavbarHeader;
