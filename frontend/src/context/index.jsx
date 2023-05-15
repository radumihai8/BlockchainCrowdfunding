import React, {createContext, useContext} from 'react';

import {useAddress, useContract, useContractWrite, useMetamask} from '@thirdweb-dev/react';
import {ethers} from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from "@thirdweb-dev/sdk";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0xadbd5F4fd340d7B8659ee3e76C76A945CFB7Ff62');
    console.log(contract)
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
    console.log(createCampaign)
    const address = useAddress();
    const connect = useMetamask();
    const publishCampaign = async (form) => {
        try {
            const data = await createCampaign({args:[
                address,
                form.title,
                form.description,
                form.target,
                new Date(form.deadline).getTime(),
                form.image
            ]})

        } catch (error) {
            console.log("err", error)
        }
    }

    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns');

        return campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: i
        }));
    }

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();

        return allCampaigns.filter((campaign) => campaign.owner === address);
    }

    const donate = async (pId, amount) => {
        return await contract.call('donateToCampaign', [pId], {value: ethers.utils.parseEther(amount)});
    }

    const getDonations = async (pId) => {
        const donations = await contract.call('getDonators', [pId]);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for(let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString())
            })
        }

        return parsedDonations;
    }



    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createCampaign: publishCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);