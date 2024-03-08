import { useContext, useEffect } from "react";

import { ConversationContext } from "../context/ConversationContext";


import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";


// const messages = [
//   {
//     id: 1,
//     message: "Hey dude! I love your service alot.  You are the best!",
//     name: "Leslie Alexander",
//     imageUrl:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
//   {
//     id: 2,
//     message: "Hey dude! I love your service alot.  You are the best!",
//     name: "Ryan Davis",
//     imageUrl: "",
//   },
//   {
//     id: 3,
//     message: "Hey dude! I love your service alot.  You are the best!",
//     name: "Emma Williams",
//     imageUrl: "https://randomuser.me/api/portraits/women/9.jpg",
//   },
//   {
//     id: 4,
//     message: "Hey dude! I love your service alot.  You are the best!",
//     name: "David Johnson",
//     imageUrl: "https://randomuser.me/api/portraits/men/11.jpg",
//   },
//   {
//     id: 5,
//     name: "Olivia Brown",
//     message: "Hey dude! I love your service alot.  You are the best!",
//     imageUrl: "https://randomuser.me/api/portraits/women/10.jpg",
//   },
//   {
//     id: 6,
//     name: "Michael Taylor",
//     message: "Hey dude! I love your service alot.  You are the best!",
//     imageUrl: "https://randomuser.me/api/portraits/men/12.jpg",
//   },
// ];


// export default function MessageComponent() {
//   const { userChats } = useContext(ConversationContext);

//   return (
//     <div className="mx-auto max-w-lg py-8 px-6 lg:max-w-4xl xl:max-w-6xl">
//       <h2 className="text-lg font-semibold text-gray-900">Recent Messages</h2>
//       <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
//         {userChats.length === 0 ? (
//           <div className="flex items-center justify-center h-64">
//             <img
//               src="/no-conversation.svg"
//               alt="No Conversation"
//               className="h-48 w-auto"
//             />
//             <p className="mt-4 text-gray-600 text-lg">
//               You have no conversations yet.
//             </p>
//           </div>
//         ) : (
//           <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-10 xl:col-span-8">
//             {userChats.map(({ createdAt, sender, message }, index) => (
//               <Link key={index} to={`/message/${index}`}>
//                 <li className="relative flex border-b space-x-6 py-6 xl:static cursor-pointer">
//                   <div className="flex-none relative">
//                     {sender.pictureUrl ? (
//                       <img
//                         src={sender.pictureUrl}
//                         alt=""
//                         className="h-14 w-14 flex-none rounded-full"
//                       />
//                     ) : (
//                       <div className="h-14 w-14 flex-none rounded-full bg-slate-500 items-center justify-center flex">
//                         <FaUser className="text-white w-6 h-6" />
//                       </div>
//                     )}
//                     <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
//                   </div>
//                   <div className="flex-auto">
//                     <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
//                       {sender.username}
//                     </h3>
//                     <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
//                       <div className="flex items-start space-x-3">
//                         <dd>
//                           <p>{message.split(' ').slice(0, 6).join(' ')}...</p>
//                         </dd>
//                         <span className="text-sm text-gray-500">
//                           {new Date(createdAt).toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}
//                         </span>
//                       </div>
//                     </dl>
//                   </div>
//                   <div className="flex-none flex items-center justify-center bg-blue-500 text-white rounded-full h-10 w-10">
//                     <span className="text-sm">5</span>
//                   </div>
//                 </li>
//               </Link>
//             ))}
//           </ol>
//         )}
//       </div>
//     </div>
//   );
// }



export default function MessageComponent() {
  const { userChats } = useContext(ConversationContext);

  return (
    <div className="mx-auto max-w-lg py-8 px-6 lg:max-w-4xl xl:max-w-6xl">
      <h2 className="text-lg font-semibold text-gray-900">Recent Messages</h2>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
        {userChats.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <img
              src="/no-conversation.svg"
              alt="No Conversation"
              className="h-48 w-auto"
            />
            <p className="mt-4 text-gray-600 text-lg">
              You have no conversations yet.
            </p>
          </div>
        ) : (
          <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-10 xl:col-span-8">
            {userChats.map(({ createdAt, sender, message }, index) => (
              <Link key={index} to={`/message/${index}`}>
                <li className="relative flex border-b space-x-6 py-6 xl:static cursor-pointer">
                  <div className="flex-none relative">
                    {sender.pictureUrl ? (
                      <img
                        src={sender.pictureUrl}
                        alt=""
                        className="h-14 w-14 flex-none rounded-full"
                      />
                    ) : (
                      <div className="h-14 w-14 flex-none rounded-full bg-slate-500 items-center justify-center flex">
                        <FaUser className="text-white w-6 h-6" />
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-auto">
                    <div className="grid grid-rows-2">
                      <div className="flex items-start space-x-3">
                        <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
                          {sender.username}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {new Date(createdAt).toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}
                        </span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <p>{message}</p>
                        <div className="flex-none flex items-center justify-center bg-blue-500 text-white rounded-full h-10 w-10">
                          <span className="text-sm">5</span>
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




// export default function () {

//   const {userChats, loading,error} = useContext(ConversationContext) 

  

 
//   return (
//     <div className='mx-auto max-w-lg py-8 px-6 lg:max-w-4xl xl:max-w-6xl'>
//       <h2 className='text-lg font-semibold text-gray-900'>Recent Messages</h2>
//       <div className='lg:grid lg:grid-cols-12 lg:gap-x-16'>
//         <ol className='mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-10 xl:col-span-8'>
//           {messages.map(({ id, imageUrl, name, message }) => (
//             // const  = message
//             <Link key={id} to={`/message/${id}`}>
//               <li className='relative flex border-b space-x-6 py-6 xl:static cursor-pointer'>
//                 {imageUrl !== "" ? (
//                   <img
//                     src={imageUrl}
//                     alt=''
//                     className='h-14 w-14 flex-none rounded-full'
//                   />
//                 ) : (
//                   <div className='h-14 w-14 flex-none rounded-full bg-slate-500 items-center justify-center flex'>
//                     <FaUser className='text-white w-6 h-6 ' />
//                   </div>
//                 )}
//                 <div className='flex-auto'>
//                   <h3 className='pr-10 font-semibold text-gray-900 xl:pr-0'>
//                     {name}
//                   </h3>
//                   <dl className='mt-2 flex flex-col text-gray-500 xl:flex-row'>
//                     <div className='flex items-start space-x-3'>
//                       <dd>
//                         <p>{message}</p>
//                       </dd>
//                     </div>
//                   </dl>
//                 </div>
//               </li>
//             </Link>
//           ))}
//         </ol>
//       </div>
//     </div>
//   );
// }

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
