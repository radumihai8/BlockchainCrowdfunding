import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';

import {ThirdwebProvider} from '@thirdweb-dev/react';
import {ChainId} from '@thirdweb-dev/react';

import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

//ThirdWebProdiver - wrapper pt tot proiectul, Goerli = 5
root.render(
    <ThirdwebProvider desiredChainId = {ChainId.Goerli}>
        <Router>
            <App/>
        </Router>
    </ThirdwebProvider>
)