import DesktopNavBar from '@/components/navbars/DesktopNavBar'
import MobileNavBar from '@/components/navbars/MobileNavBar'
import NavbarHeader from '@/components/ui/NavbarHeader'
import UserCards from '@/components/ui/UserCards'
import React from 'react'

const page = () => {
  return (
    <div>
        <div className='sm:w-full md:w-20 lg:w-full w-full'>

<div className='fixed top-0 left-0 h-screen w-20'>
  <DesktopNavBar isHomeOn={true} isLocationOn={false} isGalleryOn={false} isProfileOn={false}/>
</div>
  <NavbarHeader isRoutes={false} isYourLikes={true} isMyPictures={false} isMyRoutes={false}/>

{/* Card Grid Section */}
<div className="grid grid-cols-1 2xl:grid-cols-3 lg:grid-cols-2 gap-4 place-items-center
mb-10 mx-40 sm:mx-20 max-w-full no-shrink
">
  <UserCards />
  <UserCards />
  <UserCards />
  <UserCards />
  <UserCards />
  <UserCards />
  <UserCards />
  <UserCards />
  <UserCards />
</div>


<div className=''>
  <MobileNavBar isHomeOn={true} isLocationOn={false} isGalleryOn={false} isProfileOn={false}/>
</div>

</div>


    </div>
  )
}

export default page
