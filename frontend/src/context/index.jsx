import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

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

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createCampaign: publishCampaign,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);