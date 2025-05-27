"use client";
import React from "react";

interface propTypes {
  options: { label: string; value: string; }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
}

const DropDownInputComponent = (props: propTypes) => {
  const { options, onChange, placeholder } = props;
  
  return (
    <div className="w-full h-full flex items-center">
      <select
        className="w-full bg-black text-white text-sm"
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select> 
    </div>
  );
};

export default DropDownInputComponent;
