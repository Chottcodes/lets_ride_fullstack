"use client"

import React, { useState } from 'react'
import PrimaryButton from '../buttons/PrimaryButton'
import Image from 'next/image'
import { IUserCardType } from '../utils/Interface'

const UserRoutesCard = ({ card }: { card: IUserCardType }) => {
  // Model Card
    const [isModel, setIsModel] = useState(false);
    const [isFullImage, setIsFullImage] = useState(false);
  
    // User Card Blob
    // const [userProfile, setUserProfile] = useState("");
    // const [userImage, setUserImage] = useState("");
    // const [userDate, setUserDate] = useState("");
    // const [userTitle, setUserTitle] = useState("");
    // const [userDescription, setUserDescription] = useState("");
  
    // User Interact section
    // const [userName, setUserName] = useState("");
    const [isUserLiked, setIsUserLiked] = useState(false);
    // const [userComments, setUserComments] = useState(false);
    
  return (
      <div>
      <main className='place-items-center'>
      <section className=" overflow-hidden shadow-md w-full rounded-md border-2 border-black ">
        <Image src="/assets/testImages/ExampleMap.webp" width={1000} height={1000} alt="Motorbike POV" className="transition-transform duration-300 hover:scale-105 w-[465px] h-[386px] object-cover  rounded-md border-2 border-blue-500 cursor-pointer" />
      
        <div className="flex justify-between items-center px-4 py-2 text-white text-sm ">
      
          <div className="flex items-center space-x-4 ">
            <div className="flex items-center space-x-1 cursor-pointer">
            <div>
                <Image src="/assets/images/card/thumbs-up.png" width={1000} height={1000}  alt="comments" className="w-5 h-5 mt-2"/>
            </div>
              <span className='text-[20px] mt-2'>20</span>
            </div>
      
            <div className="flex items-center space-x-1 cursor-pointer">
              <div>
                <Image src="/assets/images/card/coment.png" width={1000} height={1000} alt="comments" className="w-5 h-5 mt-3 "/>
              </div>
              <span className='text-[20px] mt-2'>2</span>
            </div>
          </div>
      
          <span className="text-[20px] text-gray-400">2/18/2025</span>
        
        </div>
      </section>
        <div className=" w-[240px] h-[90px] pt-2 pb-10">
          <PrimaryButton buttonText={'Lets Ride'} isBackgroundDark={false} />
        </div>

    </main>
    </div>
  
  )
}

export default UserRoutesCard
