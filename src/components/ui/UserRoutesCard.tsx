import React from 'react'

const UserRoutesCard = () => {
  return (
    <div>
      <div>
      <div className=" overflow-hidden shadow-md w-[430px] h-[373px] rounded-md border-2 border-black ">
        <img src="/assets/testImages/ExampleMap.webp" alt="Motorbike POV" className="transition-transform duration-300 hover:scale-105 w-full h-56 object-cover  rounded-md border-2 border-blue-500 cursor-pointer" />
      
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
    </div>
  )
}

export default UserRoutesCard
