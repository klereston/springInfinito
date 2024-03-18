import { useEffect, useState } from "react"
//import {useSocketContext} from "../context/SocketContext"
import toast from "react-hot-toast"

const fetchMessages = async (user:string) => {
    const res = await fetch(`http://localhost:5000/api/messages/send/${user}`, {
                           method: "GET",
                           credentials: 'include'
                })
    const data = await res.json()
       if(!data){
           throw new Error(data.error)
       }
       return data
   }
   
   
const Message = (props: {user: string}) => {
       const [loading, setLoading] = useState(false)
       const [msgs, setMsgs]:any = useState([])
        //const {socket} = useSocketContext()

       useEffect(()=>{
        const user = props.user       
        setLoading(true)
        console.log(user, loading)

        // socket?.on("newMessage", (newMessage:any)=>{
        //     console.log("Esta es el new menssage de socket: "+newMessage)
        //     setMsgs([...msgs, newMessage])
        // })

        // return () => socket?.off("newMessage")
        const msgsArr = new Array()

        fetchMessages(user).then((data)=>{
            if(data){
                data.sendMessage.forEach((e:any)=>msgsArr.push("you: " + e.sendMessage))
                data.receivedMessage.forEach((e:any)=>msgsArr.push(e.whoSend + ": " + e.receivedMessage))
                setMsgs([...msgsArr])
            }
           
           }).catch((error)=>toast.error("Error in get users msgs: " + error))
           
           setLoading(false)  
       },[])//[socket, setMsgs, msgs])
       
    return (
        <>
            {
                msgs ? ( msgs.map((e:string, index:number)=><p key={index}>{e}</p>)) : (null)
            }
            {
                msgs.length === 0 ? (<p>There is Not messages yet, Send a message to start a conversation...</p>) : (null)
            }
            
        </>
    )
}

export default Message



// {
//     "chat_with": "Pepe",
//     "user": "Kaka",
//     "sendMessage": [
//       {
//         "sendMessage": "Hola Pepe como (1) estas?"
//       }
//     ],
//     "receivedMessage": [
//       {
//         "id": 3,
//         "receivedMessage": "Este es un msg para Kaka"
//       },
//       {
//         "id": 4,
//         "receivedMessage": "Este es el segundo (2) msg para Kaka"
//       },
//       {
//         "id": 5,
//         "receivedMessage": "Este es el (3) msg para Kaka"
//       }
//     ]
//   }