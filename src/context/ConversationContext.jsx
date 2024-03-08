import { createContext, useState, useEffect, useCallback } from "react"; 
import axios from 'axios';
import { getCookie } from "../utils";
 
const token = getCookie("token")
 export const ConversationContext  = createContext()
const url = "https://universoul.onrender.com/api/v1/customerservice/oneUser";

 const ConversationContextProvider = ({children}) => {

   const [userChats, setUserChats] = useState([])
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)
   const [userAuth, setUserAuth] = useState({})
   const [singleMessage, setSingleMessage] = useState([])


 useEffect(() => {
  // get user auth 
    const getUser = async () => {
      if (token) {
        try {
          const response = await axios.get(
            "https://universoul.onrender.com/api/v1/users/one",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
           setUserAuth(response.data.user)
          // console.log(response.data.user);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getUser(); 
    
 }, [])

//  effect to get all chats 
 useEffect(() => {

   const getAllChats = async () => {
     if (token && Object.keys(userAuth).length > 0) {
       try {
         const response = await axios.get(url, {
           headers: {
             Authorization: `Bearer ${token} `,
           },
         });
         if (response.status >= 200 && response.status < 300) {
           // sorting Logic for messages
           const recentMessages = [];

           response.data.messages.forEach((conversation) => {
             let otherUser;
             if (conversation.user_one._id === userAuth._id) {
               otherUser = conversation.user_two;
             } else {
               otherUser = conversation.user_one;
             }

             const messages = conversation.messages.reverse();
             for(let i = 0; i < messages.length; i++){
              const message = messages[i];
              if(message.sender._id !== userAuth._id){
                recentMessages.push(
                  {
                    sender: otherUser,
                    message: message.message,
                    createdAt: message.createdAt
                  }
                );
                break;
              }
             }
           });

         setUserChats(recentMessages);


           // Show success notification
           console.log("these are the list of messages");
         } else {
           console.log("something bad really went wrong bro!");
         }
       } catch (error) {
         console.log(error);
       }
     }
   };

   getAllChats()
 }, [userAuth])

//  function to fetch single message 
const getSingleMessage = useCallback( async (messageId) => {    
   if(token && Object.keys(userAuth).length > 0 ){
      try {
       const response = await axios.get(`https://universoul.onrender.com/api/v1/customerservice/getMessages/${messageId}`, {
         headers: {
           Authorization: `Bearer ${token} `,
         },
       });     
      if (response.ok) {
        formatData(response.data.messages);
        console.log(singleMessage, 'from context');
      }else{
         console.log(response.error)
      }
  } catch (error) {
    console.log(error)
  }
   }},[])


// function to post message 
const postSingleMessage = useCallback( async (messageId) => {
  if(token && Object.keys(userAuth).length > 0){
    try {
      const response = await axios.post(`https://universoul.onrender.com/api/v1/customerservice/postMessages/${messageId} ` , {
        headers: {
          Authorization: `Bearer ${token}`,
        }
         
      })
      if(response.ok){
        formatData(response.data.messages);
      }else{
        console.log(response.error)
      }
    } catch (error) {
      
    }
  }
}, [])


const formatData = (data) => {
  
let chatMessages = [];

if (data.user_one._id === userAuth._id) {
  // User one's ID matches your user ID
  chatMessages = data.messages.map((messageObj) => ({
    message: messageObj.message,
    tag: messageObj.sender._id === userAuth._id ? "sender" : "recipient",
  }));
} else {
  // User two's ID matches your user ID
  chatMessages = data.messages.map((messageObj) => ({
    message: messageObj.message,
    tag: messageObj.sender._id === userAuth._id ? "recipient" : "sender",
  }));
}
setSingleMessage(chatMessages)
}
 
   

   return <ConversationContext.Provider value={{
    userChats,
    loading,
    error,
    userAuth,
    getSingleMessage,
    postSingleMessage,
    singleMessage,
   }}>
         {children}
   </ConversationContext.Provider>
 }


 export default ConversationContextProvider;