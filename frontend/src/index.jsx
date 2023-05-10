import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';

import {ThirdwebProvider} from '@thirdweb-dev/react';
import {ChainId} from '@thirdweb-dev/react';

import { StateContextProvider } from './context';
import App from './App';
import './index.css';
import { Sepolia } from "@thirdweb-dev/chains";

const root = ReactDOM.createRoot(document.getElementById('root'));

//ThirdWebProdiver - wrapper pt tot proiectul, Goerli = 5
root.render(
    <ThirdwebProvider activeChain={ Sepolia }>
        <Router>
            <StateContextProvider>
                <App />
            </StateContextProvider>
        </Router>
    </ThirdwebProvider>
)