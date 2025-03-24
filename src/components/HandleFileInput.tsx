'use client'
import React from 'react'
interface propTypes {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const HandleFileInput = (props:propTypes) => {
  const {onChange} = props
  return (
    <div className="w-full h-full  flex justify-center items-center rounded-full">
        <input type="file" id='upload-File' className='hidden h-full w-full'  onChange={onChange}/>
        <label htmlFor="upload-File" className='w-full h-full flex justify-center items-center cursor-pointer'>
            <img className='w-5'  src="/assets/images/plus.png" alt="plus symbol" />
        </label>
    </div>
  )
}

export default HandleFileInput