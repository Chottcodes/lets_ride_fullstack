import Image from 'next/image'
import React, { useState } from 'react'
interface propTypes {
  Name: string,
  Username: string,
  Location:string
}
const ProfileWithDescription = (props:propTypes) => {
  const {Name,Username,Location} = props
  return (
    <section className='w-full h-full flex flex-col justify-center items-center gap-2 text-2xl text-white transform-all duration-300'>
      <header className=" h-[125px] w-[125px] bg-green-800 flex justify-center items-center rounded-full overflow-hidden">
      <Image className='w-full h-full' src={"/assets/images/motorcycle-tires.jpg"} width={100} height={100} alt='motorcycle tires' />
      </header>
      <h1>{Name}</h1>
      <figure className="w-[30%] h-[10%] text-lg flex justify-center items-center gap-2">
        <Image className='h-[20px] w-[20px]' src={"/assets/images/user.png"} width={100} height={100} alt='Icon'/>
        <figcaption>{`@${Username}`}</figcaption>
      </figure>
      <figure className="w-[30%] h-[10%] md:w-[15%] lg:w-[5%] text-lg flex justify-evenly items-center gap-2">
      <Image className='h-[20px] w-[20px]' src={"/assets/images/location.png"} width={100} height={100} alt='Icon'/>
      <figcaption>{Location}</figcaption>
      </figure>
    </section>
  )
}

export default ProfileWithDescription