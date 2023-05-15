import React from 'react';

import { timeLeft } from '../utility';

const Card = ({ owner, title, description, target, deadline, amountCollected, image, handleClick }) => {
    const remainingTime = timeLeft(deadline);

    return (
        <div className="sm:w-[290px] w-full bg-gray-900 cursor-pointer" onClick={handleClick}>
            <img src={image} alt="fund" className="w-full h-[158px] object-cover"/>

            <div className="flex flex-col p-4">

                <div className="block">
                    <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{title}</h3>
                    <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">{description}</p>
                </div>

                <div className="flex justify-between flex-wrap mt-[15px] gap-2">
                    <div className="flex flex-col">
                        <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{amountCollected}</h4>
                        <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">Raised of {target}</p>
                    </div>
                    <div className="flex flex-col">
                        <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{remainingTime}</h4>
                        <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">Days Left</p>
                    </div>
                </div>

                <div className="flex items-center mt-[20px] gap-[12px]">
                    <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">by <span className="text-[#b2b3bd]">{owner}</span></p>
                </div>
            </div>
        </div>
    )
}

export default Card