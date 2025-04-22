import DesktopNavBar from '@/components/navbars/DesktopNavBar'
import MobileNavBar from '@/components/navbars/MobileNavBar'
import NavbarHeader from '@/components/ui/NavbarHeader'
import UserCards from '@/components/ui/UserCards'
import UserLikedCards from '@/components/ui/UserLikedCards'
import UserRoutesCard from '@/components/ui/UserRoutesCard'
import React from 'react'

const profile = () => {
  
  return (
  <div className='sm:w-full md:w-20 lg:w-full w-full'>

  <div className='fixed top-0 left-0 h-screen w-20'>
    <DesktopNavBar isHomeOn={false} isLocationOn={false} isGalleryOn={true} isProfileOn={false}/>
  </div>
    <NavbarHeader isRoutes={true} isYourLikes={false} isMyPictures={false} isMyRoutes={false}/>

{/* Card Grid Section */}
<div className=" text-white text-3xl mx-40
">
<h1>Recent Posted Routes</h1>
    <div className='grid grid-cols-1 2xl:grid-cols-3 lg:grid-cols-2 gap-20 place-items-center
mb-10 mx-40 sm:mx-20 max-w-full no-shrink mt-15'>
        <UserRoutesCard/>
        <UserRoutesCard/>
        <UserRoutesCard/>

    </div>

    <h1>Recent Posted Pictures</h1>
    <div className='grid grid-cols-1 2xl:grid-cols-3 lg:grid-cols-2 gap-10 place-items-center
mb-10 mx-40 sm:mx-20 max-w-full no-shrink mt-15'>
        <UserCards/>
        <UserCards/>
        <UserCards/>
    </div>

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