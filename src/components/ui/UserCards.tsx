import React, { useState } from 'react'
import { UserCard } from './Interface'

const UserCards = () => {
  // const []
  // const [userImage, setUserImage] = useState<string>
  // const [userDate, setUserDate] = useState<string>
  // const [userLikes, setUserLikes] = useState<string>
  // const [userComments, setUserComments] = useState<string>

  
  return (
    <div>
      <div className=" max-w-full h-full overflow-hidden shadow-md  rounded-md border-2 border-black ">
        {/* Image */}
        <img src="/assets/testImages/BikeTest1.jpg" alt="Motorbike POV" className="transition-transform duration-300 hover:scale-105  w-[465px] h-[250px] object-cover  rounded-md border-2 border-blue-500 cursor-pointer" />
        {/* In for Container */}
        <div className="flex justify-between items-center px-4 py-2 text-white text-sm ">
          
          <div className="flex items-center space-x-4 ">
            <div className="flex items-center space-x-1 cursor-pointer">
            <div>
                <img src="/assets/images/thumbs-up.png"  alt="comments" className="w-7 h-7"/>
            </div>
              <span className='text-xl ps-1'>20</span>
            </div>

            <div className="flex items-center space-x-1 cursor-pointer">
              <div>
                <img src="/assets/images/coment.png"  alt="comments" className="w-7 h-7 mt-1"/>
              </div>
              <span className='text-xl ps-1'>2</span>
            </div>
          </div>
          
          <span className="text-[20px] text-gray-400">2/18/2025</span>
        </div>
      </div>
    </div>
  )
}

export default UserCards
