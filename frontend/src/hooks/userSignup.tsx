import { useState } from "react";
import { User } from "../models/user.model";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


const userSignup = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser }:any = useAuthContext()
    

    const signup = async(user:User) => {
        const success = handleErrors(user)
        if(!success){
            return
        }

        setLoading(true)
        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
            })

            const data = await res.json()
            
            console.log(data)
            if(data.error){
                throw new Error(data.error)
            }

            //LocalStorage create
            localStorage.setItem("chat-user", JSON.stringify(data))
            //Context update
            setAuthUser(data)  

        } catch (error) {
            toast.error("Error in Signup: "+error)
        } finally {
            setLoading(false)
        }

    }
    return { loading, signup }
}

export default userSignup

function handleErrors(user: User){
    if(!user.fullName || !user.password){
        toast.error("Please fill in all fields")
        return false
    }
    return true
}