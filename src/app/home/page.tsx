import DesktopNavBar from '@/components/navbars/DesktopNavBar'
import MobileNavBar from '@/components/navbars/MobileNavBar'
import NavbarHeader from '@/components/ui/NavbarHeader'
import React from 'react'

const profile = () => {
  
  return (
  <div className='sm:w-full md:w-20 lg:w-full w-full'>

  <div className='fixed top-0 left-0 h-screen w-20'>
    <DesktopNavBar isHomeOn={true} isLocationOn={false} isGalleryOn={false} isProfileOn={false}/>
  </div>
    <NavbarHeader isRoutes={true} isYourLikes={false} isMyPictures={false} isMyRoutes={false}/>

{/* Card Grid Section */}
<div className=" flex justify-center text-white text-5xl
">
  

</div>


<div className=''>
    <MobileNavBar isHomeOn={true} isLocationOn={false} isGalleryOn={false} isProfileOn={false}/>
</div>

</div>


  )
}

export default profile



// User Post Logic
{/* {users.map((user) => (
  <UserCards key={user.id} data={user} />
))} */}