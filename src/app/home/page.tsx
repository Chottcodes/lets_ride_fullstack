import UserRoutesCard from "@/components/ui/UserRoutesCard";
import Image from "next/image";
import React from "react";

const profile = () => {
  return (
    <div className="h-screen flex flex-col gap-5">
      <header className="w-full h-[20%] flex flex-col items-center text-white">
        <Image
          className="w-full h-[80%] object-contain"
          src="/assets/images/Logo.png"
          alt="Description of image"
          width={900}
          height={900}
        />
        <div className="w-full h-[10%] flex justify-start items-start lg:text-2xl pl-10">
          Recents
        </div>
      </header>
      <h1>Home Page</h1>
    </div>
  );
};

//   <div className='fixed top-0 left-0 h-screen w-20'>
//     <DesktopNavBar isHomeOn={true} isLocationOn={false} isGalleryOn={false} isProfileOn={false}/>
//   </div>
//     <NavbarHeader isRoutes={true} isYourLikes={false} isMyPictures={false} isMyRoutes={false}/>

// {/* Card Grid Section */}
// <div className=" flex justify-center text-white text-5xl
// ">
  

// </div>


// <div className=''>
//     <MobileNavBar isHomeOn={true} isLocationOn={false} isGalleryOn={false} isProfileOn={false}/>
// </div>

// </div>


//   )
// }

export default profile



// User Post Logic
{/* {users.map((user) => (
  <UserCards key={user.id} data={user} />
))} */}
