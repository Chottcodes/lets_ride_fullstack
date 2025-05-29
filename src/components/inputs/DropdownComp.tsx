"use client";
import React from "react";
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
const DropDownInputComp = (props: propTypes) => {
  const {
    optionOne,
    optionTwo,
    optionThree,
    optionFour,
    titleOne,
    titleTwo,
    titleThree,
    titleFour,
    onChange,
  } = props;
  return (
    <div className="w-full h-full flex items-center ">
      <select
        className="w-full bg-black text-white text-sm"
        onChange={onChange}
      >
        <option value="">Select</option>
        <option value={optionOne}>{titleOne}</option>
        <option value={optionTwo}>{titleTwo}</option>
        <option value={optionThree}>{titleThree}</option>
        {optionFour && titleFour && (
          <option value={optionFour}>{titleFour}</option>
        )}
      </select>
    </div>
  );
};
export default DropDownInputComp;