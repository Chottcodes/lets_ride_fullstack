"use client";
import React from "react";
import Image from "next/image";
import PrimaryButton from '../buttons/PrimaryButton'

// interface UserCard {
//   userImage: string;
//   userTitle: string;
//   userLikes: number;
//   userDate: string;
//   userDescription: string;
//   userName: string;
//   userComments: string[];
// }

const UserRoutesCard = () => {
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
      <div className=" overflow-hidden shadow-md w-full rounded-md border-2 border-black ">
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
        <div className="flex justify-center w-full py-4 ">
          <PrimaryButton buttonText={'Lets Ride'} isBackgroundDark={false} />
        </div>

          <div className="flex items-center gap-1 cursor-pointer">
            <button className="cursor-pointer h-[15px] w-[15px] flex justify-center items-center">
              <Image
                src="/assets/images/card/coment.png"
                width={900}
                height={900}
                alt="comments"
                className="w-full h-full"
              />
            </button>
            <p className="lg:text-[15px]">2</p>
          </div>
        </section>
        <section className="w-[50%] h-full  flex justify-center items-center lg:text-[15px]">
          Descriptions
        </section>
        <section className="w-[25%] h-full flex justify-center items-center ">
          <p className="lg:text-[15px] text-white">2/18/2025</p>
        </section>
      </main>
      <div className="h-[90%]  lg:w-full lg:h-[40%] rounded-xl  flex justify-center items-center lg:pb-2">
          <button className="h-[80%] w-[50%] lg:w-[40%] lg:h-full bg-blue-600 rounded-lg hover:bg-blue-800 text-lg">Lets Ride</button>
      </div>
    </div>
  );
};

export default UserRoutesCard;
