import React, { useEffect, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
// import Confetti from "react-confetti";
import { Link} from "react-router-dom";
import axios from 'axios';

const AccountActivated = () => {
  const { width, height } = useWindowSize();
  const [activationStatus, setActivationStatus] = useState('verifying');
  // const [showConfetti, setShowConfetti] = useState(true);
 

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const usertoken = urlParams.get('usertoken');
    // const usertoken = ''

   const makeRequest = async () => {
  try {
   

    const response = await axios.get(`https://universoul.onrender.com/api/v1/users/activate/${usertoken}`);

    if (response.status >= 200 && response.status < 300) {
      // Show success notification
       setActivationStatus("success");
       setShowConfetti(true);
       console.log("activated");
    } else {
      setActivationStatus("error");
    }

  } catch (error) {
   
    console.log("Error activating your account", error);
  }
   }

   makeRequest()

  
  }, []);

  const textColor = activationStatus === 'success' || activationStatus === 'verifying' ? 'text-green-600' : 'text-red-600';

  return (
    <section
      aria-labelledby='summary-heading'
      className='rounded-lg my-[30px] lg:w-1/2 md:w-1/2 w-[80%] h-full mx-auto bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-12 lg:p-8 relative'>
      {/* {showConfetti && <Confetti width={width} height={height} />} Confetti animation */}
      <h2
        id='summary-heading'
        className='text-[1.4rem] lg:text-[2.4rem] font-medium text-center text-gray-900'>
        Account Activation
      </h2>

      <p className={`font-medium text-center my-12 ${textColor}`}>
        {activationStatus === 'verifying' && 'Verifying your account'}
        {activationStatus === 'success' && 'Your account has been successfully activated.'}
        {activationStatus === 'error' && 'Failed to activate account. Please try again or register.'}
      </p>

      <div className='mt-6'>
        
        {activationStatus === 'success' ? (
          <Link to='/login'>
            <button
              type='submit'
              className='w-full rounded-md border border-transparent bg-primaryDark py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-primaryColor focus:outline-none focus:ring-2 focus:ring-primaryDark focus:ring-offset-2 focus:ring-offset-gray-50'>
              Proceed To Login
            </button>
          </Link>
        ) : (
          <Link to='/signup'>
            <button
              type='submit'
              className='w-full rounded-md border border-transparent bg-primaryDark py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-primaryColor focus:outline-none focus:ring-2 focus:ring-primaryDark focus:ring-offset-2 focus:ring-offset-gray-50'>
             {activationStatus === 'verifying' ? 'Verifying...': 'Back To Register'}
            </button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default AccountActivated;

