import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";
//import { UserInterface } from "../models/interfaces/userInterface";



export const SocketContext = createContext<any>(null)

export const useSocketContext = () => {
   return useContext(SocketContext)
}

export const SocketContextProvider = ({children}: any) => {
    const [socket, setSocket] = useState<any>(null)
    //const [onlineUsers, setOnlineUsers] = useState(null)
    const {authUser} = useAuthContext()
    
    useEffect(():any => {
        if(authUser){
            //Connecting with server
            const socket = io("http://localhost:5000", {
                query: {
                    userId: authUser.fullName
                }
            })

            setSocket(socket)

            //  socket.on("newMessage", (newMessage)=>{
            //    
            //})

            //cleanup function for useEffect
            return () => socket.close()
        } else {
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
    },[authUser])



    return (
        <SocketContext.Provider value={{socket}}>
                {children}
        </SocketContext.Provider>
    )
}
