import React from 'react';
import { useNavigate } from 'react-router-dom';

import Card from './Card';
import { loader } from '../assets';

const CampaignList = ({ title, Loading, campaigns }) => {
    const navigate = useNavigate();

    const handleNavigate = (campaign) => {
        navigate(`/campaign-info/${campaign.title}`, { state: campaign })
    }

    return (
        <div className="mt-10">
            <h1 className="font-epilogue font-semibold text-[18px] text-white text-left mb-10">{title} ({campaigns.length})</h1>

            <div className="flex flex-wrap mt-[20px] gap-[26px]">
                {Loading && (
                    <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
                )}

                {!Loading && campaigns.length === 0 && (
                    <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                        No campaigns yet
                    </p>
                )}

                {!Loading && campaigns.length > 0 && campaigns.map((campaign) => <Card
                    key={campaign.id}
                    {...campaign}
                    handleClick={() => handleNavigate(campaign)}
                />)}
            </div>
        </div>
    )
}

export default CampaignList