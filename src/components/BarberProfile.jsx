import React, { useEffect, useState } from 'react';
import Input from './Input';
import { ImSpinner8 } from "react-icons/im";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { buildApiEndpoint, getCookie, setCookie, isLoggedIn } from '../utils';
import axios from 'axios';

const BarberProfile = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhonenumber] = useState('');
  const [bio, setBio] = useState('');
  const [userName, setUserName] = useState('')
  const [instagram, setInstagram] = useState('')
  const [state, setState] = useState('')
  const [county, setCounty] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [linkedln, setLinkedln] = useState('')
  const [youTube, setYouTube] = useState('')
  const [loading, setLoading] = useState(false);
  

  const user = JSON.parse(getCookie('user'));
  const token = getCookie('token');
  


  useEffect(() => {
     if(user) {
      console.log(user);
    setFirstname(user.firstName || '');
    setLastname(user.lastName || '');
    setUserName(user.userName || '')
    setEmail(user.email || '');
    setAddress(user.address || '')
    setBio(user.bio || '');
    setCity(user.city || '')
    setCounty(user.county || '')
    setState(user.state || '')
    setPhonenumber(user.phoneNumber || '');
    setWebsite(user.website || '');
    setInstagram(user.instagram || '')
    setLinkedln(user.linkedln || '')
    setYouTube(user.instagram || '')
     }
  }, []);

  const userId = user._id;

  const updateProfile = async () => {
    setLoading(true);
    try {
      const updateData = {
         firstname,
        lastname,
        email,
       userName,
        phoneNumber,
        website,
        bio,
        linkedln,
       youTube,
        state,
        city,
        county,
        address,
       instagram
      };

      const response = await axios.put(
        buildApiEndpoint(`/users/update/${userId}`),
      updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
       
      if (response.status >= 200 && response.status < 300) {
        // Show success notification
      
        toast.success( "Profile Updated successfully!" );
        setLoading(false);
      } else {
        // Show error notification
        toast.error("Failed to submit data. Please try again.");
        setLoading(false);
      }
      
     console.log(response.data);
      setCookie('user', JSON.stringify(response.data));
      setLoading(false);
    } catch (error) {
        toast.error("An error occurred. Please try again.");
      console.log('Error updating profile', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-start w-full h-auto gap-5'>
      <ToastContainer />
      <h1 className='text-headingColor font-[500] text-left leading-5'>
        Profile Information
      </h1>
      <div className='flex w-[90%]'>
        <Input
          label='First name'
          onChange={(e) => setFirstname(e.target.value)}
          id='firstname'
          type='text'
          value={firstname}
        />
      </div>
      <div className='flex w-[90%]'>
        <Input
          label='Last name'
          onChange={(e) => setLastname(e.target.value)}
          id='lastname'
          type='text'
          value={lastname}
        />
      </div>
      <div className='flex w-[90%]'>
        <Input
          label='Username'
          onChange={(e) => setUserName(e.target.value)}
          id='username'
          type='text'
          value={userName}
        />
      </div>
      <div className='flex w-[90%]'>
        <Input
          label='Email'
          onChange={(e) => setEmail(e.target.value)}
          id='email'
          type='email'
          value={email}
        />
      </div>
      <div className='flex w-[90%]'>
        <Input
          label='Phone number'
          onChange={(e) => setPhonenumber(e.target.value)}
          id='phoneNumber'
          type='phone'
          value={phoneNumber}
        />
      </div>
      <div className='flex w-[90%]'>
        <Input
          label='State'
          onChange={(e) => setState(e.target.value)}
          id='state'
          type='text'
          value={state}
        />
      </div>
      <div className='flex w-[90%]'>
        <Input
          label='County'
          onChange={(e) => setCounty(e.target.value)}
          id='county'
          type='text'
          value={county}
        />
      </div>
      <div className='flex w-[90%]'>
        <Input
          label='City'
          onChange={(e) => setCity(e.target.value)}
          id='city'
          type='text'
          value={city}
        />
      </div>

      <div className='flex w-[90%]'>
        <textarea
          className='w-full px-4 py-3 border border-solid rounded-md border-slate-300 focus:outline outline-primaryColor '
          rows='6'
          placeholder='Your Bio'
          id='bio'
          onChange={(e) => setBio(e.target.value)}
          value={bio}></textarea>
      </div>
      <div className='flex w-[90%]'>
        <Input
          label='Website Url'
          onChange={(e) => setWebsite(e.target.value)}
          id='website'
          type='text'
          value={website}
        />
      </div>
      <div className='flex w-[90%]'>
        <Input
          label='Your Address'
          onChange={(e) => setAddress(e.target.value)}
          id='address'
          type='text'
          value={address}
        />
      </div>
      <div className='flex w-[90%]'>
        <Input
          label='YouTube Link'
          onChange={(e) => setYouTube(e.target.value)}
          id='youTube'
          type='text'
          value={youTube}
        />
      </div>
      <div className='flex w-[90%]'>
        <Input
          label='LinkedIn Link'
          onChange={(e) => setLinkedln(e.target.value)}
          id='linkedIn'
          type='text'
          value={linkedln}
        />
      </div>
      <div className='flex w-[90%]'>
        <Input
          label='Instagram Link'
          onChange={(e) => setInstagram(e.target.value)}
          id='instagram'
          type='text'
          value={instagram}
        />
      </div>

      <div className='flex w-[90%] '>
        <button
          className='w-full px-5 py-4 my-4 text-white bg-primaryDark rounded-lg '
          onClick={updateProfile}>
          {loading ? (
            <ImSpinner8 className='mx-auto animate-spin' />
          ) : (
            <span>Update Profile</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default BarberProfile;
