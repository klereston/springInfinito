import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

const userLogout = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()
    
    const logout = async () => {
        setLoading(true)
        try {
            const res = await fetch("http://localhost:5000/api/auth/logout", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"}
                })
            const data = await res.json()
            if(!data){
                throw new Error(data.error)
            }

            localStorage.removeItem("chat-user")
            setAuthUser(null)

        } catch (error) {
            toast.error("Error in Logout"+error)
        } finally {
            setLoading(false)
        }
    }

    return { loading, logout}
}

export default userLogout