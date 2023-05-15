import React from 'react'

const Counter = ({ title, value }) => {
    return (
        <div className="flex flex-col items-center w-[150px]">
            <h4 className="font-epilogue font-bold text-[30px] text-white p-3 bg-gray-900 rounded-t-[10px] w-full text-center truncate">{value}</h4>
            <p className="font-epilogue font-normal text-[16px] text-[#ffff] bg-[#0d0d0d] px-3 py-2 w-full rouned-b-[10px] text-center">{title}</p>
        </div>
    )
}

export default Counter