import React, {useContext, useEffect} from "react";
import { FiChevronLeft, FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ConversationContext } from "../context/ConversationContext";

const MessageDetails = () => {
    const { getSingleMessage, singleMessage, clearMessage } = useContext(ConversationContext);
    const { id } = useParams();

    useEffect(() => {
      getSingleMessage(id)
      
    }, [getSingleMessage])
    
      
  return ( 
  <div className='lg:max-w-4xl xl:max-w-6xl w-full h-screen flex flex-col relative'>
       {/* Header */}
      <Link to={"/messages"} onclick={() => clearMessage()} >
        <div className='bg-gray-200 flex items-center p-4'>
          <FiChevronLeft className='text-gray-600 mr-2' />
          <span className='text-gray-600'>Back to Messages</span>
        </div>
      </Link>

      {/* Chat area */}
      <div className='flex-grow p-4 overflow-y-auto'>
        {
          singleMessage.map((msg, i) => {
            const {message, tag, time} = msg
            return (
              <>
                <div className='flex  justify-end mb-4' key={i}>
                  <div
                    className={`${
                      tag === "sender"
                        ? "bg-primaryDark  text-white rounded-br-lg rounded-tl-lg "
                        : "bg-gray-300   text-black rounded-bl-lg rounded-tr-lg"
                    }  w-[70%] lg:w-full   p-2 max-w-md`}>
                    <p className='mb-2'>{message}</p>
                    <p className={`${tag === 'sender'? 'text-xs text-right': 'text-xs text-left'}`}>
                      Jan 23, 2024 12:23:00 AM
                    </p>
                  </div>
                </div>
              </>
            );
          })
        }
        </div>
       
      <div className='bg-gray-200 flex items-center p-4 fixed bottom-0 lg:left-60 left-0 right-0 z-10'>
        <input
          type='text'
          placeholder='Type your message...'
          className='flex-grow border rounded-full py-2 px-4 mr-4 focus:outline-none'
        />
        <FiSend className='text-gray-600 cursor-pointer' />
      </div>

    </div>

  );
};


export default MessageDetails;
