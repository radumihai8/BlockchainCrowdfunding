import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {ethers} from 'ethers';

import { DetailedButton } from '../components';
import { verifyImg } from '../utility';
import {FormRow} from '../components';

const NewCampaign = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title:'',
    username:'',
    about:'',
    goal:'',
    endDate:'',
    image:''
  });

  const handleFormChange = (fieldTitle, e) => {
    setForm({...form, [fieldTitle]: e.target.value})
  }

  const handleSubmit= (e)=>{
    e.preventDefault();

    console.log(form);
  }

  return (
    <div className="w-[100%] flex flex-row items-start justify-center text-[#70b1ee] mt-20">
      {Loading ? <p className="text-[24px] ">Loading...</p>
      : 
      <div className="bg-gradient-to-r from-[#454e5c] to-slate-600 w-[50%] outline outline-1 outline-black flex flex-col mb-8">
        <h1 className="m-2 text-[24px] justify-center flex">
          Add the details of your campaign
        </h1>
        <div className="h-[1px] m-2 bg-gray-900"></div>
        <form className="mt-6 flex flex-col gap-8 text-[19px] m-4 text-gray-300" onSubmit={handleSubmit}>
          <FormRow labelName="Title" inputType="text" placeholder="Name your campaign" value={form.title} handleChange={(e) => handleFormChange('title', e)}></FormRow>
          <FormRow labelName="Username" inputType="text" placeholder="Your name" value={form.username} handleChange={(e) => handleFormChange('username', e)}></FormRow>
          <FormRow labelName="About" isTextArea value={form.about} placeholder="Describe your campaign" handleChange={(e) => handleFormChange('about', e)}></FormRow>
          <FormRow labelName="Goal" inputType="number" placeholder="1 ETH" value={form.goal} handleChange={(e) => handleFormChange('goal', e)}></FormRow>
          <FormRow labelName="End Date" inputType="date" value={form.endDate} handleChange={(e) => handleFormChange('endDate', e)}></FormRow>
          <FormRow labelName="Image" inputType="url" placeholder="Put image url" value={form.image} handleChange={(e) => handleFormChange('image', e)}></FormRow>
          <div className="justify-end flex flex-row">
              <DetailedButton btnType="submit" title="Add campaign" styles={"text-white m-4"}></DetailedButton>
          </div>
        </form>
      </div>}
    </div>
  )
}

export default NewCampaign;