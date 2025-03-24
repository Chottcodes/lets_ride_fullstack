import Image from 'next/image'
import React from 'react'
interface propTypes{
    src:string,
    header:string,
    text:string
}
const ProfileDisplay = (props:propTypes) => {
    const {src,header,text}=props
  return (
    <section className='w-full h-full text-2xl'>
        <h2>{header}</h2>
        <figure className="w-full h-[65%] border-b-2 flex justify-start items-center gap-5 ">
            <Image className='h-[20px] w-[20px]' src={src} width={100} height={100} alt='icon' />
            <figcaption>{text}</figcaption>
        </figure>
    </section>
  )
}

export default ProfileDisplay