"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import BackButtonComponent from "../buttons/BackButtonComponent";
import MapsUserCards from "../mapsUserCards";
interface RTypes {
  LikesNumber: number;
  RouteName: string;
  RouteDate: string | undefined;
  RouteComments?: number;
  RouteLikes?: number;
  RouteImage?: string | undefined;
  UserprofilePicture?: string;
  ProfileName: string;
  RouteDescription?: string;
  RouteStartingPoint:[number, number] | undefined;
  TrailCoords:[number, number][] | undefined;
}
const UserRoutesCard = (props: RTypes) => {
  const {
    RouteName,
    RouteDate,
    RouteImage,
    LikesNumber,
    UserprofilePicture,
    ProfileName,
    RouteDescription,
    RouteStartingPoint,
    TrailCoords

  } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  if (!isModalOpen)
    return (
      <div
        className="w-full h-full shadow-md rounded-md border-2 border-blue-500 flex flex-col justify-start overflow-hidden"
      >
        <section className="h-full lg:w-full lg:h-[70%]">
          {RouteStartingPoint && (
            <MapsUserCards StartingPointcoordinates={RouteStartingPoint} zoom={10} trailCoordinates={TrailCoords}/>
          )}
        </section>
        <section className="w-full h-[10%] flex justify-start items-center gap-2">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden pl-5">
            <Avatar>
              <AvatarImage
                src={UserprofilePicture}
                className="object-contain w-full h-full"
              />
              <AvatarFallback>User Profile</AvatarFallback>
            </Avatar>
          </div>
          <div className="text-white">
            <p>{ProfileName}</p>
          </div>
        </section>
        <main className="h-[10%] w-full lg:w-full lg:h-[50%] flex justify-between items-center text-white text-sm ">
          <section className="flex justify-center items-center gap-5 w-[25%] h-full">
            <div className="flex items-center gap-1 cursor-pointer">
              <button className="cursor-pointer h-[15px] w-[15px] flex justify-center items-center gap-2">
                <Image
                  src="/assets/images/card/thumbs-up.png"
                  width={900}
                  height={900}
                  alt="comments"
                  className="w-full h-full"
                />
                {LikesNumber == null ? 0 : LikesNumber}
              </button>
            </div>

            <div className="flex items-center gap-1 cursor-pointer">
              <div className=""></div>
              <button className="cursor-pointer h-[15px] w-[15px] flex justify-center items-center gap-2">
                <Image
                  src="/assets/images/card/coment.png"
                  width={900}
                  height={900}
                  alt="comments"
                  className="w-full h-full"
                />
                {LikesNumber == null ? 0 : LikesNumber}
              </button>
            </div>
          </section>
          <section className="w-[50%] h-full  flex justify-center items-center lg:text-[15px]">
            {RouteName}
          </section>
          <section className="w-[25%] h-full flex justify-center items-center ">
            <p className="lg:text-[15px] text-white">{RouteDate}</p>
          </section>
        </main>
        <footer className="h-[30%] lg:w-full lg:h-[40%] rounded-xl flex justify-center items-center lg:pb-2 ">
          <button onClick={() => setIsModalOpen(true)} className="h-[70%] w-[50%] lg:w-[40%] lg:h-full bg-blue-600 rounded-lg hover:bg-blue-800 text-lg text-white">
            More
          </button>
        </footer>
      </div>
    );

  if (isModalOpen)
    return (
      <div className="w-full h-full shadow-md rounded-md border-2 border-blue-500 flex flex-col overflow-hidden pl-2 relative">
        <nav className="w-full h-10 flex justify-start items-center">
          <BackButtonComponent onClick={() => setIsModalOpen(false)} />
        </nav>
        <header className="h-[50%] lg:w-full lg:h-[70%]">
          <Image
            src={
              RouteImage && RouteImage !== ""
                ? RouteImage
                : "/assets/images/card/motorbike.png"
            }
            width={900}
            height={900}
            alt="Motorbike POV"
            className="h-full w-full object-contain"
          />
        </header>
        <main className="h-[90%] w-full overflow-y-auto">
          <section className="w-full h-[30%] flex justify-start items-center gap-2">
            <div className="w-[50px] h-[50px] rounded-full overflow-hidden pl-5">
              <Avatar>
                <AvatarImage
                  src={UserprofilePicture}
                  className="object-contain w-full h-full"
                />
                <AvatarFallback>User Profile</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-white">
              <p>{ProfileName}</p>
            </div>
          </section>
          <section className="w-[90%] h-full flex flex-col justify-start items-start gap-2 text-white m-auto">
            <div className="w-full h-[15%] flex justify-center items-center">
              {RouteName}
            </div>
            <h2 className="pl-2">{RouteDescription}</h2>

          </section>
        </main>
        <footer className="h-[40%]  lg:w-full lg:h-[40%] rounded-xl flex justify-center items-center lg:pb-2 ">
          <button className="h-[80%] w-[50%] lg:w-[40%] lg:h-full bg-blue-600 rounded-lg hover:bg-blue-800 text-lg text-white">
            Lets Ride
          </button>
        </footer>
      </div>
    );
};

export default UserRoutesCard;
