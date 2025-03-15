"use client";
export const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>,setState: React.Dispatch<React.SetStateAction<string>>) => {
  const inputValue = e.target.value;
  setState(inputValue);
};
//This is a reusable function that I created for collecting input values. My function take in 2 parameter. (e = event, setState = the name o the state you want to set. Ex 'inputValue' translates to setinputValue)