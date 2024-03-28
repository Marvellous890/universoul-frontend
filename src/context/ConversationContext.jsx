import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getCookie } from "../utils";
import { io } from 'socket.io-client'

const token = getCookie("token");

export const ConversationContext = createContext();
const url = "https://universoul.onrender.com/api/v1/customerservice/oneUser";

const ConversationContextProvider = ({ children }) => {
  const [userChats, setUserChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userAuth, setUserAuth] = useState({});
  const [singleMessage, setSingleMessage] = useState([]);
  const [socket, setSocket] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])

  // console.log(onlineUsers);

  useEffect(() => {
    
   const newSocket = io('https://uvs-socket-server.onrender.com')
   setSocket(newSocket)

   return ()=>{
    newSocket. disconnect()
   }
  }, [userAuth])

  // socket for online users 
  useEffect(() => {
   if(userAuth._id && socket){
     if (socket === null) return;
     socket.emit("addNewUser", userAuth?._id);
     socket.on('getOnlineUsers', (res) => {
        setOnlineUsers(res)
     })
     return ()=>{
      socket.off('getOnlineUsers')
     }
   }
  }, [socket, userAuth._id])
  
  

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
          setUserAuth(response.data.user);
          // console.log(response.data.user);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getUser();
  }, []);

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
              for (let i = 0; i < messages.length; i++) {
                const message = messages[i];
                if (message.sender._id !== userAuth._id) {
                  recentMessages.push({
                    sender: otherUser,
                    message: message.message,
                    createdAt: message.createdAt,
                  });
                  break;
                }
              }
            });

            setUserChats(recentMessages);

            // Show success notification
            // console.log("these are the list of messages");
          } else {
            console.log("something bad really went wrong bro!");
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    getAllChats();
  }, [singleMessage]);

  // function to clear single message 
  const clearMessage = useCallback(
    () => {
      setSingleMessage([])
    },
    [],
  )

  // function to send message using socket 
  useEffect(() => {
    if(userAuth._id){
      if (socket === null) return;
      let recipientId=''
      if (singleMessage.length > 0) {
        const findRecipient = (array, oppositeId) => {
          for (const obj of array) {
            if (obj.info._id !== oppositeId) {
              return obj.info._id;
            }
          }
          return null;
        };
        recipientId = findRecipient(singleMessage, userAuth._id)
      }
      socket.emit("sendMessage", {singleMessage, recipientId});
       return () => {
         socket.off("sendMessage");
       };
    }

   
   
  }, [singleMessage])
  

  // recieve message 
  useEffect(() => {
    if (socket === null) return
    socket.on('getMessage', (res) => {
        setSingleMessage(res)
    } )
    return ()=> {
      socket.off('getMessage')
    }
    
  }, [socket, singleMessage])
  
  

  //  function to fetch single message
  const getSingleMessage = useCallback( async (messageId) => {
    if (token && Object.keys(userAuth).length > 0) {
      try {
        const response = await axios.get(
          `https://universoul.onrender.com/api/v1/customerservice/getMessages/${messageId}`,
          {
            headers: {
              Authorization: `Bearer ${token} `,
            },
          }
        );
        const data = response.data.messages;
        let newData = [];

        if (data.user_one._id === userAuth._id) {
          // User one's ID matches your user ID
          newData = data.messages.map((messageObj) => ({
            message: messageObj.message,
            info: messageObj.sender,
            tag:
              messageObj.sender._id === userAuth._id ? "sender" : "recipient",
            time: messageObj.createdAt,
          }));
        } else {
          newData = data.messages.map((messageObj) => ({
            message: messageObj.message,
            info: messageObj.sender,
            tag:
              messageObj.sender._id === userAuth._id ? "recipient" : "sender",
            time: messageObj.createdAt,
          }));
  }

        if (!singleMessage.length || JSON.stringify(singleMessage) !== JSON.stringify(newData)) {
          setSingleMessage(newData)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [token, userAuth]);

  // function to post message
  const postSingleMessage = useCallback(async (recipientId, message, setTextMessage) => {
    if (token && Object.keys(userAuth).length > 0) {
      if (!message.trim()) {
        alert("Message can't be empty")
        return
      }
      try {
        const response = await axios.post(
          `https://universoul.onrender.com/api/v1/customerservice/sendMessages/${recipientId} ` ,

          {message},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }

        );
        const data = response.data.conversation;
        let newData = [];

        if (data.user_one._id === userAuth._id) {
          // User one's ID matches your user ID
          newData = data.messages.map((messageObj) => ({
            message: messageObj.message,
            info: messageObj.sender,
            tag:
              messageObj.sender._id === userAuth._id ? "sender" : "recipient",
            time: messageObj.createdAt,
          }));
        } else {
          newData = data.messages.map((messageObj) => ({
            message: messageObj.message,
            info: messageObj.sender,
            tag:
              messageObj.sender._id === userAuth._id ? "recipient" : "sender",
            time: messageObj.createdAt,
          }));
        }

        if (
          !singleMessage.length ||
          JSON.stringify(singleMessage) !== JSON.stringify(newData)
        ) {
          setSingleMessage(newData);
        }
             
        setTextMessage('')

      } catch (error) {
        console.log(error);
      }
    }
  }, [token, userAuth]);

 

  return (
    <ConversationContext.Provider
      value={{
        userChats,
        loading,
        error,
        userAuth,
        getSingleMessage,
        postSingleMessage,
        clearMessage,
        singleMessage,
        onlineUsers
       }} >
      {children}
    </ConversationContext.Provider>
  );
};

export default ConversationContextProvider;
