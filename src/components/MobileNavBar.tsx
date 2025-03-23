'use client'
import Image from 'next/image'
import React, { useState } from 'react'

const MobileNavBar = () => {
    const [activeButton, setActiveButton] = useState<string>(''); 
    const [isHomeOn,setIsHomeOn] = useState<boolean>(false)
    const [isLocationOn,setIsLocationOn] = useState<boolean>(false)
    const [isGalleryOn,setGalleryOn] = useState<boolean>(false)
    const [isProfileOn,setProfileOn] = useState<boolean>(false)
    
    const boolArr= [isHomeOn,isLocationOn,isGalleryOn,isProfileOn];

    
    const handleButtonClick = (button: string) => {
        setIsHomeOn(false);
        setIsLocationOn(false);
        setGalleryOn(false);
        setProfileOn(false);
        if (button === 'home') {
          setIsHomeOn(true);
        } else if (button === 'location') {
          setIsLocationOn(true);
        } else if (button === 'gallery') {
          setGalleryOn(true);
        } else if (button === 'profile') {
          setProfileOn(true);
        }
      };
    
  return (
    <nav className="w-full h-[10%] flex justify-evenly items-center">
            <button onClick={() => handleButtonClick('home')}>
                <Image 
                    className="h-[35px] w-[35px]" 
                    src={isHomeOn ? '/assets/images/home(2).png' : '/assets/images/home(1).png'} 
                    width={100} 
                    height={100} 
                    alt="Home Icon" 
                />
            </button>
            <button onClick={() => handleButtonClick('location')}>
                <Image 
                    className="h-[35px] w-[35px]" 
                    src={isLocationOn ? '/assets/images/location(1).png' : '/assets/images/location.png'} 
                    width={100} 
                    height={100} 
                    alt="Location Icon" 
                />
            </button>
            <button onClick={() => handleButtonClick('gallery')}>
                <Image 
                    className="h-[35px] w-[35px]" 
                    src={isGalleryOn ? '/assets/images/gallery(1).png' : '/assets/images/gallery.png'} 
                    width={100} 
                    height={100} 
                    alt="Gallery Icon" 
                />
            </button>
            <button 
                onClick={() => handleButtonClick('profile')} 
                className={`${isProfileOn ? 'border-2 border-blue-700' : 'border-none'} rounded-full overflow-hidden`}
            >
                <Image 
                    className="h-[35px] w-[35px]" 
                    src="/assets/images/motorcycle-tires.jpg" 
                    width={100} 
                    height={100} 
                    alt="Profile Icon" 
                />
            </button>
        </nav>
  )
}

export default MobileNavBar