import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const fetchMessages = async () => {
    const res = await fetch("http://localhost:5000/api/messages/send/Pepe", {
                           method: "GET"
                })
    const data = await res.json()
       if(!data){
           throw new Error(data.error)
       }
       return data
   }
   
   
   const Message = () => {
       const [loading, setLoading] = useState(false)
       //const [msgs, setMsgs]:any = useState([])
   
       useEffect(()=>{
           setLoading(true)
           fetchMessages().then((data)=>{
               
            console.log(data)
   
               
               
               
           
           }).catch((error)=>toast.error("Error in get users msgs: " + error))
           setLoading(false)
           console.log(loading)  
       },[])
       
    return (
        <>
            <p><span>you: </span>Hola pepe como estas? at <span>12:13</span></p>
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