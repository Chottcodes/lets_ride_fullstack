
import MobileNavBar from '@/components/navbars/MobileNavBar'

import UserRoutesCard from '@/components/ui/UserRoutesCard'
import React from 'react'

const page = () => {
  return (
    <div>
        <div className='sm:w-full md:w-20 lg:w-full w-full'>


{/* Card Grid Section */}
<div className="grid grid-cols-1 2xl:grid-cols-3 lg:grid-cols-2 gap-4 place-items-center
mb-10 mx-40 sm:mx-20 max-w-full no-shrink
">
  <UserRoutesCard />
  <UserRoutesCard />
  <UserRoutesCard />
  <UserRoutesCard />
  <UserRoutesCard />
  <UserRoutesCard />
  <UserRoutesCard />
  <UserRoutesCard />
  <UserRoutesCard />
</div>


<div className=''>
  <MobileNavBar />
</div>

</div>


    </div>
  )
}

export default page
