import React from 'react'

interface UserCard
{
    userImage: string,
    userTitle: string,
    userLikes: number,
    userDate: string,
    userDescription: string,
    userName: string,
    userComments: string[],
}

const UserCards = () => {
  return (
    <div>
      <div className="max-w-sm overflow-hidden shadow-md w-100 h-full rounded-md border-2 border-black ">
        <img src="/assets/testImages/BikeTest1.jpg" alt="Motorbike POV" className="transition-transform duration-300 hover:scale-105 w-full h-56 object-cover  rounded-md border-2 border-blue-500 cursor-pointer" />
      
        <div className="flex justify-between items-center px-4 py-2 text-white text-sm ">
      
          <div className="flex items-center space-x-4 ">
            <div className="flex items-center space-x-1 cursor-pointer">
            <div>
                <img src="/assets/images/thumbs-up.png"  alt="comments" className="w-5 h-5"/>
            </div>
              <span>20</span>
            </div>
      
            <div className="flex items-center space-x-1 cursor-pointer">
              <div>
                <img src="/assets/images/coment.png"  alt="comments" className="w-5 h-5 mt-1"/>
              </div>
              <span className=''>2</span>
            </div>
          </div>
      
          <span className="text-[20px] text-gray-400">2/18/2025</span>
        </div>
      </div>
    </div>
  )
}

export default UserCards
