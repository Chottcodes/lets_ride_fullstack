import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
interface propTypes {
  Name: string;
  Username: string;
  Location: string;
  ProfilePicture: string;
}
const ProfileWithDescription = (props: propTypes) => {
  const { Name, Username, Location, ProfilePicture } = props;
  return (
    <section className="w-full h-full flex flex-col justify-center items-center gap-2 text-2xl text-white transform-all duration-300">
      <header className=" h-[100px] w-[100px] flex justify-center items-center rounded-full overflow-hidden">
        <Avatar className="w-full h-full">
          <AvatarImage src={ProfilePicture} />
          <AvatarFallback>Profile Picture</AvatarFallback>
        </Avatar>
      </header>
      <main className="w-full h-[30%] flex flex-col justify-evenly items-center gap-2">
        <div className="w-full flex justify-center items-center">{Name}</div>
        <div className="w-full h-full flex justify-center items-center">
          <figure className="w-[30%] h-full lg:w-[10%] text-lg flex justify-center items-center gap-2">
            <Image
              className="h-[20px] w-[20px]"
              src={"/assets/images/user.png"}
              width={100}
              height={100}
              alt="Icon"
            />
            <figcaption>{`@${Username}`}</figcaption>
          </figure>
          <figure className="w-[25%] h-full md:w-[15%] lg:w-[10%] text-lg flex justify-evenly items-center">
            <Image
              className="h-[20px] w-[20px]"
              src={"/assets/images/location.png"}
              width={100}
              height={100}
              alt="Icon"
            />
            <figcaption>{Location}</figcaption>
          </figure>
        </div>
      </main>
    </section>
  );
};

export default ProfileWithDescription;
