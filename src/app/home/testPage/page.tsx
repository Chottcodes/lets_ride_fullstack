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
    <div className='border border-white fixed top-0 left-0 h-screen w-2'>

    </div>
  <div className='fixed top-0 left-0 h-screen w-20'>
    <DesktopNavBar isHomeOn={false} isLocationOn={false} isGalleryOn={false} isProfileOn={false}/>
  </div>
    
    <NavbarHeader/>

{/* Card Grid Section */}
<div className="grid grid-cols-1 2xl:grid-cols-3 lg:grid-cols-2 gap-4 place-items-center
 mb-10 mx-20 
">
  <div className="w-[465px] shrink-0">
    <UserCards />
  </div>
  <div className="w-[465px] shrink-0">
    <UserCards />
  </div>
  <div className="w-[465px] shrink-0">
    <UserCards />
  </div>
<UserLikedCards/>
<UserLikedCards/>
<UserLikedCards/>
<UserRoutesCard/>
<UserRoutesCard/>
<UserRoutesCard/>



</div>
<div className=''>
    <MobileNavBar isHomeOn={false} isLocationOn={false} isGalleryOn={false} isProfileOn={false}/>

</div>

</div>


  )
}

export default profile



// User Post Logic
{/* {users.map((user) => (
  <UserCards key={user.id} data={user} />
))} */}