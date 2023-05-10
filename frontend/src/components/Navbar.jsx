import {React, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import { navlinks } from '../consts';
import { siteLogo, searchIcon } from '../assets';
import { useStateContext } from '../context';


import {DetailedButton} from './';

const Tab = ({styles, title, handleClick}) =>
(
  <p className={`cursor-pointer flex justify-center font-semibold items-center hover:text-white text-[17px] ${styles}`} onClick={handleClick}>
    {title}
  </p>
)

const Navbar = () => {
  const navigate = useNavigate();
  const { connect, address } = useStateContext();

  return (
    <div className="bg-gray-900 w-screen py-4 items-center justify-center flex flex-row">
      <div className="flex flex-row items-center justify-center gap-4 text-gray-300 text-xl w-[70%] h-1/2">
        <Link to="/">
          <img src={siteLogo} className="min-w-[250px] w-[250px] drop-shadow-md mr-10 active:w-[255px]"></img>
        </Link>
        {navlinks.map((link)=>(
          <Tab key={link.name} title={link.name} {...link}
          handleClick={()=>{
            if(!link.disabled)
            {
              navigate(link.link)
            }
          }}/>
        ))
        }
        <div className="flex flex-row bg-gray-500 w-[300px] drop-shadow-lg rounded-md items-center justify-end outline-none outline-2 hover:outline-cyan-700 h-10 ml-10">
          <input className="flex w-[300px] h-full italic ml-4 bg-transparent outline-none placeholder:text-gray-900" type="text" placeholder="search">
          </input>
          <div className="w-[45px] h-[35px] rounded-md bg-[#78aac6] flex items-center justify-center cursor-pointer mr-0.5 shadow-inner shadow-[#9ac5df]">
            <img src={searchIcon} className="w-[20px] opacity-70 object-contain"></img>
          </div>
        </div>
        <DetailedButton title={address
        ? 'Create Campaign'
        : 'Add Address'} handleClick={()=>{
          if(address)
          {
            navigate('new-campaign');
          }
          else
          {
            connect();
          }
        }} styles={"justify-self-end"}></DetailedButton>
      </div>
    </div> 
  )
}

export default Navbar;