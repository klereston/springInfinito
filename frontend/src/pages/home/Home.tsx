import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import './Home.css'
import Logout from "../../components/Logout"
import { Link } from "react-router-dom";




const fetchConversations = async () => {
 const res = await fetch("http://localhost:5000/api/users/conversations", {
                        method: "GET"
                    })
 const data = await res.json()
    if(!data){
        throw new Error(data.error)
    }
    return data
}


const Home = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations]:any = useState([])

    useEffect(()=>{
        setLoading(true)
        fetchConversations().then((data)=>{
            
            console.log(data)

            const strS = new Set()
                if(data){
                    data.usersMessagesSended.forEach((e:any)=>strS.add(e.userToSend))
                    data.usersReceivedMessages.forEach((e:any)=>strS.add(e.whoSend))
                    setConversations([...strS])
                }
            
            
        
        }).catch((error)=>toast.error("Error in get users conversations: " + error))
        setLoading(false)
        console.log(loading)  
    },[])
    
    return (
        <>
        <div className="home"><p>Home</p> <Logout /> </div>
        <div className="context">
        {
            conversations.map((e:string)=><p key={e}><Link to="/chat">Chat with {e}</Link></p>)
        }
        
        { !loading ? (
            null
            ) : (
            <p> Loading... </p>
        )}
        </div>
        
        </>
    )
}

export default Home




// type TparseData = {
//     usersMessagesSended:[{userToSend:string}],
//     usersReceivedMessages:[{whoSend:string}]
// }
// let parseData: TparseData
// parseData = {usersMessagesSended:[{userToSend:""}],usersReceivedMessages:[{whoSend:""}]}
//const [conversationsJson, _setConversationsJson]:any = useState<TparseData>(parseData)
// useEffect(() => {
//     const getConversations = async () => {
//         setLoading(true)
//         try {
//             const res = await fetch("http://localhost:5000/api/users/conversations", {
//                     method: "GET"
//                 })
//             const data = await res.json()
//             if(!data){
//                 throw new Error(data.error)
//             }

//             setConversationsJson(data)
//             console.log(loading)
//             console.log("data from get user chat: "+JSON.stringify(conversationsJson))

//             const strS = new Set()
//             if(conversationsJson){
//                 conversationsJson.usersMessagesSended.forEach((e:any)=>strS.add(e.userToSend))
//                 conversationsJson.usersReceivedMessages.forEach((e:any)=>strS.add(e.whoSend))
//             }
            
//             return [...strS]
//             // console.log(arr)
//             // return arr

        
//         } catch (error) {
//             toast.error("Error in get users conversations: " + error)
//         } finally {
//             setLoading(false)
//         }
//     }