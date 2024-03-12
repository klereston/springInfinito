import './Login.css'
import { useState } from 'react';
import userLogin from '../../hooks/userLogin';
import { User } from '../../models/user.model';


const Login = () => {
    const [inputs, setInputs] = useState({username:"", password:""});


    const {loading, login} = userLogin()

    const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event: any) => {
    event.preventDefault();
    //alert(inputs);
    console.log(loading)
    const user = new User(0, inputs.password, inputs.username,[])
    await login(user)
    }
    
    return (
        <>
        <div className="login_bg">           
            <form onSubmit={handleSubmit}>
                <label>Enter your name:
                <br />
                <input 
                type="text" 
                name="username" 
                value={inputs.username || ""} 
                onChange={handleChange}
                />
                </label>
                <br />
                <label>Enter your password:
                <br />
                <input 
                    type="password" 
                    name="password" 
                    value={inputs.password || ""} 
                    onChange={handleChange}
                />
                <br />
                </label>
                <input type="submit" value={"Log In"}/>
            </form>
        </div>
        </>
    )
}

export default Login
  