import { useState } from 'react';
import Message from './Message';
import './Chat.css'
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';


const postMsg = (async (message: string, user: string)=>{
    try {
        const res = await fetch(`http://localhost:5000/api/messages/send/${user}`, {   //http://localhost:5000/api/messages/send/Pepe
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({message: message})
        })

        const data = await res.json()
        console.log(data)

        if(data.error){
            throw new Error(data.error)
        } 

    } catch (error) {
        toast.error("Error in send message: "+error)
    } 
})


const Chat = () => {
    const [input, setInput] = useState({ msg: ""});

    const { user } = useParams()
    console.log("AQUI EL to Send message: "+user)

    if(user){
        const handleChange = (event: any) => {
        const msg = event.target.name;
        const value = event.target.value;
        setInput(values => ({ ...values, [msg]: value }))
        }

        const handleSubmit = (event: any) => {
        event.preventDefault();
        //Add date to input.msg
        
        postMsg(input.msg, user)
        //clear the input value
        }

        
        
    
            return (
                <>
                <h5>Chat with {user}</h5>
                <div className='chat'>
                    <Message user={user}/>
                </div>
                <form className="chatForm" onSubmit={handleSubmit}>
                            <input 
                            type="text" 
                            name="msg" 
                            onChange={handleChange}
                            />
                            <input type="submit" value={"Send"}/>
                    </form>
                </>
                
            )
        } else {
            return (
                <>
                <div className='chat'>
                    <h1>Error en el chat!</h1>
                </div>
                </>
            )
        }
}

export default Chat