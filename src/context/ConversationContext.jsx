import { createContext, useState, useEffect } from "react"; 
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
         setUserChats(response.data.messages);
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

             const lastMessage =
               conversation.messages[conversation.messages.length - 1];
               console.log(lastMessage, 'result')
             if (lastMessage.sender._id === otherUser._id) {
              console.log('great')
              //  recentMessages.push({
              //    sender: otherUser,
              //    message: lastMessage.message,
              //  });
             }
           });

           console.log(recentMessages, "new array");

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
 
   

   return <ConversationContext.Provider value={{
    userChats,
    loading,
    error,
    userAuth
   }}>
         {children}
   </ConversationContext.Provider>
 }


 export default ConversationContextProvider;