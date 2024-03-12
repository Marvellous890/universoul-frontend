import React from "react";
import { useState, useEffect } from "react";
import baberImg from "../assets/img/about-1.jpg";
import star from "../assets/img/Star.png";
import BarbersAbout from './BarbersAbout'
import Feedback from './Feedback'
import { AiOutlineInstagram, AiOutlineHome } from "react-icons/ai";
import { RiLinkedinFill, RiYoutubeFill } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";
import {SidePanel, BookingModal, Chat} from '../components'
import { useParams } from 'react-router-dom';
import { fetchDataOne } from "../api/booking";
import { ToastContainer } from "react-toastify";
import { scrollToTop } from '../ScollToTop.js';
import { Link } from "react-router-dom";



 const BarbersDetails = () => {

 const [tab, setTab] = useState("about");
  const [showModal, setModalShow] = useState(false);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const params = useParams();
  const shopId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataOne(shopId); // Fetch the data
        setData(response.data); // Store the fetched data in state
        
        // console.log("this is data", response.data); // Log the fetched data
        setIsLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false on error
      }
    };

    fetchData();
    console.log(data);
    scrollToTop();
  }, [shopId]);
  if (isLoading) {
    return <p>Loading...</p>; // Display a loading message until data is fetched
  }
     
  return (
    <>
      <section className='px-5 mx-auto container'>
        <div className='grid md:grid-cols-5 gap-[50px] '>
          <div className='md:col-span-3'>
            <div className='flex flex-col md:flex-row lg:flex-row items-center  gap-5'>
              <figure className='max-w-[200px] max-h-[200px] rounded-lg '>
                {/*<img src={} alt=''  /> */}
                <img
                  src={data.images || baberImg}
                  alt={data.shop_name}
                  className='w-full rounded-lg'
                />
              </figure>
              <div>
                <h3 className='text-headingColor text-[22px] leading-9 mt-3 font-bold '>
                  {data && data.owner ? data.shop_name : "Loading..."}
                </h3>

               
                {/* Location */}
                <div className='flex gap-2 items-center my-2 '>
                  <IoLocationOutline className='w-6 h-6 mt-2' />
                  <p className='text-para text-[14px] leading-6 md:text-[15px] lg:max-w-[300px] '>
                    {data && data.owner
                      ? `${data.owner.state}, ${data.owner.county}`
                      : "Unavailable"}
                  </p>
                </div>
                {/* Address */}
                <div className='flex gap-2 items-center my-2 '>
                  <AiOutlineHome className='w-6 h-6 mt-2' />
                  <p className='text-para text-[14px] leading-6 md:text-[15px] lg:max-w-[300px] '>
                    {data && data.owner
                      ? `${data.owner.address}`
                      : "Unavailable"}
                  </p>
                </div>
                {/* Website */}
                <div className='flex gap-2 items-center my-2 '>
                  <CiGlobe className='w-6 h-6 mt-2' />
                  <Link>
                    <p className='text-para text-[14px] leading-6 md:text-[15px] lg:max-w-[300px] '>
                      {data && data.owner ? `${data.owner.website}` : "Not specified"}
                    </p>
                  </Link>
                </div>

                {/* social links  */}
                <div className='flex items-center gap-3 mt-4'>
                  <a
                    href='https://www.youtube.com/@universoulbarbers'
                    target='_blank'
                    className='w-9 h-9 border border-solid rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none '>
                    <RiYoutubeFill className='group-hover:text-white w-4 h-5' />
                  </a>
                  <a
                    href='https://www.linkedin.com/company/universoulbarbers'
                    target='_blank'
                    className='w-9 h-9 border border-solid rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none '>
                    <RiLinkedinFill className='group-hover:text-white w-4 h-5' />
                  </a>
                  <a
                    href='https://www.instagram.com/universoulbarbers'
                    target='_blank'
                    className='w-9 h-9 border border-solid rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none '>
                    <AiOutlineInstagram className='group-hover:text-white w-4 h-5' />
                  </a>
                </div>
              </div>
            </div>
            <div className='mt-[50px] border-b border-solid border-[#0066ff34]  '>
              <button
                onClick={() => {
                  setTab("about");
                }}
                className={` ${
                  tab === "about" && "border-b border-solid border-primaryColor"
                }  py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>
                About
              </button>
            </div>
            <div className='mt-[50px] '>
              {tab === "about" && <BarbersAbout />}
            </div>
          </div>
          {/* needs to be worked on by the devs devs */}
          <div className='md:col-span-2'>
            <SidePanel setModalShow={setModalShow} data={data} />
          </div>
        </div>
        <Chat
          recipient={data.shop_name}
          recipientId={data.owner._id}
          data={data}
        />
      </section>
      {showModal && (
        <BookingModal
          open={showModal}
          data={data}
          onClose={() => setModalShow(false)}
        />
      )}
      <ToastContainer position='top-center' />
    </>
  );
};

export default BarbersDetails;
