import CreatePostForm from '@/components/inputs/cardTestInput';
import DesktopNavBar from '@/components/navbars/DesktopNavBar';
import MobileNavBar from '@/components/navbars/MobileNavBar';
import NavbarHeader from '@/components/ui/NavbarHeader';
import UserCards from '@/components/ui/UserCards';
import UserLikedCards from '@/components/ui/UserLikedCards';
import { IUserCardType } from '@/components/utils/Interface';
import cardData from "@/data/cardData.json";
import React from 'react';

const typedUserCards: IUserCardType[] = cardData;

const page = () => {
  return (
    <div className=''>
      <div className='sm:w-full md:w-20 lg:w-full w-full'>
        <div className='fixed top-0 left-0 min-h-screen w-19'>
          <DesktopNavBar isHomeOn={false} isLocationOn={false} isGalleryOn={true} isProfileOn={false} />
        </div>

        <NavbarHeader isRoutes={false} isYourLikes={true} isMyPictures={false} isMyRoutes={false} />
        
      {/* Test Form  */}
        {/* <div className="p-8">
      <CreatePostForm />
    </div> */}

    <div className='mx-40'>
      <h1 className='text-[30px] pb-10'> Recent Posted Routes</h1>
        <div className="grid grid-cols-1 2xl:grid-cols-3 lg:grid-cols-2 gap-4 place-items-center mb-10 mx-40 sm:mx-20 max-w-full no-shrink">
          {typedUserCards.map((card, index) => (
            <UserCards key={index} card={card} />
          ))}
        </div>
    </div>

          <hr />
        
          <div className='mx-40'>
      <h1 className='text-[30px] pb-10'> Recent Posted Pictures</h1>
        <div className="grid grid-cols-1 2xl:grid-cols-3 lg:grid-cols-2 gap-4 place-items-center mb-10 mx-40 sm:mx-20 max-w-full no-shrink">
          {typedUserCards.map((card, index) => (
            <UserCards key={index} card={card} />
          ))}
        </div>
    </div>

          <div className='w-[450px] flex place-items-center' >
          <UserLikedCards/>

          </div>

        <div>
          <MobileNavBar isHomeOn={true} isLocationOn={false} isGalleryOn={false} isProfileOn={false} />
        </div>
      </div>






    </div>
  );
};

export default page;
