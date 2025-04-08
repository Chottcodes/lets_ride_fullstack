import React from 'react'

interface propTypes{
    selectOnChange:(e: React.ChangeEvent<HTMLSelectElement>)=>void
    inputOnChange:(e: React.ChangeEvent<HTMLInputElement>)=>void
    isFieldEmpty:boolean;
    finalQuestion:string
    finalAnswer:string
    title:string

}

const SecurityQuestions = (props:propTypes) => {
    const {selectOnChange,finalQuestion,finalAnswer,inputOnChange,title,isFieldEmpty} = props


  return (
    <div className='w-full h-full flex flex-col'>
         <section className='w-full h-full flex flex-col gap-4 lg:gap-3'>
          <p className={`${isFieldEmpty ? "text-red-600":"text-white"} text-lg`}>{title}</p>
            <select
              className="w-full text-white bg-black"
              onChange={selectOnChange}
              value={finalQuestion}
            >
              <option value="" disabled hidden>
                Select question
              </option>
              <option value="Whats you favorite movie?">
                Whats you favorite movie?
              </option>
              <option value="What was the name of your first pet?">
                What was the name of your first pet?
              </option>
              <option value="Who was you childhood best friend?">
                Who was you childhood best friend?
              </option>
            </select>
            <input
              className="w-full lg:h-full lg:rounded-lg bg-white  text-black pl-2 rounded-xl"
              value={finalAnswer}
              onChange={inputOnChange}
            />
          </section>
    </div>
  )
}

export default SecurityQuestions