import React, {useEffect, useState} from 'react';


import { CampaignList } from '../components';
import { useStateContext } from '../context'

const Homepage = () => {
    const [Loading, setLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);

    const { address, contract, getCampaigns } = useStateContext();

    const fetchCampaigns = async () => {
        setLoading(true);
        const data = await getCampaigns();
        setCampaigns(data);
        setLoading(false);
    }

    useEffect(() => {
        if(contract) fetchCampaigns();
    }, [address, contract]);

    return (
        <CampaignList
            title="All Campaigns"
            Loading={Loading}
            campaigns={campaigns}
        />
    )
}

export default Homepage;