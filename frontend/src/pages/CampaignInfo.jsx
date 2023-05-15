import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { Counter, DetailedButton } from '../components';
import { progressPercentage, timeLeft } from '../utility';
import {loader} from "../assets";

const CampaignInfo = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { donate, getDonations, contract, address } = useStateContext();

    const [Loading, setLoading] = useState(false);
    const [amount, setAmount] = useState('');
    const [donors, setDonors] = useState([]);

    const remainingDays = timeLeft(state.deadline);

    const fetchDonors = async () => {
        const data = await getDonations(state.pId);

        setDonors(data);
    }

    useEffect(() => {
        if(contract) fetchDonors();
    }, [contract, address])

    const handleDonate = async () => {
        setLoading(true);
        console.log(state.pid)

        await donate(state.pId, amount);

        navigate('/')
        setLoading(false);
    }

    return (
        <div>
            {Loading && (
                <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
            )}

            <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
                <div className="flex-1 flex-col">
                    <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl"/>
                    <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
                        <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${progressPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%'}}>
                        </div>
                    </div>
                </div>

                <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
                    <Counter title="Days Left" value={remainingDays} />
                    <Counter title={`Raised of ${state.target}`} value={state.amountCollected} />
                    <Counter title="Total Backers" value={donors.length} />
                </div>
            </div>

            <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
                <div className="flex-[2] flex flex-col gap-[40px]">
                    <div>
                        <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Creator</h4>

                        <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                            <div>
                                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.owner}</h4>
                                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">10 Campaigns</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Story</h4>

                        <div className="mt-[20px]">
                            <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.description}</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Donors</h4>

                        <div className="mt-[20px] flex flex-col gap-4">
                            {donors.length > 0 ? donors.map((item, index) => (
                                <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
                                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">{index + 1}. {item.donator}</p>
                                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">{item.donation}</p>
                                </div>
                            )) : (
                                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">No donations! Be the first one!</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Fund</h4>

                    <div className="mt-[20px] flex flex-col p-4 bg-gray-900">
                        <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
                            Fund this campaign
                        </p>
                        <div className="mt-[30px]">
                            <input
                                type="number"
                                placeholder="ETH 0.1"
                                step="0.01"
                                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />

                            <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Do you believe in this project?</h4>
                                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">Support this project for no reward, just if you like it!</p>
                            </div>

                            <DetailedButton
                                btnType="button"
                                title="Fund Campaign"
                                styles="w-full bg-[#8c6dfd]"
                                handleClick={handleDonate}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CampaignInfo