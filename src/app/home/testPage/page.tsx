import DesktopNavBar from '@/components/navbars/DesktopNavBar'
import MobileNavBar from '@/components/navbars/MobileNavBar'
import UserCards from '@/components/ui/UserCards'
import UserLikedCards from '@/components/ui/UserLikedCards'
import UserRoutesCard from '@/components/ui/UserRoutesCard'
import React from 'react'

const profile = () => {
  
  return (
    <div>
<nav className="text-white mb-15 mt-10">
      <div className="text-2xl flex justify-around items-end mb-10">

    <div className="flex space-x-50 font-light">
      <a href="#" className="hover:text-blue-500">My profile</a>
      <a href="#" className="hover:text-blue-500">My routes</a>
    </div>

    <div className=" ">
        <img src="/assets/images/Logo.png" alt="Lets Ride" className="h-40 w-80" />       
    </div>

    <div className="flex space-x-50  font-light">
      <a href="#" className="hover:text-blue-500">My pictures</a>
      <a href="#" className="hover:text-blue-500">Likes</a>
    </div>
  </div>
  <div className='border-b-2 border-gray-500 mx-15'> </div>
</nav>
<div className='absolute w-20 ms-2'>
<DesktopNavBar isHomeOn={false} isLocationOn={false} isGalleryOn={false} isProfileOn={false}/>
</div>

{/* Card Grid Section */}
<div className='grid grid-cols-3 col- place-items-center ps-[8rem] pe-[5rem]'>
<UserCards/>
<UserCards/>
<UserCards/>
<UserLikedCards/>
<UserLikedCards/>
<UserLikedCards/>
<UserRoutesCard/>
<UserRoutesCard/>
<UserRoutesCard/>



</div>


</div>


  )
}

export default profile



// User Post Logic
{/* {users.map((user) => (
  <UserCards key={user.id} data={user} />
))} */}