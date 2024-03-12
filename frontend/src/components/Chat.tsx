import { useState } from 'react';
import Message from './Message';
import './Chat.css'

const Chat = () => {
    const [input, setInput] = useState({msg:""});

    const handleChange = (event: any) => {
    const msg = event.target.name;
    setInput(msg)
    }

    const handleSubmit = (event: any) => {
    event.preventDefault();
    alert(input.msg);
    }

    return (
        <>
        <div className='chat'>
            <Message />
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
}

export default Chat