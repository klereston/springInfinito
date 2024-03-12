import './Entry.css'
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <>
        <div className="entry_bg">
            <div className='wellcome_login'>
                <h1>Wellcome to Michat!</h1>
                <p>bether them whatsapp?</p>
                <h2>
                    <Link className="btn_login" to="/login">Log in</Link>
                </h2>
                <h2>
                    <Link to="/signup">Sign up</Link>
                </h2>
                
            </div>
        </div>
        </>
    )
}

export default Login