
import MapDisplay from '@/components/mapDisplay'
import MobileNavBar from '@/components/navbars/MobileNavBar'
import React from 'react'

const page = () => {
  return (
    <div className='h-screen relative'>
        <header className='bg-blue-700/2 backdrop-blur-2xl absolute top-0 w-full h-[10%] flex justify-center items-center z-10' >
            <button className='cursor-pointer text-white'>Community routes</button>
        </header>
        <main className='h-full w-full'>
            <section className='h-full w-full'>
                <MapDisplay/>
            </section>
        </main>
        <footer className='absolute bottom-0 w-full h-[10%] bg-black/70 backdrop-blur-2xl lg:hidden flex items-center'>
            <MobileNavBar isHomeOn={false} isGalleryOn={false} isLocationOn={true} isProfileOn={false} />
        </footer>
    </div>
  )
}

export default page