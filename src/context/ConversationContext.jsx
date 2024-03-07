import { createContext, useState, useEffect } from "react"; 
import axios from 'axios';
import { getCookie } from "../utils";

const token = getCookie("token");
 
 export const ConversationContext  = createContext()
const url = "https://universoul.onrender.com/api/v1/customerservice/oneUser";


 const ConversationContextProvider = ({children, token}) => {

   const [userChats, setUserChats] = useState(null)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)

 useEffect(() => {
    const getAllChats = async () => {
        if(token){
             try {
               const response = await axios.get(url, {
                 headers: {
                   Authorization: `Bearer ${token} `,
                 },
               });
               setUserChats(response.data.messages);
               if (response.status >= 200 && response.status < 300) {
                 // Show success notification
                 console.log("these are the list of messages");
               } else {
               }
             } catch (error) {
               console.log(error);
             }
        }
     
    };

    getAllChats();
 }, [])
   

   return <ConversationContext.Provider value={{
    userChats,
    loading,
    error
   }}>
         {children}
   </ConversationContext.Provider>
 }


 export default ConversationContextProvider;