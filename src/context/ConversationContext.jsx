import { createContext, useState, useEffect } from "react"; 
import axios from 'axios'
 
 export const ConversationContext  = createContext()

 const ConversationContextProvider = ({children, token}) => {

   const [userChats, setUserChats] = useState(null)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)


   useEffect(() => {
    const getAllChats = async () => {
      try {
        console.log(token);
        setLoading(true)
          if (token) {
            const response = await axios.get(
              `https://universol.onrender.com/api/v1/customerservice/oneUser` ,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            console.log(response);
             if (response.status >= 200 && response.status < 300) {
               // Show success notification
               setUserChats(response);
               console.log("these are the list of messages");
             } else {
               setError("Something went wrong");
             }
          }
           setLoading(false)
      } catch (error) {
          setError(null)
          setLoading(false)
      }
    }
    getAllChats()
   }, [token])
   

   return <ConversationContext.Provider value={{
    userChats,
    loading,
    error
   }}>
         {children}
   </ConversationContext.Provider>
 }


 export default ConversationContextProvider;