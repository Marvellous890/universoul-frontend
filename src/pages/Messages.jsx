import React, { useContext, useEffect } from "react";
import moment from 'moment'

import { ConversationContext } from "../context/ConversationContext";


import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import img from "../assets/img/Messages.gif";




const  MessageComponent = () => {
  const { userChats, onlineUsers} = useContext(ConversationContext);

  return (
    <div className='mx-auto max-w-lg py-8 px-6 lg:max-w-4xl xl:max-w-6xl w-full'>
      <h2 className='text-lg font-semibold text-gray-900'>Recent Messages</h2>
      <div className='lg:grid lg:grid-cols-12 lg:gap-x-16'>
        {userChats.length === 0 ? (
          <div className='flex flex-col items-center justify-start h-screen p-8'>
            <img
              src={img}
              alt='Placeholder'
              className='  w-[100%] md:w-[40%] lg:w-[35%] object-cover'
            />
            <p className='mt-4 text-center text-gray-700'>
              No Conversation yet! Message a barber to get started...
            </p>
          </div>
        ) : (
          <ol className='mt-4 divide-y divide-gray-100 text-sm leading-6 col-span-10 lg:col-span-10 xl:col-span-8'>
            {userChats.map(({ createdAt, sender, message }, index) => (
              <Link key={index} to={`/message/${sender._id}`}>
                <li className='relative flex w-full border-b space-x-6 py-6 xl:static cursor-pointer'>
                  <div className='flex-none relative w-16 h-16'>
                    {sender.pictureUrl ? (
                      <img
                        src={sender.pictureUrl}
                        alt=''
                        className='h-full w-full object-cover rounded-full'
                      />
                    ) : (
                      <div className='h-full w-full flex-none rounded-full bg-slate-500 items-center justify-center flex'>
                        <FaUser className='text-white w-6 h-6' />
                      </div>
                    )}
                    {
                      onlineUsers?.some(user => user?.userId === sender?._id) ? (<div className='absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-white'></div>) : (
                        <></>
                      )
                    }
                  </div>
                  <div className='flex-auto    w-full'>
                    <div className='grid grid-rows-2'>
                      <div className='flex w-full items-start justify-between'>
                        <h3 className='pr-2 font-semibold text-gray-900 xl:pr-0'>
                          {sender.userName}
                        </h3>
                        <span className='text-xs text-gray-500'>
                          {moment(createdAt).calendar()}
                        </span>
                      </div>
                      <div className='flex w-full items-center justify-between'>
                        <p className='text-sm'>
                          {message.split(" ").slice(0, 6).join(" ")}...
                        </p>
                        <div className='flex-none flex items-center justify-center bg-primaryDark text-white rounded-full h-8 w-8'>
                          <span className='text-xs'>5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

export default React.memo(MessageComponent)



export const NotificationList = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, sender: "John Doe", message: "Hello! How are you?", read: false },
    { id: 2, sender: "Jane Smith", message: "Meeting at 3 PM", read: true },
    {
      id: 3,
      sender: "Sam Brown",
      message: "Don't forget to submit the report.",
      read: false,
    },
  ]);

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
  };

  return (
    <div className='p-8'>
      <button
        className='bg-blue-500 text-white px-4 py-2 rounded float-right mb-4'
        onClick={markAllAsRead}>
        Mark All as Read
      </button>

      <ul className='list-none'>
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className={notification.read ? "mb-4" : "mb-4 font-bold"}>
            <span className='text-lg'>{notification.sender}: </span>
            <span>
              {notification.message.length > 30
                ? notification.message.slice(0, 30) + "..."
                : notification.message}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
