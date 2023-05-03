import React from 'react'

const FormRow = ({labelName, inputType, placeholder, isTextArea, value, handleChange}) => {
  return (
    <label className="flex w-full flex-col">
        {labelName && (
        <span className="opacity-80 font-normal">{labelName}</span>)}
        {isTextArea ? (
            <textarea required value={value} placeholder={placeholder} onChange={handleChange} rows={10} className="py-1 px-2 placeholder:text-gray-500 outline-none shadow-inner shadow-[#101010]
            bg-slate-800 text-gray-300 font-normal text-[16px] border-[1px] border-[#101010] rounded-sm"></textarea>
        ) : (
            <input required value={value} placeholder={placeholder} onChange={handleChange} type={inputType} step="0.1" min="0" className="py-1 px-2 placeholder:text-gray-500  outline-none shadow-inner shadow-[#101010]
             bg-slate-800 text-gray-300 font-normal text-[16px] border-[1px] border-[#101010] rounded-sm"></input>
        )}
    </label>
  )
}

export default FormRow