import React from 'react'

const NavbarHeader = () => {
  return (
    <div className="w-full ">
  <nav className="text-white mt-10 mb-15">
    <div className="flex flex-col gap-6 mb-10 lg:mx-10 mx-6">
      
      {/* Logo centered */}
      <div>
        <img
          src="/assets/images/Logo.png"
          alt="Lets Ride"
          className="h-40 w-80 mx-auto relative"
        />
      </div>

      {/* Nav links all in a row, wrapping if needed */}
      <div className="flex justify-around sm:gap-x-1 gap-x-10 gap-y-4 text-[18px] sm:text-3xl font-light">
        <a href="#" className="hover:text-blue-500">Routes</a>
        <a href="#" className="hover:text-blue-500">Your Likes</a>
        <a href="#" className="hover:text-blue-500">My Pictures</a>
        <a href="#" className="hover:text-blue-500">My Routes</a>
      </div>
    </div>

    <div className="border-b border-white mx-5 sm:mx-30"></div>
  </nav>
</div>


  )
}

export default NavbarHeader
