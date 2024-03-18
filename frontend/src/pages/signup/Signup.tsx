import './Signup.css'
import { useState } from 'react';
import userSignup from '../../hooks/userSignup';
import { User } from '../../models/user.model';
const Signup = () => {
    const [inputs, setInputs] = useState({ username: "", password: "" });


    const { loading, signup } = userSignup()

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        //alert(inputs);
        console.log(loading)
        const user = new User(0, inputs.password, inputs.username, [])
        await signup(user)
    }

    return (
        <>
            <div className="signup_bg">
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
                    <input type="submit" value={"Sing Up"} />
                </form>
            </div>
        </>
    )
}

export default Signup