import React, {useContext, useEffect, useState, useRef} from "react";
import { FiChevronLeft, FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ConversationContext } from "../context/ConversationContext";
import moment from "moment";


const MessageDetails = () => {
  const [text, setText] = useState('')
    const { getSingleMessage, singleMessage, clearMessage, postSingleMessage } = useContext(ConversationContext);
    const { id } = useParams();
    const msgRef = useRef(null)

    const scrollToBottom = () => {
      msgRef.current?.scrollIntoView({behavior: 'smooth'})
    }

    useEffect(() => {
      scrollToBottom()
    
     
    }, [singleMessage])
    

    useEffect(() => {   
      return () => {
        clearMessage()
      }
    }, [])
    

    useEffect(() => {
      getSingleMessage(id)
      
    }, [id])
    
      
  return ( 
  <div className='lg:max-w-4xl xl:max-w-6xl w-full h-screen flex flex-col relative'>
       {/* Header */}
      <Link to={"/messages"} >
        <div className='bg-gray-200 flex items-center p-4'>
          <FiChevronLeft className='text-gray-600 mr-2' />
          <span className='text-gray-600'>Back to Messages</span>
        </div>
      </Link>

      {/* Chat area */}
      <div className='flex-grow p-4 overflow-y-auto mb-12' ref={msgRef}>
        {
          singleMessage.map((msg, i) => {
            const {message, tag, time} = msg
            return (
              <div  key={i}>
                <div
                  className={`flex ${
                    tag === "sender" ? "justify-start" : "justify-end"
                  }  mb-4`}
                  >
                  <div
                    className={`${
                      tag === "sender"
                        ? " bg-gray-300   text-black rounded-br-lg rounded-tl-lg "
                        : "bg-primaryDark   text-white rounded-bl-lg rounded-tr-lg"
                    }  w-[70%] lg:w-full   p-2 max-w-md`}>
                    <p className='mb-2'>{message}</p>
                    <p
                      className={`${
                        tag === "sender"
                          ? "text-xs text-right"
                          : "text-xs text-left"
                      }`}>
                      {moment(createdAt).calendar()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        }
        </div>
       
      <div className='bg-gray-200 flex items-center p-4 fixed bottom-0 lg:left-60 left-0 right-0 z-10'>
        <input
          type='text'
          placeholder='Type your message...'
          value={text}
          className='flex-grow border rounded-full py-2 px-4 mr-4 focus:outline-none'
          onChange={ (e) => { setText(e.target.value)}}
        />
        <FiSend className='text-gray-600 cursor-pointer' onClick={()=>{ 
          postSingleMessage(id, text, setText)
        }} />
      </div>

    </div>

  );
};


export default MessageDetails;
