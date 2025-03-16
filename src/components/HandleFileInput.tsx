'use client'
import React from 'react'

const HandleFileInput = () => {
  return (
    <div className="w-full h-full  flex justify-center items-center rounded-full">
        <input type="file" id='upload-File' className='hidden' />
        <label htmlFor="upload-File" className='w-full h-full flex justify-center items-center cursor-pointer'>
            <img className='w-5'  src="/assets/images/plus.png" alt="plus symbol" />
        </label>
    </div>
  )
}

export default HandleFileInput