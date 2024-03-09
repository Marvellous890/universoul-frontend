import React, { useState,useEffect, useContext } from "react";
import { IoIosSend, IoIosCloseCircleOutline } from "react-icons/io";
import { IoChatbubblesOutline } from "react-icons/io5";
import { buildApiEndpoint, getCookie } from "../utils";
import axios from "axios";
import { ConversationContext } from "../context/ConversationContext";


const Chat = ({ recipient, recipientId, data }) => {
  const { getSingleMessage, singleMessage,  postSingleMessage } =
    useContext(ConversationContext);

  const [text, setText] = useState("");
  const [showDisplayBox, setShowDisplayBox] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState([])
  

console.log(` foolish shop owner: ${recipientId}`);
console.log(data);
  const token = getCookie("token");


  // getting the message from context 
    useEffect(() => {
      getSingleMessage(recipientId);
    }, [getSingleMessage]);

  useEffect(() => {
    const token = getCookie("token");

    if (token) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(buildApiEndpoint(`/users/one`), {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
                     console.log(response.data.user)
          const userData = response.data;
          setUser(userData.user);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      fetchUserDetails();
    }
  }, []);
  
  console.log(user._id);
  
  const openModal = () => {
    setIsOpen(true);
    setShowDisplayBox(false); // Hide the display box when chat icon is clicked
  };

  const closeModal = () => {
    setIsOpen(false);
  };

 

  return (
    <div className='fixed bottom-12 right-4'>
      {/* Display box */}
      {showDisplayBox && (
        <div className='fixed bottom-24 right-12 bg-white text-black shadow-lg px-4 py-2 rounded-lg'>
          <p>Hey, let's talk! 👋</p>
        </div>
      )}

      {/* Chat icon */}
      <button
        className='bg-primaryDark text-white rounded-full p-3 shadow-lg'
        onClick={openModal}>
        <IoChatbubblesOutline className='h-10 w-10' />
      </button>

      {/* Chat modal */}
      {isOpen && (
        <div className='fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 flex items-center justify-end'>
          <div className='relative mt-16 bg-white shadow-md p-6 w-[450px] mx-3 rounded-lg lg:mr-4 md:mr-4'>
            {/* Header */}
            <div className='flex justify-between items-center mb-12'>
              <h2 className='text-lg font-semibold'>{`Chat with ${recipient}! 👋`}</h2>
              {/* Close button */}
              <button className='text-gray-500' onClick={closeModal}>
                <IoIosCloseCircleOutline className='h-6 w-6' />
              </button>
            </div>
            {/* Chat messages */}
            <div className='overflow-y-auto max-h-[400px] md:max-h-[300px] lg:max-h-[300px]'>
              {singleMessage.map((msg, i) => {
                const { message, tag, time } = msg;
                return (
                  <div key={i}>
                    <div
                      className={`flex ${
                        tag === "recipient" ? "justify-start" : "justify-end"
                      }  mb-4`}>
                      <div
                        className={`${
                          tag === "recipient"
                            ? " bg-gray-300   text-black rounded-br-lg rounded-tl-lg "
                            : "bg-primaryDark   text-white rounded-bl-lg rounded-tr-lg"
                        }  w-[70%] lg:w-full   p-2 max-w-md`}>
                        <p className='mb-2 text-[15px]'>{message}</p>
                        <p
                          className={`${
                            tag === "sender"
                              ? "text-xs text-right "
                              : "text-xs text-left"
                          } text-[10px]`}>
                          {new Date(time).toLocaleString("default", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Input field */}
            <div className='flex items-center mt-4'>
              <input
                type='text'
                className='border border-gray-300 p-2 w-full rounded-md mr-2'
                placeholder='Type your message...'
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button
                className='bg-primaryDark text-white px-4 py-2 rounded-md'
                onClick={()=> { postSingleMessage(recipientId, text, setText);}}>
                <IoIosSend className='h-6 w-6' />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
