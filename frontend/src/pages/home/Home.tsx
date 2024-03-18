import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import './Home.css'
import Logout from "../../components/Logout"
import { Link } from "react-router-dom";




const fetchConversations = async () => {
 const res = await fetch("http://localhost:5000/api/users/conversations", {
                        method: "GET",
                        credentials: 'include'
                    })
 const data = await res.json()
    if(!data){
        console.log("si despara el error aqui en el fetch de conversations")
        throw new Error(data.error)
    }
    return data
}

const fetchContacts = async () => {
    const res = await fetch("http://localhost:5000/api/users/contacts", {
                           method: "GET",
                           credentials: 'include'
                       })
    const data = await res.json()
       if(!data){
           console.log("si despara el error aqui en el fetch de conversations")
           throw new Error(data.error)
       }
       return data
   }


   //Set user to home
   type TparseData = {id:number, fullName:string}
   const getUser = async () => {
    let parseData: TparseData
        if(localStorage.getItem("chat-user")){
            parseData = JSON.parse(localStorage.getItem("chat-user") || "")
            return parseData.fullName
        }
        return null
    }


const Home = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations]:any = useState([])
    const [contacts, setContacts]:any = useState([])
    const [user, setUser]:any = useState("")

    useEffect(()=>{
        setLoading(true)

        getUser().then((userName)=>setUser(userName)).catch(()=>"Some Error in user auth")
        

        const contactsArr = new Array()
        fetchContacts().then((data)=>{
                if(data){
                    data.allUsers.forEach((e:any)=>contactsArr.push(e.fullName))

                    setContacts([...contactsArr])
                }
            
            
        
        }).catch((error)=>toast.error("Error in get user contacts: " + error))

        fetchConversations().then((data)=>{
            console.log("la data del fetch: "+data)

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
        <div className="home">
        <div className="logout"> <span>{user}</span> <Logout /> </div>
        <div className="context">
        <h3>Chats Already started: </h3>
        {
            conversations ? ( conversations.map((e:string)=><p key={e}><Link to={{
                pathname: `/chat/${e}`
              }}>Chat with {e}</Link></p>)
            ) : (
                <p>You have Not start a chat with someone yet! 
                   Select a contact here:</p>
            )
        }
        <h3>Contacts: </h3>
        {
            conversations ? ( contacts.map((e:string)=><p key={e}><Link to={{
                pathname: `/chat/${e}`
              }}>Chat with {e}</Link></p>)) : (null)
        }
        
        { !loading ? (
            null
            ) : (
            <p> Loading... </p>
        )}
        </div>
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