'use client';
import React from 'react'
interface propTypes {
    optionOne: string;
    optionTwo: string;
    optionThree: string;
    optionFour: string | null;
    titleOne: string;
    titleTwo: string;
    titleThree: string;
    titleFour: string | null;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
const DropDownInputComponent = (props:propTypes) => {
    const {optionOne,optionTwo,optionThree,optionFour,titleOne,titleTwo,titleThree,titleFour, onChange} = props
  return (
    <div className='w-full h-full flex items-center '>
        <img src="/assets/images/motorbike.png" alt="Motorcycle icon" className='h-5 mt-3 pr-2' />
        <select className='w-[90%] bg-black text-white text-lg' onChange={onChange} >
            <option value=''>Select</option>
            <option  value={optionOne}>{titleOne}</option>
            <option value={optionTwo}>{titleTwo}</option>
            <option value={optionThree}>{titleThree}</option>
            {optionFour && titleFour && <option value={optionFour}>{titleFour}</option>}
        </select>
    </div>
  )
}

export default DropDownInputComponent