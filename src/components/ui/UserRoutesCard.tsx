import React from 'react'
import PrimaryButton from '../buttons/PrimaryButton'

const UserRoutesCard = () => {
  return (
      <div>
      <div className=" overflow-hidden shadow-md w-full rounded-md border-2 border-black ">
        <img src="/assets/testImages/ExampleMap.webp" alt="Motorbike POV" className="transition-transform duration-300 hover:scale-105 w-[465px] h-[386px] object-cover  rounded-md border-2 border-blue-500 cursor-pointer" />
      
        <div className="flex justify-between items-center px-4 py-2 text-white text-sm ">
      
          <div className="flex items-center space-x-4 ">
            <div className="flex items-center space-x-1 cursor-pointer">
            <div>
                <img src="/assets/images/card/thumbs-up.png"  alt="comments" className="w-7 h-7"/>
            </div>
              <span className='text-2xl'>20</span>
            </div>
      
            <div className="flex items-center space-x-1 cursor-pointer">
              <div>
                <img src="/assets/images/card/coment.png"  alt="comments" className="w-7 h-7 mt-1"/>
              </div>
              <span className='text-2xl'>2</span>
            </div>
          </div>
      
          <span className="text-[20px] text-gray-400">2/18/2025</span>
        </div>
        <div className="flex justify-center w-full py-4">
          <PrimaryButton buttonText={'Lets Ride'} isBackgroundDark={false} />
        </div>

      </div>
      
    </div>
  
  )
}

export default UserRoutesCard
