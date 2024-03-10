import React from 'react'
import Confetti from 'react-confetti'

const EmailActivation = () => {
  return (
    <section
      aria-labelledby='summary-heading'
      className='rounded-lg my-[30px] lg:w-1/2 md:w-1/2 w-[80%] h-full mx-auto bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-12 lg:p-8 relative'>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={500}
        recycle={false}
      />
      <h2
        id='summary-heading'
        className='text-[1.4rem] lg:text-[2.4rem] font-medium text-center text-gray-900'>
        Registration was successful!
      </h2>

      <p className={`font-medium text-center my-12 text-black`}>

        Activation link has been sent to your email. Activate account to get started
      </p>


    </section>
  );
}

export default EmailActivation