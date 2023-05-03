import React from 'react';
import {Route, Routes} from 'react-router-dom';

import {CamapignInfo, NewCampaign, Homepage, Profile} from './pages';
import {Navbar} from './components';

const App = () => {
  return (
    <div className="relative overflow-x-hidden h-screen bg-slate-700 flex flex-col items-center">
        <Navbar></Navbar>
      <div className="bg-gray-800 flex-1 w-[70%] justify-center flex flex-row">
         <Routes>
             <Route path="/" element={<Homepage></Homepage>}></Route>
             <Route path="/profile" element={<Profile></Profile>}></Route>
             <Route path="/new-campaign" element={<NewCampaign></NewCampaign>}></Route>
             <Route path="/campaign-info/:id" element={<CamapignInfo></CamapignInfo>}></Route>
         </Routes>
      </div>
    </div>
  )
}

export default App;