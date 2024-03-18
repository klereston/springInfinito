import { useState } from "react";
import { User } from "../models/user.model";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


const userLogin = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser }:any = useAuthContext()
    

    const login = async(user:User) => {
        const success = handleErrors(user)
        if(!success){
            return
        }

        setLoading(true)
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: 'include',
                body: JSON.stringify(user)
            })

            const data = await res.json()
            
            console.log("user logged: "+JSON.stringify(data))
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
    return { loading, login }
}

export default userLogin

function handleErrors(user: User){
    if(!user.fullName || !user.password){
        toast.error("Please fill in all fields")
        return false
    }
    return true
}