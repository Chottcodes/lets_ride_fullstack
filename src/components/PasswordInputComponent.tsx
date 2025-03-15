import React from 'react'

const PasswordInputComponent = () => {
  return (
    <div className="relative w-full border-b-2 pb-3 flex items-center">
            <img
              src="/assets/images/padlock (1).png"
              alt="lock icon"
              className="absolute h-[20px]"
            />
            <input
              type="text"
              placeholder="Enter Password"
              className="w-full pl-6 focus:outline-none"
            />
            <img
              src="/assets/images/hide.png"
              alt="eyeglass icon"
              className="h-[20px] absolute left-[90%]"
            />
          </div>
  )
}

export default PasswordInputComponent